"use client";

import { useState } from "react";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^(\+91[-\s]?)?[6-9]\d{9}$/;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<string>("");

  const validate = () => {
    const nextErrors: ContactErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Mobile number is required.";
    } else if (!MOBILE_REGEX.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid Indian mobile number.";
    }

    if (!form.service.trim()) {
      nextErrors.service = "Please mention a service.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please enter a message.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    if (validate()) {
      setStatus("Thanks! We will contact you shortly.");
    }
  };

  const handleChange =
    (field: keyof ContactFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const inputClass = (field: keyof ContactFormState) =>
    `w-full rounded-2xl border bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-600 shadow-sm shadow-black/50 ${
      errors[field]
        ? "border-rose-500/80 focus:border-rose-400 focus:ring-rose-500/20"
        : "border-slate-800/80"
    }`;

  return (
    <form
      className="mt-6 grid gap-5 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-[0_25px_80px_-50px_rgba(0,0,0,0.5)]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="space-y-2 md:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300/80">
          Get in touch
        </p>
        <h3 className="text-2xl font-semibold text-white">
          Tell us how we can help you invest smarter
        </h3>
        <p className="text-sm text-slate-400">
          Share your details and our advisors will connect with you within one
          business day.
        </p>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="contact-name"
          className="text-xs font-medium text-slate-300"
        >
          Full Name
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange("name")}
          className={inputClass("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          autoComplete="name"
          minLength={2}
          required
        />
        {errors.name && (
          <p id="contact-name-error" className="text-xs text-rose-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="contact-email"
          className="text-xs font-medium text-slate-300"
        >
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange("email")}
          className={inputClass("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          autoComplete="email"
          required
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-rose-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          htmlFor="contact-phone"
          className="text-xs font-medium text-slate-300"
        >
          Phone Number
        </label>
        <input
          id="contact-phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange("phone")}
          className={inputClass("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          autoComplete="tel"
          inputMode="numeric"
          pattern="^(\+91[-\s]?)?[6-9]\d{9}$"
          required
        />
        {errors.phone && (
          <p id="contact-phone-error" className="text-xs text-rose-400">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Service Field */}
      <div className="space-y-2">
        <label
          htmlFor="contact-service"
          className="text-xs font-medium text-slate-300"
        >
          Service Interested In
        </label>
        <input
          id="contact-service"
          type="text"
          placeholder="Service Interested In"
          value={form.service}
          onChange={handleChange("service")}
          className={inputClass("service")}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={
            errors.service ? "contact-service-error" : undefined
          }
          minLength={2}
          required
        />
        {errors.service && (
          <p id="contact-service-error" className="text-xs text-rose-400">
            {errors.service}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-medium text-slate-300"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange("message")}
          className={`${inputClass("message")} min-h-30`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          minLength={10}
          required
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-rose-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-2xl bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:translate-y-[-1px] hover:opacity-95 md:col-span-2"
      >
        Request Callback
      </button>

      {status && (
        <p className="text-xs text-emerald-400 md:col-span-2">{status}</p>
      )}
    </form>
  );
}
