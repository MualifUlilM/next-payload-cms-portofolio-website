"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactProps {
  email?: string;
  availableForWork?: boolean;
  contactEnabled?: boolean;
  contactButtonLabel?: string;
  contactButtonUrl?: string;
}

export function Contact({
  email,
  availableForWork,
  contactEnabled = true,
  contactButtonLabel = "Book a Call",
  contactButtonUrl,
}: ContactProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <SectionHeader
              eyebrow="Contact"
              heading="Let's Work Together"
              subtitle="I'm currently available for new projects. Tell me what you're building — I'll let you know if I can help and how."
              className="mb-8"
            />

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#666666] mb-1">
                  Availability
                </p>
                <Badge variant={availableForWork ? "success" : "outline"}>
                  {availableForWork
                    ? "● Available for new projects"
                    : "○ Currently fully booked"}
                </Badge>
              </div>

              {email && (
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#666666] mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-[#2563EB] hover:underline text-sm"
                  >
                    {email}
                  </a>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[#666666] mb-1">
                  Response Time
                </p>
                <p className="text-sm text-[#666666]">Usually within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right: form or button */}
          <div>
            {!contactEnabled ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  {contactButtonUrl ? (
                    <a
                      href={contactButtonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors"
                    >
                      {contactButtonLabel}
                    </a>
                  ) : (
                    <p className="text-sm text-[#999999]">Contact form coming soon.</p>
                  )}
                </div>
              </div>
            ) : formState === "success" ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111111] mb-2">Message sent</h3>
                  <p className="text-sm text-[#666666]">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    id="name"
                    name="name"
                    label="Your name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                  <FormField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#666666] mb-2"
                  >
                    Project type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="w-full h-10 px-3 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a type</option>
                    <option value="new-project">New project</option>
                    <option value="redesign">Redesign / rebuild</option>
                    <option value="cms">CMS implementation</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold tracking-widest uppercase text-[#666666] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project — what you're building, what's the challenge, and any timeline or budget context."
                    className="w-full px-3 py-2 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded resize-none placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                  />
                </div>

                {formState === "error" && (
                  <p className="text-sm text-[#DC2626]" role="alert">
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={formState === "submitting"}
                  className="self-start"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  name,
  label,
  type,
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-widest uppercase text-[#666666] mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full h-10 px-3 text-sm text-[#111111] bg-white border border-[#E5E5E5] rounded placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
      />
    </div>
  );
}
