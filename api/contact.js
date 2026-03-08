/**
 * Vercel Serverless Function
 * EmailJS contact API
 */

import emailjs from "@emailjs/nodejs";

// /**
//  * Declare process for TS without installing node types
//  */
// declare const process: {
//   env: Record<string, string | undefined>;
// };

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    /**
     * Load environment variables
     */
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID?.trim();
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID?.trim();
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY?.trim();
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY?.trim();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    /**
     * Initialize EmailJS SDK
     * REQUIRED for strict mode authentication
     */
    emailjs.init({
      publicKey: PUBLIC_KEY,
      privateKey: PRIVATE_KEY,
    });

    /**
     * Extract request body
     */
    const { name, email, message } = req.body ?? {};

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
     * Send email
     */
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      name,
      email,
      message,
    });

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
