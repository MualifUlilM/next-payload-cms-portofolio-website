import type { Metadata } from "next";
import type React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/payload";
import { buildSiteMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildSiteMetadata(settings);
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FAFAFA] text-[#111111] antialiased">
        <NavBar
          name={settings?.name}
          logoUrl={settings?.branding?.logo?.url}
        />
        <main>{children}</main>
        <Footer
          name={settings?.name}
          tagline={settings?.tagline}
          socialLinks={settings?.socialLinks}
        />
      </body>
    </html>
  );
}
