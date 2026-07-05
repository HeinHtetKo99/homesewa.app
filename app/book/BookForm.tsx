"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BOOKING_CITY,
  BOOKING_PRIORITIES,
  BOOKING_SERVICES,
  BOOKING_SHIFTS,
  BUDGET_OPTIONS,
  Kathmandu_AREAS,
  PROPERTY_TYPES,
} from "@/lib/book-form-options";
import {
  bookingScheduleValidationError,
  getAvailableShifts,
  getBookingToday,
} from "@/lib/booking-datetime";
import { resolveBookingService } from "@/lib/service-booking-map";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

const INPUT_BASE =
  "w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-3.5 text-[15px] font-medium text-[#1A1A1A] outline-none transition-colors placeholder:text-[#4B4B4B]";
const INPUT_ACTIVE = "border-[hsl(142,71%,45%)] bg-[#F4F7FF]";
const LABEL_CLASS =
  "mb-1.5 pl-1 text-[14px] font-semibold text-[#4A4A4A]";

function formatPhoneDisplay(value: string): string {
  const cleaned = onlyDigits(value).slice(0, 10);
  if (cleaned.length > 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  if (cleaned.length > 3) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  return cleaned;
}

function stripPhoneSpaces(value: string): string {
  return value.replace(/\s/g, "");
}

function RequiredMark() {
  return <span className="text-red-600">*</span>;
}

function ChevronDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0 text-[#4B4B4B]"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FormLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={LABEL_CLASS}>
      {children}
      {required ? <RequiredMark /> : null}
    </label>
  );
}

function PhoneInput({
  id,
  value,
  onChange,
  placeholder,
  active,
  onFocus,
  onBlur,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div className="relative mb-5">
      <span
        className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-lg"
        aria-hidden
      >
        🇳🇵
      </span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        maxLength={12}
        className={`${INPUT_BASE} h-11 pl-12 pr-2.5 ${active ? INPUT_ACTIVE : ""}`}
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => onChange(formatPhoneDisplay(e.target.value))}
        autoComplete="tel"
      />
    </div>
  );
}

