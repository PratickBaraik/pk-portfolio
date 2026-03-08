/**
 * Vercel Serverless Function
 * Sends email using EmailJS REST API (Strict Mode Compatible)
 */

/**
 * Rate limit configuration
 */
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

let requestLog = [];

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize input
 */
function sanitize(value) {
  if (!value) return "";

  return String(value)
    .replace(/[\r\n]/g, "")
    .trim();
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req, res) {
  /**
   * Only POST allowed
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    /**
     * EmailJS environment variables
     */
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
      console.error("EmailJS env variables missing");

      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    /**
     * Rate limiting
     */
    const now = Date.now();

    requestLog = requestLog.filter((t) => now - t < RATE_LIMIT_WINDOW);

    if (requestLog.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        error: "Too many requests",
      });
    }

    requestLog.push(now);

    /**
     * Extract request body
     */
    const { name, email, message, company } = req.body;

    /**
     * Honeypot spam protection
     */
    if (company) {
      return res.status(400).json({
        success: false,
        error: "Spam detected",
      });
    }

    /**
     * Validate fields
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

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Message too long",
      });
    }

    /**
     * Sanitize inputs
     */
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    const htmlMessage = escapeHtml(safeMessage).replace(/\n/g, "<br>");

    /**
     * EmailJS API request
     */
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /**
           * Required fields per EmailJS REST API docs
           */
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,

          /**
           * Public key
           */
          user_id: PUBLIC_KEY,

          /**
           * Private key (strict mode)
           */
          accessToken: PRIVATE_KEY,

          /**
           * Template variables
           */
          template_params: {
            name: safeName,
            email: safeEmail,
            message: htmlMessage,
          },
        }),
      },
    );

    /**
     * Handle EmailJS errors
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
    console.error("Contact API Error:", error);

    return res.status(500).json({
      success: false,
      error: "Email failed to send",
    });
  }
}
