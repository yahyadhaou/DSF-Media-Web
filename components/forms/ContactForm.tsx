"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Check } from "lucide-react";
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
  upload: string;
  submit: string;
  sent: string;
};

export function ContactForm({ labels }: { labels: Labels }) {
  const [selected, setSelected] = useState(0);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-white/8 bg-ink-soft p-8 sm:p-10"
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
                : "border border-white/16 text-white/60 hover:border-white/30 hover:text-white/85"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={labels.company} placeholder={labels.companyPlaceholder} />
        <Field label={labels.name} placeholder={labels.namePlaceholder} />
        <Field label={labels.email} placeholder={labels.emailPlaceholder} type="email" />
        <Field label={labels.phone} placeholder={labels.phonePlaceholder} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-white/60">{labels.message}</label>
        <textarea
          placeholder={labels.messagePlaceholder}
          className="h-28 resize-none rounded-lg border border-white/14 bg-ink px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal focus:outline-none"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/20 px-4 py-4 text-sm text-white/45 hover:border-white/35">
        <Upload size={18} />
        {labels.upload}
        <input type="file" className="hidden" />
      </label>

      <Button type="submit" variant="primary" className="w-fit">
        {sent ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check size={16} /> {labels.sent}
          </motion.span>
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
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-white/60">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-lg border border-white/14 bg-ink px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal focus:outline-none"
      />
    </div>
  );
}
