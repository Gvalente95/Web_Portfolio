import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useIntersection } from "@/hooks/useIntersection";

import "./style.css";
import { ContactIntro } from "./contactIntro/ContactIntro";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { t } = useTranslation();
  const { isIntersecting, ref } = useIntersection({ once: true });

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
    <section ref={ref} id="contact" className={`contact-section reveal${isIntersecting ? " in-view" : ""}`}>
      <ContactIntro status={status} />
      <div className={`contact-card`}>
        {status === "sent" ? (
          <div className="contact-success">
            <h3>{t("contact.receiveQuery")}</h3>
            <p>{t("contact.receiveQueryBrief")}</p>
            <button style={{ marginLeft: "80px" }} className="sendback-button" onClick={() => setStatus("idle")}>
              {t("contact.sendBack")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            {status !== "sending" && (
              <>
                <div className="form-field">
                  <label htmlFor="name">{t("contact.nameQuery")}</label>
                  <input type="text" name="name" id="name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">{t("contact.emailQuery")}</label>
                  <input type="email" name="email" id="email" required />
                </div>

                <div className="form-field">
                  <label htmlFor="message">{t("contact.messageQuery")}</label>
                  <textarea name="message" id="message" rows={6} required />
                </div>
              </>
            )}
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>

            {status === "error" && <p className="contact-error">Something went wrong.</p>}
          </form>
        )}
      </div>
    </section>
  );
};
