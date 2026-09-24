"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Check, FileText, X, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const TOTAL_STEPS = 3;
const MAX_FILE_MB = 4;

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export default function KarrierePage() {
  const t = useTranslations("karrierePage");
  const roles = t.raw("roles") as string[];
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setFileError(t("upload.invalidType"));
      e.target.value = "";
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(t("upload.tooLarge", { max: MAX_FILE_MB }));
      e.target.value = "";
      setFileName(null);
      return;
    }
    setFileName(file.name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const stepValid = true; // fields are optional at the UI layer; EmailJS/template enforces required server-side if needed

  return (
    <div className="py-20 lg:py-28">
      <Container className="flex flex-col items-center gap-4 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{t("eyebrow")}</span>
        <h1 className="font-display max-w-2xl text-4xl font-bold text-fg sm:text-5xl">{t("title")}</h1>
        <p className="max-w-lg text-base leading-relaxed text-fg/60">{t("subtitle")}</p>
      </Container>

      <Container className="mt-14 flex max-w-xl flex-col gap-8">
        {status !== "sent" && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    s < step
                      ? "bg-teal text-[#06302E]"
                      : s === step
                        ? "border-2 border-teal text-teal"
                        : "border border-fg/16 text-fg/30"
                  }`}
                >
                  {s < step ? <Check size={14} /> : s}
                </div>
                {s < TOTAL_STEPS && (
                  <div className={`h-px flex-1 ${s < step ? "bg-teal" : "bg-fg/12"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-2xl border border-teal/30 bg-teal/8 p-10 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-[#06302E]">
              <Check size={26} />
            </div>
            <span className="font-display text-xl font-bold text-fg">{t("success")}</span>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* All three steps stay mounted so EmailJS can read every field regardless of which step is visible */}
            <div className={step === 1 ? "flex flex-col gap-5 rounded-2xl border border-fg/8 bg-ink-soft p-8" : "hidden"}>
              <span className="font-display text-lg font-bold text-fg">{t("steps.1.title")}</span>
              <TextField name="from_name" label={t("steps.1.fields.0")} />
              <TextField name="from_phone" label={t("steps.1.fields.1")} type="tel" />
              <TextField name="from_location" label={t("steps.1.fields.2")} />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-fg/60">{t("upload.label")}</label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-fg/20 px-4 py-4 text-sm text-fg/50 hover:border-fg/35">
                  <FileText size={18} className="shrink-0" />
                  <span className="flex-1 truncate">{fileName ?? t("upload.placeholder")}</span>
                  {fileName && (
                    <X
                      size={16}
                      className="shrink-0 text-fg/40 hover:text-fg/70"
                      onClick={(e) => {
                        e.preventDefault();
                        setFileName(null);
                        if (formRef.current) {
                          const input = formRef.current.elements.namedItem("resume") as HTMLInputElement;
                          if (input) input.value = "";
                        }
                      }}
                    />
                  )}
                  <input type="file" name="resume" accept="application/pdf" className="hidden" onChange={handleFile} />
                </label>
                {fileError && (
                  <span className="flex items-center gap-1.5 text-xs text-magenta-light">
                    <AlertCircle size={13} /> {fileError}
                  </span>
                )}
              </div>
            </div>

            <div className={step === 2 ? "flex flex-col gap-5 rounded-2xl border border-fg/8 bg-ink-soft p-8" : "hidden"}>
              <span className="font-display text-lg font-bold text-fg">{t("steps.2.title")}</span>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-fg/60">{t("steps.2.fields.0")}</label>
                <select
                  name="position"
                  className="rounded-lg border border-fg/14 bg-ink px-3.5 py-3 text-sm text-fg focus:border-teal focus:outline-none"
                >
                  {roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <TextField name="experience" label={t("steps.2.fields.1")} />
            </div>

            <div className={step === 3 ? "flex flex-col gap-5 rounded-2xl border border-fg/8 bg-ink-soft p-8" : "hidden"}>
              <span className="font-display text-lg font-bold text-fg">{t("steps.3.title")}</span>
              <TextField name="available_from" label={t("steps.3.fields.0")} />
              <TextField name="license" label={t("steps.3.fields.1")} />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg border border-magenta/35 bg-magenta/10 px-4 py-3 text-sm text-magenta-light">
                <AlertCircle size={16} className="shrink-0" />
                {t("error")}
              </div>
            )}

            <div className="mt-2 flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                  {t("back")}
                </Button>
              ) : (
                <span />
              )}
              {step < TOTAL_STEPS ? (
                <Button type="button" variant="primary" onClick={() => stepValid && setStep((s) => s + 1)}>
                  {t("next")}
                </Button>
              ) : (
                <Button type="submit" variant="primary" disabled={status === "sending"}>
                  {status === "sending" ? t("sending") : t("submit")}
                </Button>
              )}
            </div>
          </form>
        )}
      </Container>
    </div>
  );
}

function TextField({
  name,
  label,
  type = "text",
}: {
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-fg/60">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={label}
        className="rounded-lg border border-fg/14 bg-ink px-3.5 py-3 text-sm text-fg placeholder:text-fg/25 focus:border-teal focus:outline-none"
      />
    </div>
  );
}
