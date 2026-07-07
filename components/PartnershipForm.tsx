"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BOOKING_SERVICES } from "@/lib/book-form-options";
import { emailValidationError } from "@/lib/form-validation";
import {
  BUSINESS_TYPES,
  COMPANY_CERTIFICATES_FIELD,
  COMPANY_PHOTOS_FIELD,
  MAX_COMPANY_PHOTOS,
  MAX_PARTNERSHIP_FILE_MB,
  MAX_REGISTRATION_CERTS,
  PARTNERSHIP_CITIES,
  PARTNERSHIP_HEAR_ABOUT,
  PARTNERSHIP_INTERESTS,
} from "@/lib/partnership-form-options";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

const CERT_ACCEPT = "image/*,.heic,.heif,.pdf,application/pdf";

const INPUT_BASE =
  "w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-3.5 text-[15px] font-medium text-[#1A1A1A] outline-none transition-colors placeholder:text-[#4B4B4B]";
const INPUT_ACTIVE = "border-[#295C59] bg-[#EFF8F7]";
const LABEL_CLASS =
  "mb-1.5 pl-1 text-[14px] font-semibold text-[#4A4A4A]";

const IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "jfif",
  "pjpeg",
  "png",
  "gif",
  "webp",
  "heic",
  "heif",
  "bmp",
  "avif",
]);

type PhotoItem = {
  id: string;
  file: File;
  previewUrl: string;
};

type CertItem = {
  id: string;
  file: File;
  previewUrl?: string;
};

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.has(ext);
}

function isCertFile(file: File): boolean {
  if (file.type === "application/pdf") return true;
  return isImageFile(file);
}

function createPhotoItem(file: File): PhotoItem {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`;
  return {
    id,
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

function createCertItem(file: File): CertItem {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`;
  return {
    id,
    file,
    previewUrl: isImageFile(file) ? URL.createObjectURL(file) : undefined,
  };
}

function revokePhotoItems(items: PhotoItem[]) {
  for (const item of items) {
    URL.revokeObjectURL(item.previewUrl);
  }
}

