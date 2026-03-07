import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Initialize Resend client using environment API key
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Contact API endpoint
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
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
     * Validation
     */
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Message too long",
      });
    }

    /**
     * Send email
     */
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // FIXED
      to: "pratickbaraik56@gmail.com",
      replyTo: email,
      subject: `🎉 ${name} wants to connect with you via Portfolio`,
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
