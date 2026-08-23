import Image from "next/image";
import Link from "next/link";
import { FOOTER_NAV, SITE, SOCIALS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <Image
              src="/images/logo.svg"
              alt="Conductor"
              width={92}
              height={45}
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <p style={{ marginTop: 16, maxWidth: "32ch", lineHeight: 1.55 }}>
              {SITE.tagline} A seat on a car already going your way — across
              Lagos and Abuja.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_NAV.map((col) => (
            <div className="ftr__col" key={col.heading}>
              <h4>{col.heading}</h4>
              <nav>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="ftr__bot">
          <span>
            © {new Date().getFullYear()} Conductor Technology International
            Services Ltd.
          </span>
          <span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ·{" "}
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
