"use client";

import { useCallback, useId, useState } from "react";
import {
  FORM_STACK_CLASS,
  FormLabel,
  ResetIcon,
  inputClass,
  textareaClass,
} from "@/components/form-controls";
import { emailValidationError } from "@/lib/form-validation";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

export default function ContactForm() {
  const formId = useId();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const resetFields = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setMessage("");
    setActiveInput(null);
    setEmailError(null);
    setSubmitError(null);
  }, []);

  const clear = () => {
    resetFields();
    setSubmitSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }

    const emailErr = emailValidationError(email);
    setEmailError(emailErr);
    if (emailErr) return;

    if (!fullName.trim() || fullName.trim().length < 2) {
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setSubmitError("Phone number is required.");
      return;
    }

    if (!/^\d{7,15}$/.test(phone)) {
      setSubmitError("Phone must be 7–15 digits.");
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setSubmitError("Message must be at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          message: message.trim(),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setSubmitError(
          json.error ?? "There was a problem sending your message. Please try again.",
        );
        return;
      }

      resetFields();
      setSubmitSuccess(true);
    } catch {
      setSubmitError("We could not submit your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white px-[6%] py-5 sm:py-8">
      <form
        id={formId}
        onSubmit={onSubmit}
        className={`${FORM_STACK_CLASS} mx-auto max-w-2xl`}
        noValidate
      >
        <FormLabel htmlFor={`${formId}-name`} required>
          Full Name
        </FormLabel>
        <input
          id={`${formId}-name`}
          className={inputClass(activeInput === "name")}
          placeholder="Enter your Full Name"
          value={fullName}
          onFocus={() => setActiveInput("name")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          required
        />

        <FormLabel htmlFor={`${formId}-email`} required>
          eMail
        </FormLabel>
        <input
          id={`${formId}-email`}
          type="email"
          className={inputClass(activeInput === "email")}
          placeholder="Enter your Email"
          value={email}
          onFocus={() => setActiveInput("email")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => {
            const v = e.target.value;
            setEmail(v);
            setEmailError(v.trim() ? emailValidationError(v) : null);
          }}
          autoComplete="email"
          required
          aria-invalid={emailError ? true : undefined}
        />
        {emailError ? (
          <p className="-mt-3 mb-5 text-[12px] text-red-600">{emailError}</p>
        ) : null}

        <FormLabel htmlFor={`${formId}-phone`} required>
          Phone Number
        </FormLabel>
        <input
          id={`${formId}-phone`}
          type="tel"
          inputMode="numeric"
          maxLength={15}
          className={inputClass(activeInput === "phone")}
          placeholder="Enter your Phone Number"
          value={phone}
          onFocus={() => setActiveInput("phone")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setPhone(onlyDigits(e.target.value).slice(0, 15))}
          autoComplete="tel"
          required
        />

        <FormLabel htmlFor={`${formId}-city`}>City</FormLabel>
        <input
          id={`${formId}-city`}
          className={inputClass(activeInput === "city")}
          placeholder="Kathmandu, Lalitpur, Bhaktapur…"
          value={city}
          onFocus={() => setActiveInput("city")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="address-level2"
        />

        <FormLabel htmlFor={`${formId}-message`} required>
          Message
        </FormLabel>
        <textarea
          id={`${formId}-message`}
          rows={5}
          className={textareaClass(activeInput === "message", "min-h-[120px]")}
          placeholder="Enter your message..."
          value={message}
          onFocus={() => setActiveInput("message")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {submitError ? (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800"
          >
            {submitError}
          </p>
        ) : null}

        {submitSuccess ? (
          <p
            role="status"
            className="mb-4 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-[13px] text-green-800"
          >
            Thank you! Your message has been received. We will get back to you soon.
          </p>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={clear}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0a7de1] hover:opacity-80 disabled:opacity-50"
          >
            <ResetIcon />
            Clear form
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="h-11 min-w-[120px] rounded-xl bg-black px-8 text-[15px] font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Submit"}
          </button>
        </div>

        <p className="text-center text-[11px] text-[#4B4B4B]">
          Do not submit passwords through this form. Report malicious form.
        </p>
      </form>
    </div>
  );
}
