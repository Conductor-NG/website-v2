import type { Metadata } from "next";
import { Footer, Header } from "@/components/design";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE, SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — support, press & partnerships",
  description: "Reach Conductor support, press and partnerships — one team, from Magodo, Lagos.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <>
      <Header role="passenger" />
      <main>
        <section className="sec">
          <div className="wrap">
            <div className="contactgrid">
              <div className="contactgrid__aside">
                <p className="eyebrow">Contact</p>
                <h1 className="h1" style={{ marginTop: 12 }}>Talk to <em>us</em>.</h1>
                <p className="lede" style={{ marginTop: 20, maxWidth: "44ch" }}>
                  Support, partnerships, press — one team, from Magodo, Lagos. Use the form, or reach us directly.
                </p>
                <p style={{ marginTop: 24, fontSize: 17 }}>
                  <a href={`mailto:${SITE.email}`} style={{ color: "var(--orange-base)", fontWeight: 600 }}>{SITE.email}</a>
                  <br />
                  <a href={`tel:${SITE.phone}`} style={{ color: "var(--orange-base)", fontWeight: 600 }}>{SITE.phoneDisplay}</a>
                </p>
                <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
                  {SOCIALS.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noreferrer" style={{ color: "var(--fg-2)", fontWeight: 500 }}>{s.label}</a>
                  ))}
                </div>

                <div className="nlcard">
                  <p className="eyebrow" style={{ margin: 0 }}>Stay in the loop</p>
                  <p style={{ margin: "8px 0 14px", color: "var(--fg-2)", fontSize: 15, lineHeight: 1.5 }}>
                    New corridors and community news, now and then. No spam.
                  </p>
                  <NewsletterForm />
                </div>
              </div>

              <div className="card contactgrid__form">
                <h2 className="h3" style={{ fontSize: 20, marginBottom: 20 }}>Send us a message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
