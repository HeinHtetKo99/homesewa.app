"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  FORM_STACK_CLASS,
  FileDropzone,
  FormSelect,
  ResetIcon,
  fieldLabelClass,
  textInputClass,
} from "@/components/form-controls";
import { BOOKING_SERVICES } from "@/lib/book-form-options";
import { emailValidationError } from "@/lib/form-validation";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");
const MAX_HEADSHOT_MB = 5;
const HEADSHOT_ACCEPT = "image/*,.heic,.heif";

type FileItem = {
  file: File;
  previewUrl: string;
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
    previewUrl: URL.createObjectURL(file),
  };
}

function revokeFileItem(item: FileItem | null) {
  if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
}

export default function FeedbackForm() {
  const formId = useId();
  const headshotInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [headshotItem, setHeadshotItem] = useState<FileItem | null>(null);
  const [headshotDragOver, setHeadshotDragOver] = useState(false);

  const headshotRef = useRef<FileItem | null>(null);
  headshotRef.current = headshotItem;

  useEffect(() => {
    return () => revokeFileItem(headshotRef.current);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const resetFields = useCallback(() => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setCountry("");
    setOrganization("");
    setDesignation("");
    setPhone("");
    setEmail("");
    setService("");
    setMessage("");
    setHeadshotItem((prev) => {
      revokeFileItem(prev);
      return null;
    });
    setEmailError(null);
    setSubmitError(null);
    if (headshotInputRef.current) headshotInputRef.current.value = "";
  }, []);

  const clear = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
  };

  const setHeadshot = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    if (!isImageFile(file)) {
      setSubmitError("Please choose an image file (JPG, PNG, WEBP, etc.).");
      return;
    }
    if (file.size > MAX_HEADSHOT_MB * 1024 * 1024) {
      setSubmitError(`Headshot must be ${MAX_HEADSHOT_MB} MB or smaller.`);
      return;
    }

    setSubmitError(null);
    setHeadshotItem((prev) => {
      revokeFileItem(prev);
      return createFileItem(file);
    });
    if (headshotInputRef.current) headshotInputRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setSubmitWarning(null);

    const emailErr = emailValidationError(email);
    setEmailError(emailErr);
    if (emailErr) return;

    if (
      !firstName.trim() ||
      !middleName.trim() ||
      !lastName.trim() ||
      !country.trim() ||
      !organization.trim() ||
      !designation.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !service ||
      !message.trim() ||
      !headshotItem
    ) {
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
      data.append("firstName", firstName.trim());
      data.append("middleName", middleName.trim());
      data.append("lastName", lastName.trim());
      data.append("country", country.trim());
      data.append("organization", organization.trim());
      data.append("designation", designation.trim());
      data.append("phone", phone);
      data.append("email", email.trim());
      data.append("service", service);
      data.append("message", message.trim());
      if (headshotItem?.file) data.append("headshot", headshotItem.file);

      const res = await fetch("/api/feedback", {
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
          <label htmlFor={`${formId}-first`} className={fieldLabelClass()}>
            First Name<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-first`}
            className={textInputClass()}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-middle`} className={fieldLabelClass()}>
            Middle Name<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-middle`}
            className={textInputClass()}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            autoComplete="additional-name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-last`} className={fieldLabelClass()}>
            Last Name<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-last`}
            className={textInputClass()}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-country`} className={fieldLabelClass()}>
            Country<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-country`}
            className={textInputClass()}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            autoComplete="country-name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-org`} className={fieldLabelClass()}>
            Organization<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-org`}
            className={textInputClass()}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            autoComplete="organization"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-designation`} className={fieldLabelClass()}>
            Designation<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-designation`}
            className={textInputClass()}
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            autoComplete="organization-title"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-phone`} className={fieldLabelClass()}>
            Phone<span className="text-red-600"> *</span>
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
            Email<span className="text-red-600"> *</span>
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
            required
            aria-invalid={emailError ? true : undefined}
          />
          {emailError ? (
            <p className="text-[12px] text-red-600">{emailError}</p>
          ) : null}
        </div>

        <FileDropzone
          inputId={`${formId}-headshot`}
          label="Headshot"
          required
          accept={HEADSHOT_ACCEPT}
          hint={`1 image · max ${MAX_HEADSHOT_MB} MB`}
          dragOver={headshotDragOver}
          onDragOver={(e) => {
            e.preventDefault();
            setHeadshotDragOver(true);
          }}
          onDragLeave={() => setHeadshotDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setHeadshotDragOver(false);
            setHeadshot(e.dataTransfer.files);
          }}
          onBrowse={setHeadshot}
          disabled={Boolean(headshotItem)}
          file={
            headshotItem
              ? {
                  name: headshotItem.file.name,
                  previewUrl: headshotItem.previewUrl,
                }
              : null
          }
          onRemove={() => {
            setHeadshotItem((prev) => {
              revokeFileItem(prev);
              return null;
            });
            if (headshotInputRef.current) headshotInputRef.current.value = "";
          }}
          inputRef={headshotInputRef}
        />

        <FormSelect
          id={`${formId}-service`}
          label="Service"
          required
          options={BOOKING_SERVICES}
          value={service}
          onChange={setService}
          placeholder="Select a service"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-message`} className={fieldLabelClass()}>
            Feedback<span className="text-red-600"> *</span>
          </label>
          <textarea
            id={`${formId}-message`}
            rows={5}
            className={textInputClass() + " resize-y min-h-[120px]"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
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
              Thank you! Your feedback has been submitted successfully.
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
