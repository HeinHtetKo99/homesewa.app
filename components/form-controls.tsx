"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export const BORDER = "#E2E8F0";
export const FOCUS_BORDER = "#295C59";
export const FOCUS_BG = "#EFF8F7";

export const FORM_STACK_CLASS = "rs-form-stack";

/** Mobile app input styles (HomeSewa Book/Career/Partnership). */
export const INPUT_BASE =
  "w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-3.5 text-[15px] font-medium text-[#1A1A1A] outline-none transition-colors placeholder:text-[#4B4B4B]";
export const INPUT_ACTIVE = "border-[#295C59] bg-[#EFF8F7]";
export const LABEL_CLASS =
  "mb-1.5 pl-1 text-[14px] font-semibold text-[#4A4A4A]";

export function inputClass(active?: boolean, extra?: string) {
  return [INPUT_BASE, "mb-5 h-11", active ? INPUT_ACTIVE : "", extra]
    .filter(Boolean)
    .join(" ");
}

export function textareaClass(active?: boolean, extra?: string) {
  return [INPUT_BASE, "mb-5 resize-y py-3", active ? INPUT_ACTIVE : "", extra]
    .filter(Boolean)
    .join(" ");
}

export function RequiredMark() {
  return <span className="text-red-600"> *</span>;
}

