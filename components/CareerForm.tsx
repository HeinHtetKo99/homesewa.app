"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BOOKING_SERVICES } from "@/lib/book-form-options";
import {
  CAREER_POSITIONS,
  MAX_CAREER_FILE_MB,
  PREFERRED_WORKING_AREAS,
} from "@/lib/career-form-options";
import { emailValidationError } from "@/lib/form-validation";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

const DOCUMENT_ACCEPT =
  "image/*,.heic,.heif,.pdf,application/pdf";
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const INPUT_BASE =
  "w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-3.5 text-[15px] font-medium text-[#1A1A1A] outline-none transition-colors placeholder:text-[#4B4B4B]";
const INPUT_ACTIVE = "border-[hsl(142,71%,45%)] bg-[#F4F7FF]";
const LABEL_CLASS =
  "mb-1.5 pl-1 text-[14px] font-semibold text-[#4A4A4A]";

type FileItem = {
  file: File;
  previewUrl?: string;
};

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "bmp"].includes(
    ext,
  );
}

function createFileItem(file: File): FileItem {
  return {
    file,
    previewUrl: isImageFile(file) ? URL.createObjectURL(file) : undefined,
  };
}

function revokeFileItem(item: FileItem | null) {
  if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
}

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

function CareerLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={LABEL_CLASS}>
      {children}
      <RequiredMark />
    </label>
  );
}

