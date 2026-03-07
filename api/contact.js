/**
 * Vercel Serverless Function
 * Handles portfolio contact form submissions
 */

import nodemailer from "nodemailer";

/**
 * Rate limit settings
 * Allows 5 requests per minute
 */
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

/**
 * Stores timestamps of requests
 */
let requestLog = [];

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Removes newline characters and trims input
 * Helps prevent email header injection
 */
function sanitize(value) {
  if (!value) return "";

  return String(value)
    .replace(/[\r\n]/g, "")
    .trim();
}

/**
 * Escapes HTML characters to prevent HTML injection
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
   * Only allow POST requests
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    /**
     * Load SMTP configuration from environment variables
     * These must be set in Vercel dashboard
     */
    const SMTP_HOST = process.env.SMTP_HOST || "smtp-relay.brevo.com";
    const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

    /**
     * Ensure required variables exist
     */
    if (!SMTP_USER || !SMTP_PASS || !EMAIL_RECEIVER) {
      console.error("SMTP environment variables missing");

      return res.status(500).json({
        success: false,
        error: "Email service not configured",
      });
    }

    /**
     * Create SMTP transporter
     */
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

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
     * Extract form data
     */
    const { name, email, message, company } = req.body;

    /**
     * Honeypot spam field
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
     * Prevent extremely large messages
     */
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

    /**
     * Convert message to HTML
     */
    const htmlMessage = escapeHtml(safeMessage).replace(/\n/g, "<br>");

    /**
     * Send email
     */
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: EMAIL_RECEIVER,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `New portfolio message from ${safeName}`,
      text: `
Name: ${safeName}
Email: ${safeEmail}

Message:
${safeMessage}
`,
      html: `
<h2>New Portfolio Message</h2>

<p><strong>Name:</strong> ${safeName}</p>
<p><strong>Email:</strong> ${safeEmail}</p>

<p><strong>Message:</strong></p>
<p>${htmlMessage}</p>
`,
    });

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
