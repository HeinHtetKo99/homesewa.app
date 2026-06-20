"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  FORM_STACK_CLASS,
  FormSelect,
  MultiServiceSelect,
  PhotoDropzone,
  ResetIcon,
  SearchableSelect,
  fieldLabelClass,
  textInputClass,
} from "@/components/form-controls";
import {
  BOOKING_CITY,
  BOOKING_PHOTO_FIELD,
  BOOKING_PRIORITIES,
  BOOKING_SERVICES,
  BOOKING_SHIFTS,
  BUDGET_OPTIONS,
  Kathmandu_AREAS,
  MAX_PHOTOS,
  PROPERTY_TYPES,
  REFERRAL_SOURCES,
} from "@/lib/book-form-options";
import {
  bookingScheduleValidationError,
  getAvailableShifts,
  getBookingNowTime,
  getBookingToday,
} from "@/lib/booking-datetime";
import { emailValidationError } from "@/lib/form-validation";

const onlyDigits = (v: string) => v.replace(/[^0-9]/g, "");

type PhotoItem = {
  id: string;
  file: File;
  previewUrl: string;
};

const IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "heic",
  "heif",
  "bmp",
]);

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTENSIONS.has(ext);
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

function revokePhotoItems(items: PhotoItem[]) {
  for (const item of items) {
    URL.revokeObjectURL(item.previewUrl);
  }
}

