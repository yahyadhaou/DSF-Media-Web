"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Upload, Check, AlertCircle, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Labels = {
  requestTypes: string[];
  company: string;
  companyPlaceholder: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  uploadLabel: string;
  uploadPlaceholder: string;
  uploadInvalidType: string;
  uploadTooLarge: string;
  submit: string;
  sent: string;
  sending: string;
  error: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
const MAX_FILE_MB = 4;

const initialForm = { company: "", name: "", email: "", phone: "", message: "" };

export function ContactForm({ labels }: { labels: Labels }) {
  const locale = useLocale();
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState(initialForm);
  const [website, setWebsite] = useState(""); // honeypot
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  function update<K extends keyof typeof initialForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setFileError(labels.uploadInvalidType);
      e.target.value = "";
      setFile(null);
      return;
    }
    if (selectedFile.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(labels.uploadTooLarge);
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(selectedFile);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = new FormData();
      data.append("company", form.company);
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("message", form.message);
      data.append("requestType", labels.requestTypes[selected]);
      data.append("locale", locale);
      data.append("website", website);
      if (file) data.append("attachment", file);

      const res = await fetch("/api/kontakt", { method: "POST", body: data });
      if (!res.ok) throw new Error("request_failed");
      setStatus("sent");
      setForm(initialForm);
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-fg/8 bg-ink-soft p-8 sm:p-10"
    >
      <div className="flex flex-wrap gap-2.5">
        {labels.requestTypes.map((type, i) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
            className={`rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
              selected === i
                ? i === 2
                  ? "border border-magenta/50 bg-magenta/18 text-[#FF9BC7]"
                  : "border border-teal/45 bg-teal/16 text-teal-light"
                : "border border-fg/16 text-fg/60 hover:border-fg/30 hover:text-fg/85"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={labels.company} placeholder={labels.companyPlaceholder} value={form.company} onChange={(v) => update("company", v)} />
        <Field label={labels.name} placeholder={labels.namePlaceholder} value={form.name} onChange={(v) => update("name", v)} required />
        <Field label={labels.email} placeholder={labels.emailPlaceholder} type="email" value={form.email} onChange={(v) => update("email", v)} required />
        <Field label={labels.phone} placeholder={labels.phonePlaceholder} value={form.phone} onChange={(v) => update("phone", v)} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-fg/60">{labels.message}</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={labels.messagePlaceholder}
          className="h-28 resize-none rounded-lg border border-fg/14 bg-ink px-3.5 py-3 text-sm text-fg placeholder:text-fg/30 focus:border-teal focus:outline-none"
        />
      </div>

      {/* Honeypot: hidden from real visitors, catches simple bots */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-fg/60">{labels.uploadLabel}</label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-fg/20 px-4 py-4 text-sm text-fg/50 hover:border-fg/35">
          <Upload size={18} className="shrink-0" />
          <span className="flex-1 truncate">{file ? file.name : labels.uploadPlaceholder}</span>
          {file && (
            <X
              size={16}
              className="shrink-0 text-fg/40 hover:text-fg/70"
              onClick={(e) => {
                e.preventDefault();
                setFile(null);
                setFileError(null);
              }}
            />
          )}
          <input
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFile}
          />
        </label>
        {fileError && (
          <span className="flex items-center gap-1.5 text-xs text-magenta-light">
            <AlertCircle size={13} /> {fileError}
          </span>
        )}
        {file && !fileError && (
          <span className="flex items-center gap-1.5 text-xs text-fg/40">
            <FileText size={13} /> {(file.size / 1024 / 1024).toFixed(1)} MB
          </span>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-magenta/35 bg-magenta/10 px-4 py-3 text-sm text-magenta-light">
          <AlertCircle size={16} className="shrink-0" />
          {labels.error}
        </div>
      )}

      <Button type="submit" variant="primary" className="w-fit" disabled={status === "sending"}>
        {status === "sent" ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check size={16} /> {labels.sent}
          </motion.span>
        ) : status === "sending" ? (
          labels.sending
        ) : (
          labels.submit
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-fg/60">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-fg/14 bg-ink px-3.5 py-3 text-sm text-fg placeholder:text-fg/30 focus:border-teal focus:outline-none"
      />
    </div>
  );
}