function CareerPhoneInput({
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
        className="pointer-events-none absolute left-2.5 top-1/2 z-10 -translate-y-1/2 text-lg"
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

function CareerDropdown({
  id,
  label,
  options,
  values,
  onChange,
  placeholder,
  maxSelections,
  active,
  onOpen,
  onClose,
}: {
  id: string;
  label: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  maxSelections?: number;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
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

  const remaining = options.filter((o) => !values.includes(o));
  const atMax = maxSelections != null && values.length >= maxSelections;

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
        <RequiredMark />
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
          <span
            className={`min-w-0 flex-1 ${
              values.length ? "text-[#1A1A1A]" : "text-[#4B4B4B]"
            }`}
          >
            {values.length ? values.join(", ") : placeholder}
          </span>
          <ChevronDown />
        </button>
        {open && remaining.length > 0 && !atMax ? (
          <ul
            role="listbox"
            className="absolute z-40 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg"
          >
            {remaining.map((opt) => (
              <li key={opt} role="option">
                <button
                  type="button"
                  className="w-full px-3.5 py-2.5 text-left text-[15px] text-[#1A1A1A] hover:bg-[#F4F7FF]"
                  onClick={() => {
                    onChange([...values, opt]);
                    if (maxSelections != null && values.length + 1 >= maxSelections) {
                      setOpen(false);
                      onClose();
                    }
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {open && atMax ? (
          <p className="absolute z-40 mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[14px] text-[#4B4B4B] shadow-lg">
            Maximum {maxSelections} selections
          </p>
        ) : null}
      </div>
      {values.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex max-w-full items-center gap-1 rounded-lg bg-[#F4F7FF] px-2.5 py-1 text-[13px] text-[#1A1A1A]"
            >
              <span className="truncate">{v}</span>
              <button
                type="button"
                className="text-[#4B4B4B] hover:text-[#1A1A1A]"
                aria-label={`Remove ${v}`}
                onClick={() => onChange(values.filter((x) => x !== v))}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CareerFileUpload({
  id,
  label,
  accept,
  file,
  onBrowse,
  onRemove,
  inputRef,
  active,
  onFocus,
  onBlur,
}: {
  id: string;
  label: string;
  accept: string;
  file: FileItem | null;
  onBrowse: (files: FileList | null) => void;
  onRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div className="mb-5">
      <span className={LABEL_CLASS}>
        {label}
        <RequiredMark />
      </span>
      <label
        htmlFor={id}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] px-4 py-6 text-center transition-colors ${
          active
            ? "border-[hsl(142,71%,45%)] bg-[#F4F7FF]"
            : "border-[#E2E8F0] bg-white hover:border-[#cbd5e1]"
        }`}
      >
        <svg
          className="mb-2 h-7 w-7 text-[#4B4B4B]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1"
          />
        </svg>
        <span className="text-[14px] font-medium text-[#4A4A4A]">
          Tap to upload or browse
        </span>
        <span className="mt-1 text-[12px] text-[#4B4B4B]">
          Max {MAX_CAREER_FILE_MB} MB
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onBrowse(e.target.files)}
        />
      </label>
      {file ? (
        <div className="mt-2 flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F4F7FF] p-3">
          {file.previewUrl ? (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.previewUrl}
                alt={file.file.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[#1A1A1A]">
              {file.file.name}
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 text-[18px] text-[#4B4B4B] hover:text-[#1A1A1A]"
            aria-label={`Remove ${file.file.name}`}
            onClick={onRemove}
          >
            ×
          </button>
        </div>
      ) : null}
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
            className="flex-1 py-3.5 text-[16px] font-medium text-[#0a7de1] transition-colors hover:bg-[#F4F7FF]"
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

export default function CareerForm() {
  const formId = useId();
  const idProofInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [expertise, setExpertise] = useState<string[]>([]);
  const [yearsExperience, setYearsExperience] = useState("");
  const [preferredAreas, setPreferredAreas] = useState<string[]>([]);
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");
  const [idProofItem, setIdProofItem] = useState<FileItem | null>(null);
  const [resumeItem, setResumeItem] = useState<FileItem | null>(null);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const idProofRef = useRef<FileItem | null>(null);
  const resumeRef = useRef<FileItem | null>(null);
  idProofRef.current = idProofItem;
  resumeRef.current = resumeItem;

  useEffect(() => {
    return () => {
      revokeFileItem(idProofRef.current);
      revokeFileItem(resumeRef.current);
    };
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const resetFields = useCallback(() => {
    setFullName("");
    setPhone("");
    setEmail("");
    setPositions([]);
    setExpertise([]);
    setYearsExperience("");
    setPreferredAreas([]);
    setInsurancePolicyNumber("");
    setEmergencyContact("");
    setCoverLetter("");
    setMessage("");
    setIdProofItem((prev) => {
      revokeFileItem(prev);
      return null;
    });
    setResumeItem((prev) => {
      revokeFileItem(prev);
      return null;
    });
    setActiveInput(null);
    setSubmitError(null);
    if (idProofInputRef.current) idProofInputRef.current.value = "";
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }, []);

  const handleClearForm = () => {
    setShowClearConfirm(true);
  };

  const confirmClearForm = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
    setShowClearConfirm(false);
  };

  const setSingleFile = (
    files: FileList | null,
    setter: React.Dispatch<React.SetStateAction<FileItem | null>>,
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    const file = files?.[0];
    if (!file) return;
    if (file.size > MAX_CAREER_FILE_MB * 1024 * 1024) {
      setSubmitError(`Each file must be ${MAX_CAREER_FILE_MB} MB or smaller.`);
      return;
    }
    setter((prev) => {
      revokeFileItem(prev);
      return createFileItem(file);
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setSubmitWarning(null);

    const phoneDigits = stripPhoneSpaces(phone);
    const emergencyDigits = stripPhoneSpaces(emergencyContact);

    if (!fullName.trim()) {
      setSubmitError("Full Name is required.");
      return;
    }

    if (!phoneDigits || phoneDigits.length !== 10) {
      setSubmitError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!email.trim()) {
      setSubmitError("Email is required.");
      return;
    }

    const emailErr = emailValidationError(email);
    if (emailErr) {
      setSubmitError(emailErr);
      return;
    }

    if (positions.length === 0) {
      setSubmitError("Please select at least one position.");
      return;
    }

    if (expertise.length === 0) {
      setSubmitError("Please select at least one expertise.");
      return;
    }

    if (!yearsExperience.trim()) {
      setSubmitError("Experience is required.");
      return;
    }

    if (!idProofItem?.file) {
      setSubmitError("Please upload your ID.");
      return;
    }

    if (preferredAreas.length === 0) {
      setSubmitError("Please select area.");
      return;
    }

    if (!insurancePolicyNumber.trim()) {
      setSubmitError("Policy number is required.");
      return;
    }

    if (!emergencyDigits || emergencyDigits.length !== 10) {
      setSubmitError("Enter a valid emergency contact number.");
      return;
    }

    if (!resumeItem?.file) {
      setSubmitError("Please upload your CV.");
      return;
    }

    if (!coverLetter.trim()) {
      setSubmitError("Cover message is required.");
      return;
    }

    if (!message.trim()) {
      setSubmitError("Message is required.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("fullName", fullName.trim());
      data.append("phone", phoneDigits);
      data.append("email", email.trim());
      data.append("positions", JSON.stringify(positions));
      data.append("expertise", JSON.stringify(expertise));
      data.append("yearsExperience", yearsExperience);
      data.append("preferredAreas", JSON.stringify(preferredAreas));
      data.append("insurancePolicyNumber", insurancePolicyNumber.trim());
      data.append("emergencyContact", emergencyDigits);
      data.append("coverLetter", coverLetter.trim());
      data.append("message", message.trim());
      data.append("idProof", idProofItem.file);
      data.append("resume", resumeItem.file);

      const res = await fetch("/api/career", {
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
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
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
      <form id={formId} onSubmit={onSubmit} className="mx-auto max-w-2xl" noValidate>
        <h2 className="pl-0.5 text-[22px] font-bold text-[#1A1A1A] sm:text-[26px]">
          HomeSewa - Join Now
        </h2>

        <div className="my-5" />

        <CareerLabel htmlFor={`${formId}-name`}>Full Name</CareerLabel>
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

        <CareerLabel htmlFor={`${formId}-phone`}>Phone Number</CareerLabel>
        <CareerPhoneInput
          id={`${formId}-phone`}
          value={phone}
          onChange={setPhone}
          placeholder="Enter your Phone Number"
          active={activeInput === "phone"}
          onFocus={() => setActiveInput("phone")}
          onBlur={() => setActiveInput(null)}
        />

        <CareerLabel htmlFor={`${formId}-email`}>Email</CareerLabel>
        <input
          id={`${formId}-email`}
          type="email"
          className={inputClass("email")}
          placeholder="Enter your email address"
          value={email}
          onFocus={() => setActiveInput("email")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <CareerDropdown
          id={`${formId}-position`}
          label="Position Applied For"
          options={CAREER_POSITIONS}
          values={positions}
          onChange={setPositions}
          placeholder="Select the position you are applying for"
          active={activeInput === "position"}
          onOpen={() => setActiveInput("position")}
          onClose={() => setActiveInput(null)}
        />

        <CareerDropdown
          id={`${formId}-expertise`}
          label="Area of Expertise"
          options={BOOKING_SERVICES}
          values={expertise}
          onChange={setExpertise}
          placeholder="Select the area of expertise"
          maxSelections={3}
          active={activeInput === "expertise"}
          onOpen={() => setActiveInput("expertise")}
          onClose={() => setActiveInput(null)}
        />

        <CareerLabel htmlFor={`${formId}-years`}>Years of Experience</CareerLabel>
        <input
          id={`${formId}-years`}
          className={inputClass("experience")}
          placeholder="Enter your years of experience in the field"
          value={yearsExperience}
          inputMode="numeric"
          onFocus={() => setActiveInput("experience")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setYearsExperience(onlyDigits(e.target.value))}
        />

        <CareerFileUpload
          id={`${formId}-id-proof`}
          label="ID Proof"
          accept={DOCUMENT_ACCEPT}
          file={idProofItem}
          onBrowse={(files) =>
            setSingleFile(files, setIdProofItem, idProofInputRef)
          }
          onRemove={() => {
            setIdProofItem((prev) => {
              revokeFileItem(prev);
              return null;
            });
            if (idProofInputRef.current) idProofInputRef.current.value = "";
          }}
          inputRef={idProofInputRef}
          active={activeInput === "idProof"}
          onFocus={() => setActiveInput("idProof")}
          onBlur={() => setActiveInput(null)}
        />

        <CareerDropdown
          id={`${formId}-areas`}
          label="Preferred Working Area"
          options={PREFERRED_WORKING_AREAS}
          values={preferredAreas}
          onChange={setPreferredAreas}
          placeholder="Select your preferred working area (max 5)"
          maxSelections={5}
          active={activeInput === "workingArea"}
          onOpen={() => setActiveInput("workingArea")}
          onClose={() => setActiveInput(null)}
        />

        <CareerLabel htmlFor={`${formId}-insurance`}>
          Insurance Policy Number
        </CareerLabel>
        <input
          id={`${formId}-insurance`}
          className={inputClass("policy")}
          placeholder="Enter the insurance policy number"
          value={insurancePolicyNumber}
          inputMode="numeric"
          onFocus={() => setActiveInput("policy")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) =>
            setInsurancePolicyNumber(onlyDigits(e.target.value))
          }
        />

        <CareerLabel htmlFor={`${formId}-emergency`}>
          Emergency Contact Number
        </CareerLabel>
        <CareerPhoneInput
          id={`${formId}-emergency`}
          value={emergencyContact}
          onChange={setEmergencyContact}
          placeholder="Enter your emergency contact number"
          active={activeInput === "emergencyPhone"}
          onFocus={() => setActiveInput("emergencyPhone")}
          onBlur={() => setActiveInput(null)}
        />

        <CareerFileUpload
          id={`${formId}-resume`}
          label="CV/Resume"
          accept={RESUME_ACCEPT}
          file={resumeItem}
          onBrowse={(files) =>
            setSingleFile(files, setResumeItem, resumeInputRef)
          }
          onRemove={() => {
            setResumeItem((prev) => {
              revokeFileItem(prev);
              return null;
            });
            if (resumeInputRef.current) resumeInputRef.current.value = "";
          }}
          inputRef={resumeInputRef}
          active={activeInput === "resume"}
          onFocus={() => setActiveInput("resume")}
          onBlur={() => setActiveInput(null)}
        />

        <CareerLabel htmlFor={`${formId}-cover`}>Cover Letter</CareerLabel>
        <textarea
          id={`${formId}-cover`}
          rows={5}
          className={`${INPUT_BASE} mb-5 min-h-[120px] resize-y py-3 ${
            activeInput === "coverLetter" ? INPUT_ACTIVE : ""
          }`}
          value={coverLetter}
          onFocus={() => setActiveInput("coverLetter")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setCoverLetter(e.target.value)}
        />

        <CareerLabel htmlFor={`${formId}-message`}>Message</CareerLabel>
        <textarea
          id={`${formId}-message`}
          rows={5}
          className={`${INPUT_BASE} mb-5 min-h-[120px] resize-y py-3 ${
            activeInput === "message" ? INPUT_ACTIVE : ""
          }`}
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
              Thank you! Your application has been submitted. Our team will
              contact you shortly.
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
            onClick={handleClearForm}
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
