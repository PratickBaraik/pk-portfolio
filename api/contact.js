/**
 * Vercel Serverless Function
 * EmailJS contact API (validated for strict-mode + Vercel runtime)
 */

import emailjs from "@emailjs/nodejs";

// /**
//  * Declare process for TypeScript without requiring @types/node
//  */
// declare const process: {
//   env: Record<string, string | undefined>;
// };

/**
 * Simple email validation
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  /**
   * Only allow POST
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    /**
     * Load environment variables
     * trim() avoids hidden whitespace errors
     */
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID?.trim();
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID?.trim();
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY?.trim();
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY?.trim();

    /**
     * Validate configuration
     */
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    /**
     * Extract request body safely
     */
    const body = req.body ?? {};
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    /**
     * Validate inputs
     */
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    /**
     * Send email using EmailJS Node SDK
     * accessToken is required for strict mode
     */
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name,
        email,
        message,
      },
      {
        publicKey: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
      },
    );

    /**
     * Success response
     */
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return res.status(500).json({
      success: false,
      error: "Email failed to send",
    });
  }
}