function SingleSelect({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  active,
  onOpen,
  onClose,
  required,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        onClose();
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) onOpen();
    else onClose();
  };

  return (
    <div ref={rootRef} className="mb-5">
      <span id={`${id}-label`} className={LABEL_CLASS}>
        {label}
        {required ? <RequiredMark /> : null}
      </span>
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-expanded={open}
          aria-labelledby={`${id}-label`}
          onClick={toggle}
          className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left text-[15px] font-medium outline-none transition-colors ${
            active || open
              ? "border-[hsl(142,71%,45%)] bg-[#F4F7FF]"
              : "border-[#E2E8F0] bg-white"
          }`}
        >
          <span className={value ? "text-[#1A1A1A]" : "text-[#4B4B4B]"}>
            {value || placeholder}
          </span>
          <ChevronDown />
        </button>
        {open ? (
          <ul
            role="listbox"
            className="absolute z-40 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg"
          >
            {options.map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className="w-full px-3.5 py-2.5 text-left text-[15px] text-[#1A1A1A] hover:bg-[#F4F7FF]"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    onClose();
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function ClearFormDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="clear-form-title"
        aria-describedby="clear-form-desc"
        className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="px-5 pb-4 pt-5 text-center">
          <h3
            id="clear-form-title"
            className="text-[17px] font-semibold text-[#1A1A1A]"
          >
            Clear Form
          </h3>
          <p
            id="clear-form-desc"
            className="mt-2 text-[14px] leading-relaxed text-[#4A4A4A]"
          >
            Are you sure you want to clear all fields?
          </p>
        </div>
        <div className="flex border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3.5 text-[16px] font-medium text-[#0a7de1] transition-colors hover:bg-[#F0FDF4]"
          >
            Cancel
          </button>
          <div className="w-px bg-[#E2E8F0]" aria-hidden />
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3.5 text-[16px] font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            Yes, Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookForm() {
  const formId = useId();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [shift, setShift] = useState("");
  const [area, setArea] = useState("");
  const [priority, setPriority] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const minDate = getBookingToday();
  const availableShifts = startDate
    ? getAvailableShifts(startDate)
    : BOOKING_SHIFTS;

  useEffect(() => {
    const resolved = resolveBookingService(serviceParam);
    if (resolved) {
      setSelectedService(resolved);
    }
  }, [serviceParam]);

  useEffect(() => {
    if (startDate && shift && !getAvailableShifts(startDate).includes(shift)) {
      setShift("");
    }
  }, [startDate, shift]);

  const resetFields = useCallback(() => {
    setFullName("");
    setPhone("");
    setSelectedService("");
    setStartDate("");
    setShift("");
    setArea("");
    setPriority("");
    setBudget("");
    setMessage("");
    setActiveInput(null);
    setSubmitError(null);
  }, []);

  const confirmClearForm = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
    setShowClearConfirm(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setSubmitWarning(null);

    const phoneDigits = stripPhoneSpaces(phone);

    if (!fullName.trim()) {
      setSubmitError("Full Name is required.");
      return;
    }

    if (!phoneDigits || phoneDigits.length !== 10) {
      setSubmitError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!selectedService) {
      setSubmitError("Please select a service.");
      return;
    }

    if (!startDate) {
      setSubmitError("Please select a date.");
      return;
    }

    if (!shift) {
      setSubmitError("Please choose a time shift.");
      return;
    }

    if (!area) {
      setSubmitError("Please select your location.");
      return;
    }

    if (!budget.trim()) {
      setSubmitError("Budget cannot be empty.");
      return;
    }

    if (!priority.trim()) {
      setSubmitError("Please choose a Priority.");
      return;
    }

    const scheduleErr = bookingScheduleValidationError({
      startDate,
      shift,
    });
    if (scheduleErr) {
      setSubmitError(scheduleErr);
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("fullName", fullName.trim());
      data.append("email", "");
      data.append("phone", phoneDigits);
      data.append("city", BOOKING_CITY);
      data.append("area", area);
      data.append("street", "");
      data.append("zip", "");
      data.append("landmark", "");
      data.append("propertyType", PROPERTY_TYPES[0]);
      data.append("services", JSON.stringify([selectedService]));
      data.append("startDate", startDate);
      data.append("deadlineDate", "");
      data.append("deadlineTime", "");
      data.append("shift", shift);
      data.append("budget", budget);
      data.append("priority", priority);
      data.append("workDescription", message.trim());
      data.append("referralSource", "");

      const res = await fetch("/api/bookings", {
        method: "POST",
        body: data,
      });

      const json = (await res.json()) as {
        ok?: boolean;
        error?: string;
        warning?: string;
      };

      if (!res.ok || !json.ok) {
        setSubmitError(json.error ?? "Submission failed. Please try again.");
        return;
      }

      resetFields();
      setSubmitSuccess(true);
      setSubmitWarning(json.warning ?? null);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (key: string) =>
    `${INPUT_BASE} mb-5 h-11 ${activeInput === key ? INPUT_ACTIVE : ""}`;

  return (
    <div className="w-full bg-white px-[6%] py-5 sm:py-8">
      <ClearFormDialog
        open={showClearConfirm}
        onCancel={() => setShowClearConfirm(false)}
        onConfirm={confirmClearForm}
      />
      <form
        id={formId}
        onSubmit={onSubmit}
        className="mx-auto max-w-2xl"
        noValidate
      >
        <h2 className="pl-0.5 text-[22px] font-bold text-[#1A1A1A] sm:text-[26px]">
          Book a Service
        </h2>
        <p className="mt-1 pl-0.5 text-[14px] text-[#666]">
          Fill out the parameters below to arrange your request
        </p>

        <div className="my-5" />
        <FormLabel htmlFor={`${formId}-name`} required>
          Full Name
        </FormLabel>
        <input
          id={`${formId}-name`}
          className={inputClass("name")}
          placeholder="Enter your Full Name"
          value={fullName}
          maxLength={30}
          onFocus={() => setActiveInput("name")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />

        <FormLabel htmlFor={`${formId}-phone`} required>
          Phone Number
        </FormLabel>
        <PhoneInput
          id={`${formId}-phone`}
          value={phone}
          onChange={setPhone}
          placeholder="Enter your Phone Number"
          active={activeInput === "phone"}
          onFocus={() => setActiveInput("phone")}
          onBlur={() => setActiveInput(null)}
        />

        <SingleSelect
          id={`${formId}-service`}
          label="Select Service"
          options={BOOKING_SERVICES}
          value={selectedService}
          onChange={setSelectedService}
          placeholder="Select Services"
          required
          active={activeInput === "service"}
          onOpen={() => setActiveInput("service")}
          onClose={() => setActiveInput(null)}
        />

        <FormLabel htmlFor={`${formId}-date`} required>
          Choose Date
        </FormLabel>
        <input
          id={`${formId}-date`}
          type="date"
          min={minDate}
          className={inputClass("date")}
          value={startDate}
          onFocus={() => setActiveInput("date")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <SingleSelect
          id={`${formId}-shift`}
          label="Preferred Time"
          options={
            availableShifts.length > 0 ? availableShifts : [...BOOKING_SHIFTS]
          }
          value={shift}
          onChange={setShift}
          placeholder="Choose a Shift"
          required
          active={activeInput === "shift"}
          onOpen={() => setActiveInput("shift")}
          onClose={() => setActiveInput(null)}
        />

        <SingleSelect
          id={`${formId}-area`}
          label="Your Location"
          options={Kathmandu_AREAS}
          value={area}
          onChange={setArea}
          placeholder="Select your Location"
          required
          active={activeInput === "location"}
          onOpen={() => setActiveInput("location")}
          onClose={() => setActiveInput(null)}
        />

        <SingleSelect
          id={`${formId}-priority`}
          label="Priority"
          options={BOOKING_PRIORITIES}
          value={priority}
          onChange={setPriority}
          placeholder="Select Priority"
          required
          active={activeInput === "priority"}
          onOpen={() => setActiveInput("priority")}
          onClose={() => setActiveInput(null)}
        />

        <SingleSelect
          id={`${formId}-budget`}
          label="Select Budget"
          options={BUDGET_OPTIONS}
          value={budget}
          onChange={setBudget}
          placeholder="Select Budget"
          required
          active={activeInput === "budget"}
          onOpen={() => setActiveInput("budget")}
          onClose={() => setActiveInput(null)}
        />

        <FormLabel htmlFor={`${formId}-message`}>Message</FormLabel>
        <textarea
          id={`${formId}-message`}
          rows={4}
          className={`${INPUT_BASE} mb-2 min-h-[100px] max-h-[140px] resize-y py-3 ${
            activeInput === "message" ? INPUT_ACTIVE : ""
          }`}
          placeholder="Provide specific notes or special context here..."
          value={message}
          onFocus={() => setActiveInput("message")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setMessage(e.target.value)}
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
          <div role="status" className="mb-4 space-y-2">
            <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-[13px] text-green-800">
              Thank you! Your booking has been submitted. Our team will contact
              you shortly.
            </p>
            {submitWarning ? (
              <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
                {submitWarning}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            disabled={submitting}
            className="mb-10 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0a7de1] hover:opacity-80 disabled:opacity-50"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 12a8 8 0 1 1 3 6.32"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 16V12h4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Clear form
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="mb-10 h-11 w-[40%] min-w-[120px] rounded-xl bg-black text-[15px] font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
