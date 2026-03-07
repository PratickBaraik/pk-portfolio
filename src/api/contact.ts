import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

/**
 * Initialize Resend using API key stored in Vercel environment variables
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Serverless function handling contact form submissions
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    /**
     * Send email notification to portfolio owner
     */
    await resend.emails.send({
      from: "Portfolio Contact <contact@yourdomain.com>",
      to: "demo1@gmail.com",
      reply_to: email,
      subject: `New portfolio inquiry from ${name}`,
      text: `
A new creative opportunity just landed in your inbox.

Client Name: ${name}
Client Email: ${email}

Message:
${message}

This could be the start of an exciting collaboration.
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
