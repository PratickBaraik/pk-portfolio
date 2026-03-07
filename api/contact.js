import nodemailer from "nodemailer";

/**
 * Ensure required environment variables exist
 */
if (
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.EMAIL_RECEIVER
) {
  throw new Error("Missing required email environment variables");
}

/**
 * Create SMTP transporter using Gmail
 * Gmail requires an App Password (not your normal password)
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Basic in-memory rate limiter
 * Limits rapid spam submissions
 */
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

let requestLog = [];

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Simple input sanitization
 */
function sanitize(input) {
  if (!input) return "";
  return String(input)
    .replace(/[\r\n]/g, "")
    .trim();
}

/**
 * Serverless function handler
 */
export default async function handler(req, res) {
  /**
   * Allow only POST requests
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const now = Date.now();

    /**
     * Rate limiting
     */
    requestLog = requestLog.filter((time) => now - time < RATE_LIMIT_WINDOW);

    if (requestLog.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please try again later.",
      });
    }

    requestLog.push(now);

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
     * Limit message length
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
     * Send email via Gmail SMTP
     */
    await transporter.sendMail({
      from: `${safeName}, <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: safeEmail,
      subject: `✨ ${safeName} wants to connect with you via PORTFOLIO!`,
      text: `
Name: ${safeName}
Email: ${safeEmail}

Message:
${safeMessage}

Looking forwrard to hear from you!
${safeName}
      `,
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
