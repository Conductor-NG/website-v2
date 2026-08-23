"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SWITCH } from "@/lib/site";

type Role = "passenger" | "owner";

export function Header({ role = "passenger" }: { role?: Role }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = NAV[role];
  const sw = SWITCH[role];

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`hdr${stuck ? " stuck" : ""}`}>
        <div className="wrap hdr__in">
          <Link href="/" aria-label="Conductor home" style={{ display: "flex" }}>
            <Image
              src="/images/logo.svg"
              alt="Conductor"
              width={81}
              height={40}
              priority
            />
          </Link>
          <nav className="hdr__nav">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hdr__cta">
            <Link href={sw.href} className="switch">
              {sw.label} <b>→</b>
            </Link>
            <Link href="#get" className="btn btn--primary btn--sm">
              Get the app
            </Link>
          </div>
          <button
            type="button"
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {open && (
        <div
          style={{
            position: "sticky",
            top: 68,
            zIndex: 49,
            background: "var(--surface)",
            borderBottom: "1px solid var(--outline-variant)",
            padding: "12px 22px 20px",
            display: "grid",
            gap: 14,
          }}
        >
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <Link
            href={sw.href}
            onClick={() => setOpen(false)}
            style={{ color: "var(--brand-orange)", fontWeight: 600 }}
          >
            {sw.label} →
          </Link>
          <Link
            href="#get"
            onClick={() => setOpen(false)}
            className="btn btn--primary btn--sm"
            style={{ justifySelf: "start" }}
          >
            Get the app
          </Link>
        </div>
      )}
    </>
  );
}
