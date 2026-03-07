import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Initialize Resend client using API key stored in environment variables
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
    const { name, email, message } = req.body;

    /**
     * Send email
     */
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // verified sender required
      to: "demo1@gmail.com",
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: `
Client Name: ${name}
Client Email: ${email}

Message:
${message}
`,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Email failed to send",
    });
  }
}
