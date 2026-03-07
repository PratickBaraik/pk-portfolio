import { Resend } from "resend";

/**
 * Initialize Resend client using environment API key
 * Stored securely in Vercel Environment Variables
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Serverless function for handling contact form
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
    const { name, email, message, company } = req.body;

    /**
     * Honeypot spam protection
     * If this hidden field is filled, treat as bot
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
     * Prevent excessively large messages
     */
    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Message too long",
      });
    }

    /**
     * Send email using Resend
     */
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "pratickbaraik56@gmail.com",
      replyTo: email,
      subject: `${name} contacted you via portfolio`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
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
