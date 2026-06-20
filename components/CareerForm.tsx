"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  FORM_STACK_CLASS,
  FileDropzone,
  FormSelect,
  MultiServiceSelect,
  ResetIcon,
  fieldLabelClass,
  textInputClass,
} from "@/components/form-controls";
import { BOOKING_SERVICES } from "@/lib/book-form-options";
import {
  CAREER_POSITIONS,
  MAX_CAREER_FILE_MB,
  PREFERRED_WORKING_AREAS,
  YEARS_OF_EXPERIENCE_OPTIONS,
} from "@/lib/career-form-options";
import { emailValidationError } from "@/lib/form-validation";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

const DOCUMENT_ACCEPT =
  "image/*,.heic,.heif,.pdf,application/pdf";
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

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
  const [idProofDragOver, setIdProofDragOver] = useState(false);
  const [resumeDragOver, setResumeDragOver] = useState(false);

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
  const [emailError, setEmailError] = useState<string | null>(null);

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
    setEmailError(null);
    setSubmitError(null);
    if (idProofInputRef.current) idProofInputRef.current.value = "";
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }, []);

  const clear = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
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

    if (emergencyContact && !/^\d{10}$/.test(emergencyContact)) {
      setSubmitError("Emergency contact must be a 10-digit number.");
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("fullName", fullName.trim());
      data.append("phone", phone);
      data.append("email", email.trim());
      data.append("positions", JSON.stringify(positions));
      data.append("expertise", JSON.stringify(expertise));
      data.append("yearsExperience", yearsExperience);
      data.append("preferredAreas", JSON.stringify(preferredAreas));
      data.append("insurancePolicyNumber", insurancePolicyNumber.trim());
      data.append("emergencyContact", emergencyContact);
      data.append("coverLetter", coverLetter.trim());
      data.append("message", message.trim());
      if (idProofItem?.file) data.append("idProof", idProofItem.file);
      if (resumeItem?.file) data.append("resume", resumeItem.file);

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

  const fileHint = `1 file · max ${MAX_CAREER_FILE_MB} MB`;

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
            Email
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

        <MultiServiceSelect
          id={`${formId}-position`}
          label="Position Applied For"
          options={CAREER_POSITIONS}
          values={positions}
          onChange={setPositions}
          addButtonLabel="Add position"
        />

        <MultiServiceSelect
          id={`${formId}-expertise`}
          label="Area of Expertise"
          options={BOOKING_SERVICES}
          values={expertise}
          onChange={setExpertise}
          addButtonLabel="Add expertise"
        />

        <FormSelect
          id={`${formId}-years`}
          label="Years of Experience"
          options={YEARS_OF_EXPERIENCE_OPTIONS}
          value={yearsExperience}
          onChange={setYearsExperience}
        />

        <MultiServiceSelect
          id={`${formId}-areas`}
          label="Preferred Working Area"
          options={PREFERRED_WORKING_AREAS}
          values={preferredAreas}
          onChange={setPreferredAreas}
          addButtonLabel="Add area"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-insurance`} className={fieldLabelClass()}>
            Insurance Policy Number
          </label>
          <input
            id={`${formId}-insurance`}
            className={textInputClass()}
            value={insurancePolicyNumber}
            onChange={(e) =>
              setInsurancePolicyNumber(onlyDigits(e.target.value))
            }
            inputMode="numeric"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-emergency`} className={fieldLabelClass()}>
            Emergency Contact Number
          </label>
          <input
            id={`${formId}-emergency`}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className={textInputClass()}
            value={emergencyContact}
            onChange={(e) =>
              setEmergencyContact(onlyDigits(e.target.value).slice(0, 10))
            }
            autoComplete="tel"
          />
        </div>

        <FileDropzone
          inputId={`${formId}-id-proof`}
          label="ID Proof"
          accept={DOCUMENT_ACCEPT}
          hint={`Images or PDF · ${fileHint}`}
          dragOver={idProofDragOver}
          onDragOver={(e) => {
            e.preventDefault();
            setIdProofDragOver(true);
          }}
          onDragLeave={() => setIdProofDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIdProofDragOver(false);
            setSingleFile(e.dataTransfer.files, setIdProofItem, idProofInputRef);
          }}
          onBrowse={(files) =>
            setSingleFile(files, setIdProofItem, idProofInputRef)
          }
          disabled={Boolean(idProofItem)}
          file={
            idProofItem
              ? {
                  name: idProofItem.file.name,
                  previewUrl: idProofItem.previewUrl,
                }
              : null
          }
          onRemove={() => {
            setIdProofItem((prev) => {
              revokeFileItem(prev);
              return null;
            });
            if (idProofInputRef.current) idProofInputRef.current.value = "";
          }}
          inputRef={idProofInputRef}
        />

        <FileDropzone
          inputId={`${formId}-resume`}
          label="Resume/CV"
          accept={RESUME_ACCEPT}
          hint={`PDF or Word · ${fileHint}`}
          dragOver={resumeDragOver}
          onDragOver={(e) => {
            e.preventDefault();
            setResumeDragOver(true);
          }}
          onDragLeave={() => setResumeDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setResumeDragOver(false);
            setSingleFile(e.dataTransfer.files, setResumeItem, resumeInputRef);
          }}
          onBrowse={(files) =>
            setSingleFile(files, setResumeItem, resumeInputRef)
          }
          disabled={Boolean(resumeItem)}
          file={resumeItem ? { name: resumeItem.file.name } : null}
          onRemove={() => {
            setResumeItem((prev) => {
              revokeFileItem(prev);
              return null;
            });
            if (resumeInputRef.current) resumeInputRef.current.value = "";
          }}
          inputRef={resumeInputRef}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-cover`} className={fieldLabelClass()}>
            Cover Letter
          </label>
          <textarea
            id={`${formId}-cover`}
            rows={5}
            className={textInputClass() + " resize-y min-h-[120px]"}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>

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
              Thank you! Your application has been submitted. Our team will
              contact you shortly.
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
