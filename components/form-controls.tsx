"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export const BORDER = "#d1d5db";

export const FORM_STACK_CLASS = "rs-form-stack";

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
  return "text-[13px] font-normal text-gray-700";
}

export function textInputClass() {
  return [
    "w-full rounded border border-gray-300 bg-white px-3 py-2.5 text-[15px] text-gray-900",
    "placeholder:text-gray-400 outline-none transition-colors",
    "focus:border-gray-400 focus:ring-1 focus:ring-gray-200",
  ].join(" ");
}

export function selectButtonClass() {
  return [
    "flex w-full min-h-[42px] items-center justify-between gap-2 rounded border border-gray-300 bg-white px-3 py-2.5 text-left text-[15px] text-gray-900",
    "outline-none transition-colors focus:border-gray-400 focus:ring-1 focus:ring-gray-200",
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

/** Full-width dropdown (tackles.pro style). */
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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={fieldLabelClass()}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </label>
      <div ref={rootRef} className="relative">
        <button
          id={id}
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((o) => !o)}
          className={selectButtonClass()}
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {value || placeholder}
          </span>
          <ChevronDown className="shrink-0 text-gray-500" />
        </button>
        {open ? (
          <ul
            role="listbox"
            className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded border border-gray-200 bg-white py-1 shadow-lg"
          >
            {options.map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className="w-full px-3 py-2.5 text-left text-[15px] text-gray-800 hover:bg-gray-50"
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
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={fieldLabelClass()}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
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
            className={textInputClass() + " pr-9"}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
              if (!e.target.value.trim()) onChange("");
            }}
            onFocus={() => setOpen(true)}
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
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <ChevronDown />
          </span>
        </div>
        {open && filtered.length > 0 ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-40 mt-1 max-h-52 w-full overflow-auto rounded border border-gray-200 bg-white py-1 shadow-lg"
          >
            {filtered.map((opt, i) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className={`w-full px-3 py-2.5 text-left text-[15px] ${
                    i === activeIndex
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-800 hover:bg-gray-50"
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
          <p className="absolute z-40 mt-1 w-full rounded border border-gray-200 bg-white px-3 py-2 text-[14px] text-gray-500 shadow-lg">
            No matching area
          </p>
        ) : null}
      </div>
      {hint ? (
        <p className="text-[12px] text-gray-500">{hint}</p>
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
    <div className="flex flex-col gap-1">
      <span id={`${id}-label`} className={fieldLabelClass()}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      <div ref={rootRef} className="relative">
        <div
          className="flex min-h-[42px] flex-wrap items-center gap-2 rounded border border-gray-300 bg-white px-2 py-2"
          aria-labelledby={`${id}-label`}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            className="inline-flex h-8 shrink-0 items-center gap-1 rounded border border-gray-200 bg-gray-50 px-2 text-[14px] text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="text-lg leading-none text-gray-600">+</span>
            {addButtonLabel}
          </button>
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex max-w-full items-center gap-1 rounded bg-gray-100 px-2 py-1 text-[13px] text-gray-800"
            >
              <span className="truncate">{v}</span>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-900"
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
            className="absolute z-40 mt-1 max-h-56 w-full overflow-auto rounded border border-gray-200 bg-white py-1 shadow-lg"
          >
            {remaining.map((opt) => (
              <li key={opt} role="option">
                <button
                  type="button"
                  className="w-full px-3 py-2.5 text-left text-[15px] text-gray-800 hover:bg-gray-50"
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
    <div className="flex flex-col gap-2">
      <span className={fieldLabelClass()}>{label}</span>
      <label
        htmlFor={inputId}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-4 py-8 text-center transition-colors ${
          dragOver
            ? "border-gray-500 bg-gray-50"
            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50/50"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
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
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-100 sm:h-28 sm:w-28"
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
    <div className="flex flex-col gap-2">
      <span className={fieldLabelClass()}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      <label
        htmlFor={inputId}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed px-4 py-8 text-center transition-colors ${
          dragOver
            ? "border-gray-500 bg-gray-50"
            : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50/50"
        } ${disabled ? "pointer-events-none opacity-60" : ""}`}
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
        <span className="mt-1 text-[12px] text-gray-500">{hint}</span>
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
        <div className="flex items-start gap-3 rounded border border-gray-200 bg-gray-50 p-3">
          {file.previewUrl ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded border border-gray-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.previewUrl}
                alt={file.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] text-gray-800">{file.name}</p>
          </div>
          <button
            type="button"
            className="shrink-0 text-[14px] text-gray-500 hover:text-gray-900"
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