export function FormLabel({
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

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

export function formatPhoneDisplay(value: string): string {
  const cleaned = onlyDigits(value).slice(0, 10);
  if (cleaned.length > 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  if (cleaned.length > 3) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  return cleaned;
}

export function FormPhoneInput({
  id,
  value,
  onChange,
  placeholder,
  active,
  onFocus,
  onBlur,
  maxLength = 12,
  className,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  active?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  className?: string;
}) {
  return (
    <div className={`relative mb-5 ${className ?? ""}`}>
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
        maxLength={maxLength}
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

export function ClearFormDialog({
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

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
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

export function ResetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
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
  );
}

export function fieldLabelClass() {
  return LABEL_CLASS;
}

export function textInputClass(active?: boolean) {
  return [
    INPUT_BASE,
    "h-11",
    active ? INPUT_ACTIVE : "focus:border-[#295C59] focus:bg-[#EFF8F7]",
  ].join(" ");
}

export function selectButtonClass(active?: boolean) {
  return [
    "flex w-full min-h-11 items-center justify-between gap-2 rounded-xl border-[1.5px] px-3.5 py-2.5 text-left text-[15px] font-medium outline-none transition-colors",
    active
      ? "border-[#295C59] bg-[#EFF8F7]"
      : "border-[#E2E8F0] bg-white focus:border-[#295C59] focus:bg-[#EFF8F7]",
  ].join(" ");
}

export type FormSelectProps = {
  id: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

/** Full-width dropdown (mobile app style). */
export function FormSelect({
  id,
  label,
  required,
  options,
  value,
  onChange,
  placeholder = "Select…",
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const active = focused || open;

  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={id} className={fieldLabelClass()}>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <div ref={rootRef} className="relative">
        <button
          id={id}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((o) => !o)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={selectButtonClass(active)}
        >
          <span className={value ? "text-[#1A1A1A]" : "text-[#4B4B4B]"}>
            {value || placeholder}
          </span>
          <ChevronDown className="shrink-0 text-[#4B4B4B]" />
        </button>
        {open ? (
          <ul
            role="listbox"
            className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg"
          >
            {options.map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className="w-full px-3.5 py-2.5 text-left text-[15px] text-[#1A1A1A] hover:bg-[#EFF8F7]"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
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

export type SearchableSelectProps = {
  id: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
};

/** Type-to-filter suggestions (mobile tackles-style). */
export function SearchableSelect({
  id,
  label,
  required,
  options,
  value,
  onChange,
  placeholder = "Search area…",
  hint,
}: SearchableSelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...options];
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (opt: string) => {
    onChange(opt);
    setQuery(opt);
    setOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div className="mb-5 flex flex-col">
      <label htmlFor={id} className={fieldLabelClass()}>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <div ref={rootRef} className="relative">
        <div className="relative">
          <input
            id={id}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            autoComplete="off"
            className={textInputClass(focused || open) + " pr-9"}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
              if (!e.target.value.trim()) onChange("");
            }}
            onFocus={() => {
              setOpen(true);
              setFocused(true);
            }}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
                setOpen(true);
                return;
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) =>
                  i < filtered.length - 1 ? i + 1 : i,
                );
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => (i > 0 ? i - 1 : 0));
              } else if (e.key === "Enter" && activeIndex >= 0) {
                e.preventDefault();
                const opt = filtered[activeIndex];
                if (opt) pick(opt);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#4B4B4B]">
            <ChevronDown />
          </span>
        </div>
        {open && filtered.length > 0 ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-40 mt-1 max-h-52 w-full overflow-auto rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-lg"
          >
            {filtered.map((opt, i) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className={`w-full px-3.5 py-2.5 text-left text-[15px] ${
                    i === activeIndex
                      ? "bg-[#EFF8F7] text-[#1A1A1A]"
                      : "text-[#1A1A1A] hover:bg-[#EFF8F7]"
                  }`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => pick(opt)}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {open && query.trim() && filtered.length === 0 ? (
          <p className="absolute z-40 mt-1 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-[14px] text-[#4B4B4B] shadow-lg">
            No matching area
          </p>
        ) : null}
      </div>
      {hint ? (
        <p className="mt-1 text-[12px] text-[#4B4B4B]">{hint}</p>
      ) : null}
    </div>
  );
}

export type MultiServiceSelectProps = {
  id: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  addButtonLabel?: string;
};

/** "+ Add …" multi-select chips (tackles.pro style). */
export function MultiServiceSelect({
  id,
  label,
  required,
  options,
  values,
  onChange,
  addButtonLabel = "Add service",
}: MultiServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const remaining = options.filter((o) => !values.includes(o));

  return (
    <div className="mb-5 flex flex-col">
      <span id={`${id}-label`} className={fieldLabelClass()}>
        {label}
        {required ? <RequiredMark /> : null}
      </span>
      <div ref={rootRef} className="relative">
        <div
          className="flex min-h-11 flex-wrap items-center gap-2 rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-2 py-2"
          aria-labelledby={`${id}-label`}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#EFF8F7] px-2 text-[14px] font-medium text-[#295C59] hover:bg-[#E2E8F0]/50"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="text-lg leading-none">+</span>
            {addButtonLabel}
          </button>
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex max-w-full items-center gap-1 rounded-lg bg-[#EFF8F7] px-2 py-1 text-[13px] font-medium text-[#1A1A1A]"
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
                  onClick={() => {
                    onChange([...values, opt]);
                    setOpen(false);
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

export type PhotoDropzoneProps = {
  inputId: string;
  label: string;
  photoCount: number;
  maxPhotos: number;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: (files: FileList | null) => void;
  disabled?: boolean;
  previews: { id: string; url: string; name: string }[];
  onRemove: (id: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function PhotoDropzone({
  inputId,
  label,
  photoCount,
  maxPhotos,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  disabled,
  previews,
  onRemove,
  inputRef,
}: PhotoDropzoneProps) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <span className={fieldLabelClass()}>{label}</span>
      <label
        htmlFor={inputId}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed px-4 py-8 text-center transition-colors ${
          dragOver
            ? "border-[#295C59] bg-[#EFF8F7]"
            : "border-[#295C59] bg-white hover:bg-[#EFF8F7]/50"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <svg
          className="mb-2 h-8 w-8 text-[#295C59]"
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
        <span className="text-[15px] font-medium text-[#295C59]">
          Drop files here or{" "}
          <span className="underline">browse</span>
        </span>
        <span className="mt-1 text-[12px] text-[#4B4B4B]">
          {photoCount}/{maxPhotos} images · max 5 MB each
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*,.heic,.heif"
          multiple
          className="sr-only"
          disabled={disabled}
          onChange={(e) => onBrowse(e.target.files)}
        />
      </label>
      {previews.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {previews.map((item, i) => (
            <li
              key={item.id}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#EFF8F7] sm:h-28 sm:w-28"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.name || `Photo ${i + 1}`}
                className="block h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-sm text-white hover:bg-red-600"
                aria-label={`Remove ${item.name}`}
                onClick={() => onRemove(item.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export type FileDropzoneProps = {
  inputId: string;
  label: string;
  required?: boolean;
  accept: string;
  hint: string;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowse: (files: FileList | null) => void;
  disabled?: boolean;
  file: { name: string; previewUrl?: string } | null;
  onRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

/** Single-file drop zone (ID proof, resume) — same size as PhotoDropzone. */
export function FileDropzone({
  inputId,
  label,
  required,
  accept,
  hint,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  disabled,
  file,
  onRemove,
  inputRef,
}: FileDropzoneProps) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <span className={fieldLabelClass()}>
        {label}
        {required ? <RequiredMark /> : null}
      </span>
      <label
        htmlFor={inputId}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed px-4 py-8 text-center transition-colors ${
          dragOver
            ? "border-[#295C59] bg-[#EFF8F7]"
            : "border-[#295C59] bg-white hover:bg-[#EFF8F7]/50"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        <svg
          className="mb-2 h-8 w-8 text-[#295C59]"
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
        <span className="text-[15px] font-medium text-[#295C59]">
          Drop files here or{" "}
          <span className="underline">browse</span>
        </span>
        <span className="mt-1 text-[12px] text-[#4B4B4B]">{hint}</span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          className="sr-only"
          disabled={disabled}
          onChange={(e) => onBrowse(e.target.files)}
        />
      </label>
      {file ? (
        <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#EFF8F7] p-3">
          {file.previewUrl ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.previewUrl}
                alt={file.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[#1A1A1A]">{file.name}</p>
          </div>
          <button
            type="button"
            className="shrink-0 text-[18px] text-[#4B4B4B] hover:text-[#1A1A1A]"
            aria-label={`Remove ${file.name}`}
            onClick={onRemove}
          >
            ×
          </button>
        </div>
      ) : null}
    </div>
  );
}
