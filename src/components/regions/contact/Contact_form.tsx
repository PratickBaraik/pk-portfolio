import React, { useRef } from "react";
import styles from "./style/Form.module.css";

/**
 * Contact component
 * Sends contact form data to Vercel serverless API
 */
const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    /**
     * Cast form for TypeScript field access
     */
    const formData = form.current as HTMLFormElement & {
      client_name: { value: string };
      client_email: { value: string };
      client_message: { value: string };
    };

    const payload = {
      name: formData.client_name.value,
      email: formData.client_email.value,
      message: formData.client_message.value,
    };

    try {
      /**
       * Send POST request to serverless API
       */
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      alert("Message sent successfully!");

      form.current.reset();
    } catch (error) {
      console.error("Contact API error:", error);
      alert("Failed to send message");
    }
  };

  return (
    <section className={styles.contact_section}>
      <h2>Contact</h2>

      <form ref={form} onSubmit={sendEmail} className={styles.contact_form}>
        <label>Name</label>
        <input
          type="text"
          name="client_name"
          placeholder="Enter your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="client_email"
          placeholder="Enter your email"
          required
        />

        <label>Message</label>
        <textarea
          name="client_message"
          rows={5}
          placeholder="Enter your message"
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