function revokeCertItems(items: CertItem[]) {
  for (const item of items) {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  }
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

function FormLabel({
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
              ? "border-[#295C59] bg-[#EFF8F7]"
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
                  className="w-full px-3.5 py-2.5 text-left text-[15px] text-[#1A1A1A] hover:bg-[#EFF8F7]"
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

function MultiSelect({
  id,
  label,
  options,
  values,
  onChange,
  placeholder,
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
              ? "border-[#295C59] bg-[#EFF8F7]"
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
        {open && remaining.length > 0 ? (
          <ul
            role="listbox"
            className="absolute z-40 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg"
          >
            {remaining.map((opt) => (
              <li key={opt} role="option">
                <button
                  type="button"
                  className="w-full px-3.5 py-2.5 text-left text-[15px] text-[#1A1A1A] hover:bg-[#EFF8F7]"
                  onClick={() => onChange([...values, opt])}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {values.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex max-w-full items-center gap-1 rounded-lg bg-[#EFF8F7] px-2.5 py-1 text-[13px] text-[#1A1A1A]"
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

function MultiFileUpload({
  id,
  label,
  accept,
  items,
  maxFiles,
  onBrowse,
  onRemove,
  inputRef,
  active,
  onFocus,
  onBlur,
  disabled,
}: {
  id: string;
  label: string;
  accept: string;
  items: { id: string; name: string; previewUrl?: string }[];
  maxFiles: number;
  onBrowse: (files: FileList | null) => void;
  onRemove: (id: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
  disabled?: boolean;
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
            ? "border-[#295C59] bg-[#EFF8F7]"
            : "border-[#E2E8F0] bg-white hover:border-[#cbd5e1]"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
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
          {items.length}/{maxFiles} files · max {MAX_PARTNERSHIP_FILE_MB} MB each
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          disabled={disabled}
          onChange={(e) => onBrowse(e.target.files)}
        />
      </label>
      {items.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={
                item.previewUrl
                  ? "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#EFF8F7]"
                  : "flex min-w-[10rem] max-w-full items-center justify-between gap-2 rounded-lg border border-[#E2E8F0] bg-[#EFF8F7] px-3 py-2"
              }
            >
              {item.previewUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white hover:bg-red-600"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => onRemove(item.id)}
                  >
                    ×
                  </button>
                </>
              ) : (
                <>
                  <span className="truncate text-[13px] text-[#1A1A1A]">
                    {item.name}
                  </span>
                  <button
                    type="button"
                    className="shrink-0 text-[#4B4B4B] hover:text-[#1A1A1A]"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => onRemove(item.id)}
                  >
                    ×
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
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
            className="flex-1 py-3.5 text-[16px] font-medium text-[#0a7de1] transition-colors hover:bg-[#EFF8F7]"
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

export default function PartnershipForm() {
  const formId = useId();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const certInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [partnershipInterests, setPartnershipInterests] = useState("");
  const [hearAbout, setHearAbout] = useState("Google Search");
  const [message, setMessage] = useState("");
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [certItems, setCertItems] = useState<CertItem[]>([]);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const photoItemsRef = useRef<PhotoItem[]>([]);
  const certItemsRef = useRef<CertItem[]>([]);
  photoItemsRef.current = photoItems;
  certItemsRef.current = certItems;

  useEffect(() => {
    return () => {
      revokePhotoItems(photoItemsRef.current);
      revokeCertItems(certItemsRef.current);
    };
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const resetFields = useCallback(() => {
    setFullName("");
    setOrganizationName("");
    setPhone("");
    setEmail("");
    setCity("");
    setNumberOfEmployees("");
    setBusinessType("");
    setServices([]);
    setPartnershipInterests("");
    setHearAbout("Google Search");
    setMessage("");
    setPhotoItems((prev) => {
      revokePhotoItems(prev);
      return [];
    });
    setCertItems((prev) => {
      revokeCertItems(prev);
      return [];
    });
    setActiveInput(null);
    setSubmitError(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
    if (certInputRef.current) certInputRef.current.value = "";
  }, []);

  const confirmClearForm = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
    setShowClearConfirm(false);
  };

  const addPhotos = (files: FileList | null) => {
    if (!files?.length) return;
    const incoming = Array.from(files).filter(isImageFile);
    if (incoming.length === 0) {
      setSubmitError("Please choose image files (JPG, PNG, WEBP, etc.).");
      return;
    }

    const maxBytes = MAX_PARTNERSHIP_FILE_MB * 1024 * 1024;
    const valid = incoming.filter((f) => f.size <= maxBytes);
    const oversized = incoming.length - valid.length;
    const slotsLeft = MAX_COMPANY_PHOTOS - photoItems.length;

    if (slotsLeft <= 0) {
      setSubmitError(`You can upload up to ${MAX_COMPANY_PHOTOS} photos.`);
      return;
    }
    if (valid.length === 0) {
      setSubmitError(
        `Each photo must be ${MAX_PARTNERSHIP_FILE_MB} MB or smaller.`,
      );
      return;
    }

    setSubmitError(null);
    setSubmitWarning(null);
    setPhotoItems((prev) => [
      ...prev,
      ...valid.slice(0, slotsLeft).map(createPhotoItem),
    ]);

    if (oversized > 0) {
      setSubmitWarning(
        `${oversized} file(s) skipped because they exceed ${MAX_PARTNERSHIP_FILE_MB} MB.`,
      );
    }
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotoItems((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const addCerts = (files: FileList | null) => {
    if (!files?.length) return;
    const incoming = Array.from(files).filter(isCertFile);
    if (incoming.length === 0) return;

    const maxBytes = MAX_PARTNERSHIP_FILE_MB * 1024 * 1024;
    const valid = incoming.filter((f) => f.size <= maxBytes);
    const slotsLeft = MAX_REGISTRATION_CERTS - certItems.length;

    if (slotsLeft <= 0) {
      setSubmitError(
        `You can upload up to ${MAX_REGISTRATION_CERTS} certificates.`,
      );
      return;
    }
    if (valid.length === 0) {
      setSubmitError(
        `Each file must be ${MAX_PARTNERSHIP_FILE_MB} MB or smaller.`,
      );
      return;
    }

    setCertItems((prev) => [
      ...prev,
      ...valid.slice(0, slotsLeft).map(createCertItem),
    ]);
    if (certInputRef.current) certInputRef.current.value = "";
  };

  const removeCert = (id: string) => {
    setCertItems((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
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

    if (!email.trim()) {
      setSubmitError("Email is required.");
      return;
    }

    const emailErr = emailValidationError(email);
    if (emailErr) {
      setSubmitError(emailErr);
      return;
    }

    if (!organizationName.trim()) {
      setSubmitError("Organization name is required.");
      return;
    }

    if (!numberOfEmployees.trim()) {
      setSubmitError("Number of employees is required.");
      return;
    }

    if (!city.trim()) {
      setSubmitError("Please select area.");
      return;
    }

    if (!businessType.trim()) {
      setSubmitError("Please select business type.");
      return;
    }

    if (!partnershipInterests.trim()) {
      setSubmitError("Please select partnership type.");
      return;
    }

    if (!hearAbout.trim()) {
      setSubmitError("Please select how you heard about us.");
      return;
    }

    if (services.length === 0) {
      setSubmitError("Please select at least one service.");
      return;
    }

    if (photoItems.length === 0) {
      setSubmitError("Please upload company photos.");
      return;
    }

    if (certItems.length === 0) {
      setSubmitError("Please upload CRC photos.");
      return;
    }

    if (!message.trim()) {
      setSubmitError("Message cannot be empty.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("fullName", fullName.trim());
      data.append("organizationName", organizationName.trim());
      data.append("phone", phoneDigits);
      data.append("email", email.trim());
      data.append("city", city);
      data.append("numberOfEmployees", numberOfEmployees);
      data.append("businessType", businessType);
      data.append("services", JSON.stringify(services));
      data.append("partnershipInterests", partnershipInterests);
      data.append("hearAbout", hearAbout);
      data.append("message", message.trim());
      for (const item of photoItems) {
        data.append("companyPhotos", item.file);
      }
      for (const item of certItems) {
        data.append("registrationCerts", item.file);
      }

      const res = await fetch("/api/partnership", {
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
          Become a Partner
        </h2>
        <p className="mt-1 pl-0.5 text-[14px] text-[#666]">
          Partnership opportunity with HomeSewa
        </p>

        <div className="my-5" />

        <FormLabel htmlFor={`${formId}-name`}>Full Name</FormLabel>
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

        <FormLabel htmlFor={`${formId}-org`}>Name of Organization</FormLabel>
        <input
          id={`${formId}-org`}
          className={inputClass("organization")}
          placeholder="Enter the name of your Organization"
          value={organizationName}
          maxLength={100}
          onFocus={() => setActiveInput("organization")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setOrganizationName(e.target.value)}
          autoComplete="organization"
        />

        <FormLabel htmlFor={`${formId}-phone`}>Phone Number</FormLabel>
        <PhoneInput
          id={`${formId}-phone`}
          value={phone}
          onChange={setPhone}
          placeholder="Enter your Phone Number"
          active={activeInput === "phone"}
          onFocus={() => setActiveInput("phone")}
          onBlur={() => setActiveInput(null)}
        />

        <FormLabel htmlFor={`${formId}-email`}>Email</FormLabel>
        <input
          id={`${formId}-email`}
          type="email"
          className={inputClass("email")}
          placeholder="Enter your Email Address"
          value={email}
          onFocus={() => setActiveInput("email")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <MultiFileUpload
          id={`${formId}-photos`}
          label={COMPANY_PHOTOS_FIELD}
          accept="image/*,.heic,.heif"
          items={photoItems.map((item) => ({
            id: item.id,
            name: item.file.name,
            previewUrl: item.previewUrl,
          }))}
          maxFiles={MAX_COMPANY_PHOTOS}
          onBrowse={addPhotos}
          onRemove={removePhoto}
          inputRef={photoInputRef}
          active={activeInput === "companyPhotos"}
          onFocus={() => setActiveInput("companyPhotos")}
          onBlur={() => setActiveInput(null)}
          disabled={photoItems.length >= MAX_COMPANY_PHOTOS}
        />

        <SingleSelect
          id={`${formId}-area`}
          label="Area"
          options={PARTNERSHIP_CITIES}
          value={city}
          onChange={setCity}
          placeholder="Select your Area"
          active={activeInput === "area"}
          onOpen={() => setActiveInput("area")}
          onClose={() => setActiveInput(null)}
        />

        <FormLabel htmlFor={`${formId}-employees`}>Number of Employees</FormLabel>
        <input
          id={`${formId}-employees`}
          className={inputClass("employees")}
          placeholder="Enter the number of Employees"
          value={numberOfEmployees}
          inputMode="numeric"
          onFocus={() => setActiveInput("employees")}
          onBlur={() => setActiveInput(null)}
          onChange={(e) => setNumberOfEmployees(onlyDigits(e.target.value))}
        />

        <SingleSelect
          id={`${formId}-business`}
          label="Business Type"
          options={BUSINESS_TYPES}
          value={businessType}
          onChange={setBusinessType}
          placeholder="Select your Business Type"
          active={activeInput === "businessType"}
          onOpen={() => setActiveInput("businessType")}
          onClose={() => setActiveInput(null)}
        />

        <MultiSelect
          id={`${formId}-services`}
          label="Services Offered"
          options={BOOKING_SERVICES}
          values={services}
          onChange={setServices}
          placeholder="Select the Services you offer"
          active={activeInput === "servicesOffered"}
          onOpen={() => setActiveInput("servicesOffered")}
          onClose={() => setActiveInput(null)}
        />

        <SingleSelect
          id={`${formId}-interests`}
          label="Partnership Interest"
          options={PARTNERSHIP_INTERESTS}
          value={partnershipInterests}
          onChange={setPartnershipInterests}
          placeholder="Select Partnership Interest"
          active={activeInput === "partnership"}
          onOpen={() => setActiveInput("partnership")}
          onClose={() => setActiveInput(null)}
        />

        <MultiFileUpload
          id={`${formId}-certs`}
          label={COMPANY_CERTIFICATES_FIELD}
          accept={CERT_ACCEPT}
          items={certItems.map((item) => ({
            id: item.id,
            name: item.file.name,
            previewUrl: item.previewUrl,
          }))}
          maxFiles={MAX_REGISTRATION_CERTS}
          onBrowse={addCerts}
          onRemove={removeCert}
          inputRef={certInputRef}
          active={activeInput === "crcPhotos"}
          onFocus={() => setActiveInput("crcPhotos")}
          onBlur={() => setActiveInput(null)}
          disabled={certItems.length >= MAX_REGISTRATION_CERTS}
        />

        <SingleSelect
          id={`${formId}-hear`}
          label="How did you hear about us?"
          options={PARTNERSHIP_HEAR_ABOUT}
          value={hearAbout}
          onChange={setHearAbout}
          placeholder="How did you hear about us?"
          active={activeInput === "howHeard"}
          onOpen={() => setActiveInput("howHeard")}
          onClose={() => setActiveInput(null)}
        />

        <FormLabel htmlFor={`${formId}-message`}>Message</FormLabel>
        <textarea
          id={`${formId}-message`}
          rows={5}
          className={`${INPUT_BASE} mb-5 min-h-[120px] resize-y py-3 ${
            activeInput === "message" ? INPUT_ACTIVE : ""
          }`}
          placeholder="Enter your message here"
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
              Thank you! Your partnership inquiry has been submitted. Our team
              will contact you shortly.
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
