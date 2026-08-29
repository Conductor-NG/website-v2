import Link from "next/link";
import { Footer, Header } from "@/components/design";

export default function NotFound() {
  return (
    <>
      <Header role="passenger" />
      <main>
        <section className="sec" style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
          <div className="wrap" style={{ textAlign: "center" }}>
            <div className="serif" style={{ fontSize: "clamp(72px,12vw,140px)", lineHeight: 0.9, color: "var(--orange-base)" }}>404</div>
            <h1 className="h1" style={{ fontSize: "clamp(28px,3vw,40px)", marginTop: 8 }}>That road doesn&apos;t exist.</h1>
            <p className="lede" style={{ margin: "16px auto 0", maxWidth: "46ch" }}>
              The page you were after isn&apos;t here — let&apos;s get you back on route.
            </p>
            <div style={{ marginTop: 22 }}>
              <Link href="/" className="btn btn--primary">Back home</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
