"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Serif_Display } from "next/font/google";
import { Button } from "@/components/ui/Button";
import { getMediaUrl } from "@/lib/site";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
});

export function NavBar({
  name,
  logoUrl,
}: {
  name?: string;
  logoUrl?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoSrc = getMediaUrl(logoUrl);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change or ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#E5E5E5]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center min-w-0 text-[#111111] hover:text-[#2563EB] transition-colors duration-150"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={name || "Site logo"}
              width={160}
              height={44}
              className="h-9 w-auto max-w-[160px] object-contain"
              priority
            />
          ) : (
            <span
              className={`${dmSerif.className} truncate text-[1.45rem] tracking-[-0.03em] leading-none`}
            >
              {name || "Your Name"}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[#666666] hover:text-[#111111] underline-offset-4 hover:underline transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" href="/contact">
            Hire Me
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#111111] hover:text-[#2563EB] transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E5E5] px-6 py-6">
          <ul className="flex flex-col gap-4" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base text-[#111111] hover:text-[#2563EB] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button variant="primary" size="md" href="/contact" className="w-full justify-center">
              Hire Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
