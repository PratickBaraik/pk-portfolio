/**
 * Vercel Serverless Function
 * Handles portfolio contact form submissions
 * Uses EmailJS REST API
 * Updated for correct EmailJS payload and improved debugging
 */

/**
 * Rate limit configuration
 */
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window

let requestLog = [];

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Remove newline characters and trim
 * Prevents header injection
 */
function sanitize(value) {
  if (!value) return "";

  return String(value)
    .replace(/[\r\n]/g, "")
    .trim();
}

/**
 * Escape HTML characters
 * Prevents HTML injection in email body
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Main API handler
 */
export default async function handler(req, res) {
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
     * EmailJS configuration from Vercel environment variables
     */
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    /**
     * Ensure required configuration exists
     */
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Missing EmailJS environment variables");

      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    /**
     * Rate limiting logic
     */
    const now = Date.now();

    requestLog = requestLog.filter((t) => now - t < RATE_LIMIT_WINDOW);

    if (requestLog.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please try again later.",
      });
    }

    requestLog.push(now);

    /**
     * Extract form fields
     */
    const { name, email, message, company } = req.body;

    /**
     * Honeypot spam detection
     */
    if (company) {
      return res.status(400).json({
        success: false,
        error: "Spam detected",
      });
    }

    /**
     * Validate required fields
     */
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    /**
     * Validate email format
     */
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    /**
     * Prevent excessively large messages
     */
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Message too long",
      });
    }

    /**
     * Sanitize user inputs
     */
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    /**
     * Convert message to HTML-safe format
     */
    const htmlMessage = escapeHtml(safeMessage).replace(/\n/g, "<br>");

    /**
     * Send email via EmailJS REST API
     */
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        /**
         * EmailJS request payload
         * public_key is required instead of user_id
         */
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          public_key: PUBLIC_KEY,
          template_params: {
            name: safeName,
            email: safeEmail,
            message: htmlMessage,
          },
        }),
      },
    );

    /**
     * Handle EmailJS errors with detailed logging
     */
    if (!response.ok) {
      const errorText = await response.text();

      console.error("EmailJS API Response:", errorText);

      throw new Error(`EmailJS API error: ${errorText}`);
    }

    /**
     * Success response
     */
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    /**
     * Catch runtime errors
     */
    console.error("Contact API Error:", error);

    return res.status(500).json({
      success: false,
      error: "Email failed to send",
    });
  }
}
