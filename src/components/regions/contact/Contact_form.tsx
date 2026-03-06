import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
// import "./Contact.css";

/**
 * Contact form component
 * Sends email to site owner using EmailJS Gmail service
 */
const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  /**
   * Handles form submission and sends email
   */
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_98lf5id", // Gmail service ID from EmailJS
        "template_lm10zql", // Email template ID
        form.current,
        "oTqTkO3nNjSsWxsD1", // EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully");
        },
        (error) => {
          console.error(error);
          alert("Failed to send message");
        },
      );

    e.currentTarget.reset();
  };

  return (
    <section className="contact-section">
      <h2>Contact</h2>

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="name" placeholder="Enter your name" required />

        <label>Email Address</label>
        <input
          type="email"
          name="email_client"
          placeholder="Enter your email"
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          placeholder="Enter your message"
          rows={5}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
