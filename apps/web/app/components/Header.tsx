"use client";

import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "About",    href: "#about"    },
  { label: "Contact",  href: "#contact"  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        bg-[#FFFBFE]/80 backdrop-blur-md
        border-b border-[#79747E]/15
        transition-shadow duration-300
      "
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* ── Wordmark ── */}
          <a
            href="/"
            className="
              text-[#1C1B1F] font-medium text-lg tracking-tight
              transition-opacity duration-200 hover:opacity-70
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
              rounded-[8px]
            "
          >
            Acme Inc.
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  px-4 py-2 rounded-[9999px]
                  text-[#49454F] text-sm font-medium
                  transition-all duration-200
                  hover:bg-[#6750A4]/10 hover:text-[#6750A4]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── CTA buttons ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Outlined / Ghost */}
            <a
              href="/login"
              className="
                h-10 px-6 inline-flex items-center justify-center
                rounded-[9999px]
                border border-[#79747E]
                text-[#6750A4] text-sm font-medium tracking-wide
                transition-all duration-200
                hover:bg-[#6750A4]/5 hover:border-[#6750A4]
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
              "
            >
              Log In
            </a>

            {/* Filled / Primary */}
            <a
              href="/register"
              className="
                h-10 px-6 inline-flex items-center justify-center
                rounded-[9999px]
                bg-[#6750A4] text-white text-sm font-medium tracking-wide
                shadow-sm
                transition-all duration-300
                hover:bg-[#6750A4]/90 hover:shadow-md
                active:scale-95 active:bg-[#6750A4]/80
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#6750A4] focus-visible:ring-offset-2
              "
            >
              Get Started
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="
              md:hidden h-10 w-10 flex items-center justify-center
              rounded-[9999px]
              text-[#49454F]
              transition-all duration-200
              hover:bg-[#6750A4]/10
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#6750A4]
            "
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              /* X icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6"  y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3"  y1="6"  x2="21" y2="6"  />
                <line x1="3"  y1="12" x2="21" y2="12" />
                <line x1="3"  y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="
                  px-4 py-3 rounded-[16px]
                  text-[#49454F] font-medium
                  hover:bg-[#6750A4]/10 hover:text-[#6750A4]
                  transition-colors duration-200
                "
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="#login"
                className="
                  h-11 px-6 flex items-center justify-center
                  rounded-[9999px] border border-[#79747E]
                  text-[#6750A4] font-medium
                  hover:bg-[#6750A4]/5
                  transition-all duration-200 active:scale-95
                "
              >
                Log In
              </a>
              <a
                href="#get-started"
                className="
                  h-11 px-6 flex items-center justify-center
                  rounded-[9999px] bg-[#6750A4] text-white font-medium
                  hover:bg-[#6750A4]/90
                  transition-all duration-200 active:scale-95
                "
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}