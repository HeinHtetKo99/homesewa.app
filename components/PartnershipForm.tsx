"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  FORM_STACK_CLASS,
  FormSelect,
  MultiServiceSelect,
  PhotoDropzone,
  ResetIcon,
  fieldLabelClass,
  textInputClass,
} from "@/components/form-controls";
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

const CERT_ACCEPT =
  "image/*,.heic,.heif,.pdf,application/pdf";

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
  const [hearAbout, setHearAbout] = useState("");
  const [message, setMessage] = useState("");
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [certItems, setCertItems] = useState<CertItem[]>([]);
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const [certDragOver, setCertDragOver] = useState(false);

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
  const [emailError, setEmailError] = useState<string | null>(null);

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
    setHearAbout("");
    setMessage("");
    setPhotoItems((prev) => {
      revokePhotoItems(prev);
      return [];
    });
    setCertItems((prev) => {
      revokeCertItems(prev);
      return [];
    });
    setEmailError(null);
    setSubmitError(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
    if (certInputRef.current) certInputRef.current.value = "";
  }, []);

  const clear = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
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

    setCertItems((prev) => {
      const slotsLeft = MAX_REGISTRATION_CERTS - prev.length;
      if (slotsLeft <= 0) return prev;
      const valid = incoming.filter(
        (f) => f.size <= MAX_PARTNERSHIP_FILE_MB * 1024 * 1024,
      );
      return [...prev, ...valid.slice(0, slotsLeft).map(createCertItem)];
    });
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

    const emailErr = emailValidationError(email);
    setEmailError(emailErr);
    if (emailErr) return;

    if (!fullName.trim() || !phone.trim()) {
      setSubmitError("Please fill in all required fields (marked with *).");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setSubmitError("Enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("fullName", fullName.trim());
      data.append("organizationName", organizationName.trim());
      data.append("phone", phone);
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

  return (
    <div className="w-full bg-white px-5 py-8 sm:px-8 sm:py-10">

      <form
        id={formId}
        onSubmit={onSubmit}
        className={FORM_STACK_CLASS}
        noValidate
      >
        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-name`} className={fieldLabelClass()}>
            Full Name<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-name`}
            className={textInputClass()}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-org`} className={fieldLabelClass()}>
            Name of Organisation
          </label>
          <input
            id={`${formId}-org`}
            className={textInputClass()}
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            autoComplete="organization"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-phone`} className={fieldLabelClass()}>
            Phone Number<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className={textInputClass()}
            value={phone}
            onChange={(e) => setPhone(onlyDigits(e.target.value).slice(0, 10))}
            autoComplete="tel"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-email`} className={fieldLabelClass()}>
            eMail
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            className={textInputClass()}
            value={email}
            onChange={(e) => {
              const v = e.target.value;
              setEmail(v);
              setEmailError(emailValidationError(v));
            }}
            autoComplete="email"
            aria-invalid={emailError ? true : undefined}
          />
          {emailError ? (
            <p className="text-[12px] text-red-600">{emailError}</p>
          ) : null}
        </div>

        <PhotoDropzone
          inputId={`${formId}-photos`}
          label={COMPANY_PHOTOS_FIELD}
          photoCount={photoItems.length}
          maxPhotos={MAX_COMPANY_PHOTOS}
          dragOver={photoDragOver}
          onDragOver={(e) => {
            e.preventDefault();
            setPhotoDragOver(true);
          }}
          onDragLeave={() => setPhotoDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setPhotoDragOver(false);
            addPhotos(e.dataTransfer.files);
          }}
          onBrowse={addPhotos}
          disabled={photoItems.length >= MAX_COMPANY_PHOTOS}
          previews={photoItems.map((item) => ({
            id: item.id,
            url: item.previewUrl,
            name: item.file.name,
          }))}
          onRemove={removePhoto}
          inputRef={photoInputRef}
        />

        <div className="flex flex-col gap-2">
          <span className={fieldLabelClass()}>{COMPANY_CERTIFICATES_FIELD}</span>
          <label
            htmlFor={`${formId}-certs`}
            onDragOver={(e) => {
              e.preventDefault();
              setCertDragOver(true);
            }}
            onDragLeave={() => setCertDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setCertDragOver(false);
              addCerts(e.dataTransfer.files);
            }}
            className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-4 py-8 text-center transition-colors ${
              certDragOver
                ? "border-gray-500 bg-gray-50"
                : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50/50"
            } ${certItems.length >= MAX_REGISTRATION_CERTS ? "pointer-events-none opacity-60" : ""}`}
          >
            <svg
              className="mb-2 h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-[15px] text-gray-700">
              Drop files here or{" "}
              <span className="text-blue-600 underline">browse</span>
            </span>
            <span className="mt-1 text-[12px] text-gray-500">
              {certItems.length}/{MAX_REGISTRATION_CERTS} files · images or PDF ·
              max {MAX_PARTNERSHIP_FILE_MB} MB each
            </span>
            <input
              ref={certInputRef}
              id={`${formId}-certs`}
              type="file"
              accept={CERT_ACCEPT}
              multiple
              className="sr-only"
              disabled={certItems.length >= MAX_REGISTRATION_CERTS}
              onChange={(e) => addCerts(e.target.files)}
            />
          </label>
          {certItems.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {certItems.map((item) => (
                <li
                  key={item.id}
                  className={
                    item.previewUrl
                      ? "relative h-24 w-24 shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-100 sm:h-28 sm:w-28"
                      : "flex min-w-[10rem] max-w-full items-center justify-between gap-2 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-[13px]"
                  }
                >
                  {item.previewUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="block h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-sm text-white hover:bg-red-600"
                        aria-label={`Remove ${item.file.name}`}
                        onClick={() => removeCert(item.id)}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="truncate text-gray-800">
                        {item.file.name}
                      </span>
                      <button
                        type="button"
                        className="shrink-0 text-gray-500 hover:text-red-600"
                        aria-label={`Remove ${item.file.name}`}
                        onClick={() => removeCert(item.id)}
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

        <FormSelect
          id={`${formId}-city`}
          label="City"
          options={PARTNERSHIP_CITIES}
          value={city}
          onChange={setCity}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-employees`} className={fieldLabelClass()}>
            Number of Employees
          </label>
          <input
            id={`${formId}-employees`}
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            className={textInputClass()}
            value={numberOfEmployees}
            onChange={(e) => setNumberOfEmployees(e.target.value)}
          />
        </div>

        <FormSelect
          id={`${formId}-business`}
          label="Business Type"
          options={BUSINESS_TYPES}
          value={businessType}
          onChange={setBusinessType}
        />

        <MultiServiceSelect
          id={`${formId}-services`}
          label="Services Offered"
          options={BOOKING_SERVICES}
          values={services}
          onChange={setServices}
          addButtonLabel="Add service"
        />

        <FormSelect
          id={`${formId}-interests`}
          label="Partnership Interests"
          options={PARTNERSHIP_INTERESTS}
          value={partnershipInterests}
          onChange={setPartnershipInterests}
        />

        <FormSelect
          id={`${formId}-hear`}
          label="How did you hear about us?"
          options={PARTNERSHIP_HEAR_ABOUT}
          value={hearAbout}
          onChange={setHearAbout}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-message`} className={fieldLabelClass()}>
            Message
          </label>
          <textarea
            id={`${formId}-message`}
            rows={5}
            className={textInputClass() + " resize-y min-h-[120px]"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {submitError ? (
          <p
            role="alert"
            className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-800"
          >
            {submitError}
          </p>
        ) : null}

        {submitSuccess ? (
          <div role="status" className="space-y-2">
            <p className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[13px] text-green-800">
              Thank you! Your partnership inquiry has been submitted. Our team
              will contact you shortly.
            </p>
            {submitWarning ? (
              <p className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
                {submitWarning}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={clear}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 text-[14px] text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            <ResetIcon />
            Clear form
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-black px-8 py-2.5 text-[14px] font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          Do not submit passwords through this form. Report malicious form.
        </p>
      </form>
    </div>
  );
}
