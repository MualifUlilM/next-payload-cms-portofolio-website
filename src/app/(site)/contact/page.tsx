import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { getSiteSettings } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Available for fullstack development projects using Next.js, Payload CMS, and Supabase. Let's talk about what you're building.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-16">
      <Contact
        email={settings?.email}
        availableForWork={settings?.availableForWork}
        contactEnabled={settings?.contact?.enabled ?? true}
        contactButtonLabel={settings?.contact?.buttonLabel}
        contactButtonUrl={settings?.contact?.buttonUrl}
      />
    </div>
  );
}
