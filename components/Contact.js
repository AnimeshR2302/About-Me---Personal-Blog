"use client";

import { useState } from "react";
import styles from "@/styles/Contact.module.css";

const initialState = {
  name: "",
  email: "",
  message: ""
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const email = "anix@example.com";
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      `Portfolio inquiry from ${form.name}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;

    window.location.href = mailto;
    setStatus("submitted");
    setForm(initialState);
  }

  return (
    <section id="contact">
      <div className={`section-inner ${styles.grid}`}>
        <div>
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Let&apos;s build something useful.</h2>
          <p className="section-copy">
            This v1 keeps contact flow intentionally simple: validated client
            input with a mail client handoff. If persistent submissions are
            needed later, the existing API can be extended cleanly.
          </p>
        </div>

        <form className={`panel ${styles.form}`} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Project brief
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="What are you building, and where do you need help?"
              rows="6"
              required
            />
          </label>
          <button type="submit">Open email draft</button>
          {status === "submitted" ? (
            <p className={styles.success}>
              Your mail client should open with a prefilled draft.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
