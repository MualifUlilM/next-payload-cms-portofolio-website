import type { Metadata } from "next";
import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/payload";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"),
  title: {
    template: "%s | Your Name — Fullstack Developer",
    default: "Your Name — Fullstack Developer (Next.js & Payload CMS)",
  },
  description:
    "Fullstack developer specializing in Next.js, Supabase, and Payload CMS. Building fast, maintainable web products for US and EU teams.",
  openGraph: { type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FAFAFA] text-[#111111] antialiased">
        <NavBar name={settings?.name} />
        <main>{children}</main>
        <Footer name={settings?.name} socialLinks={settings?.socialLinks} />
      </body>
    </html>
  );
}
