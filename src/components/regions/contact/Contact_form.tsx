/**
 * Vercel Serverless Function
 * Simple EmailJS contact API
 */

import emailjs from "@emailjs/nodejs";

/**
 * Declare process for TypeScript without requiring @types/node
 * This avoids additional config changes in tsconfig
 */
declare const process: {
  env: Record<string, string | undefined>;
};

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: any, res: any) {
  /**
   * Allow POST requests only
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    /**
     * Environment variables from Vercel
     */
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    /**
     * Ensure required configuration exists
     */
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    /**
     * Extract form data
     */
    const { name, email, message } = req.body ?? {};

    /**
     * Validate input fields
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
     * Send email using EmailJS SDK
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
        privateKey: PRIVATE_KEY,
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
