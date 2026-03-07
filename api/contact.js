import nodemailer from "nodemailer";

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

let requestLog = [];

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
   * Allow only POST
   */
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  /**
   * Read environment variables
   */
  const SMTP_HOST = process.env.SMTP_HOST || "smtp-relay.brevo.com";
  const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

  /**
   * Validate configuration safely
   */
  if (!SMTP_USER || !SMTP_PASS || !EMAIL_RECEIVER) {
    console.error("SMTP configuration missing", {
      SMTP_USER: !!SMTP_USER,
      SMTP_PASS: !!SMTP_PASS,
      EMAIL_RECEIVER: !!EMAIL_RECEIVER,
    });

    return res.status(500).json({
      success: false,
      error: "Email service is not configured",
    });
  }

  /**
   * Create transporter safely
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

  try {
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

    const { name, email, message, company } = req.body;

    /**
     * Honeypot spam trap
     */
    if (company) {
      return res.status(400).json({
        success: false,
        error: "Spam detected",
      });
    }

    /**
     * Required fields
     */
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    /**
     * Email validation
     */
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address",
      });
    }

    /**
     * Limit message size
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

<hr>
<p style="font-size:12px;color:#777;">
Sent from portfolio contact form
</p>
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
