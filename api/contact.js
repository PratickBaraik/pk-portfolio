import nodemailer from "nodemailer";

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

// let requestLog: number[] = [];

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Input sanitization
 */
function sanitize(input) {
  if (!input) return "";
  return String(input)
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
   * Check required environment variables
   */
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_RECEIVER) {
    console.error("Missing environment variables");
    return res.status(500).json({
      success: false,
      error: "Server configuration error",
    });
  }

  /**
   * Create transporter inside handler
   */
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const now = Date.now();

    requestLog = requestLog.filter((time) => now - time < RATE_LIMIT_WINDOW);

    if (requestLog.length >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        success: false,
        error: "Too many requests",
      });
    }

    requestLog.push(now);

    const { name, email, message, company } = req.body;

    if (company) {
      return res.status(400).json({
        success: false,
        error: "Spam detected",
      });
    }

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

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    const htmlMessage = escapeHtml(safeMessage).replace(/\n/g, "<br>");

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