export default function BookForm() {
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [landmark, setLandmark] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [shift, setShift] = useState("");
  const [budget, setBudget] = useState("");
  const [priority, setPriority] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const photoItemsRef = useRef<PhotoItem[]>([]);

  photoItemsRef.current = photoItems;

  useEffect(() => {
    return () => revokePhotoItems(photoItemsRef.current);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const todayLocal = getBookingToday();
  const minDate = todayLocal;
  const availableShifts = startDate ? getAvailableShifts(startDate) : BOOKING_SHIFTS;
  const minDeadlineTime =
    deadlineDate === todayLocal ? getBookingNowTime() : undefined;

  useEffect(() => {
    if (startDate && shift && !getAvailableShifts(startDate).includes(shift)) {
      setShift("");
    }
  }, [startDate, shift]);

  const resetFields = useCallback(() => {
    setFullName("");
    setEmail("");
    setPhone("");
    setArea("");
    setStreet("");
    setZip("");
    setLandmark("");
    setPropertyType("");
    setServices([]);
    setStartDate("");
    setDeadlineDate("");
    setDeadlineTime("");
    setShift("");
    setBudget("");
    setPriority("");
    setWorkDescription("");
    setReferralSource("");
    setPhotoItems((prev) => {
      revokePhotoItems(prev);
      return [];
    });
    setEmailError(null);
    setSubmitError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const clear = () => {
    resetFields();
    setSubmitSuccess(false);
    setSubmitWarning(null);
  };

  const addPhotos = (files: FileList | null) => {
    if (!files?.length) return;
    const incoming = Array.from(files).filter(isImageFile);
    if (incoming.length === 0) return;

    setPhotoItems((prev) => {
      const slotsLeft = MAX_PHOTOS - prev.length;
      if (slotsLeft <= 0) return prev;
      return [...prev, ...incoming.slice(0, slotsLeft).map(createPhotoItem)];
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotoItems((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
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

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !area ||
      !propertyType ||
      services.length === 0 ||
      !startDate ||
      !shift ||
      !budget ||
      !priority
    ) {
      setSubmitError("Please fill in all required fields (marked with *).");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setSubmitError("Enter a valid 10-digit mobile number.");
      return;
    }

    const scheduleErr = bookingScheduleValidationError({
      startDate,
      deadlineDate,
      deadlineTime,
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
      data.append("email", email.trim());
      data.append("phone", phone);
      data.append("city", BOOKING_CITY);
      data.append("area", area);
      data.append("street", street.trim());
      data.append("zip", zip.trim());
      data.append("landmark", landmark.trim());
      data.append("propertyType", propertyType);
      data.append("services", JSON.stringify(services));
      data.append("startDate", startDate);
      data.append("deadlineDate", deadlineDate);
      data.append("deadlineTime", deadlineTime);
      data.append("shift", shift);
      data.append("budget", budget);
      data.append("priority", priority);
      data.append("workDescription", workDescription.trim());
      data.append("referralSource", referralSource);
      for (const item of photoItems) {
        data.append("photos", item.file);
      }

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
            Full name<span className="text-red-600"> *</span>
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

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-city`} className={fieldLabelClass()}>
            City<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-city`}
            className={textInputClass() + " cursor-not-allowed bg-gray-50 text-gray-600"}
            value={BOOKING_CITY}
            readOnly
            tabIndex={-1}
          />
        </div>

        <SearchableSelect
          id={`${formId}-area`}
          label="Area"
          required
          options={Kathmandu_AREAS}
          value={area}
          onChange={setArea}
          placeholder="Type to search area…"
          hint={`Example: Adyar, Anna Nagar, Velachery — ${Kathmandu_AREAS.length} areas in Kathmandu`}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-street`} className={fieldLabelClass()}>
            Street
          </label>
          <input
            id={`${formId}-street`}
            className={textInputClass()}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            autoComplete="street-address"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-zip`} className={fieldLabelClass()}>
            Zip
          </label>
          <input
            id={`${formId}-zip`}
            className={textInputClass()}
            value={zip}
            onChange={(e) => setZip(onlyDigits(e.target.value).slice(0, 6))}
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-landmark`} className={fieldLabelClass()}>
            Nearest Landmark
          </label>
          <input
            id={`${formId}-landmark`}
            className={textInputClass()}
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>

        <FormSelect
          id={`${formId}-property`}
          label="Property Type"
          required
          options={PROPERTY_TYPES}
          value={propertyType}
          onChange={setPropertyType}
        />

        <MultiServiceSelect
          id={`${formId}-services`}
          label="Select Services"
          required
          options={BOOKING_SERVICES}
          values={services}
          onChange={setServices}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-start`} className={fieldLabelClass()}>
            Starting Date<span className="text-red-600"> *</span>
          </label>
          <input
            id={`${formId}-start`}
            type="date"
            min={minDate}
            className={textInputClass()}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className={fieldLabelClass()}>Deadline</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              id={`${formId}-deadline-date`}
              type="date"
              min={startDate || minDate}
              className={textInputClass()}
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              aria-label="Deadline date"
            />
            <input
              id={`${formId}-deadline-time`}
              type="time"
              min={minDeadlineTime}
              className={textInputClass()}
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              aria-label="Deadline time"
            />
          </div>
        </div>

        <FormSelect
          id={`${formId}-shift`}
          label="Select Shift"
          options={
            availableShifts.length > 0 ? availableShifts : [...BOOKING_SHIFTS]
          }
          value={shift}
          onChange={setShift}
        />

        <FormSelect
          id={`${formId}-budget`}
          label="Budget"
          required
          options={BUDGET_OPTIONS}
          value={budget}
          onChange={setBudget}
        />

        <FormSelect
          id={`${formId}-priority`}
          label="Priority"
          required
          options={BOOKING_PRIORITIES}
          value={priority}
          onChange={setPriority}
        />

        <PhotoDropzone
          inputId={`${formId}-photos`}
          label={BOOKING_PHOTO_FIELD}
          photoCount={photoItems.length}
          maxPhotos={MAX_PHOTOS}
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
          disabled={photoItems.length >= MAX_PHOTOS}
          previews={photoItems.map((item) => ({
            id: item.id,
            url: item.previewUrl,
            name: item.file.name,
          }))}
          onRemove={removePhoto}
          inputRef={fileInputRef}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor={`${formId}-work`} className={fieldLabelClass()}>
            Work Description
          </label>
          <textarea
            id={`${formId}-work`}
            rows={5}
            className={textInputClass() + " resize-y min-h-[120px]"}
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
          />
        </div>

        <FormSelect
          id={`${formId}-referral`}
          label="How did you know about us?"
          options={REFERRAL_SOURCES}
          value={referralSource}
          onChange={setReferralSource}
        />

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
              Thank you! Your booking has been submitted. Our team will contact
              you shortly.
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
