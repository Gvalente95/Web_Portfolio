import { useState } from "react";
import "./style.css";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    try {
      const data = {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      };

      const response = await fetch("https://formspree.io/f/mrewyagp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) throw new Error();

      form.reset();
      console.log("Contact form submitted:", data);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <div className="contact-header">
          <h2>Contact</h2>
          <p>Have a project, idea, or collaboration in mind? Send me a message.</p>
        </div>

        {status === "sent" ? (
          <div className="contact-success">
            <h3>Message sent.</h3>
            <p>Thanks for reaching out. I’ll get back to you soon.</p>
            <button onClick={() => setStatus("idle")}>Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows={6} required />
            </div>

            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "error" && <p className="contact-error">Something went wrong.</p>}
          </form>
        )}
      </div>
    </section>
  );
};
