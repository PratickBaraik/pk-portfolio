import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Initialize Resend client using API key from environment variables
 */
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  /**
   * Allow only POST requests
   */
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { client_name, client_email, client_message } = req.body;

    /**
     * Send email using Resend
     */
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // verified sender
      to: "pratickbaraik56@gmail.com",
      replyTo: client_email,
      subject: `New portfolio inquiry from ${client_name}`,
      text: `
Client Name: ${client_name}
Client Email: ${client_email}

Message:
${client_message}
`,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    return res.status(500).json({
      success: false,
      error: "Email failed to send",
    });
  }
}
