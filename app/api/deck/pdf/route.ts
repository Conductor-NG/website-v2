import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

// Render /deck/print with headless Chromium and stream it back as a downloadable
// PDF, so the "Download the deck" button hands over a file instead of navigating
// to the print view. Always reflects the live site (no stale PPTX).
export const runtime = "nodejs";
export const maxDuration = 60;

const onVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

async function launch() {
  if (onVercel) {
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1600, height: 1000 },
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  // Local dev: use an installed Chrome. If none is found the GET handler
  // catches it and points the user at /deck/print for a manual Save-as-PDF.
  return puppeteer.launch({ channel: "chrome", headless: true });
}

export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  let browser: Awaited<ReturnType<typeof launch>> | null = null;
  try {
    browser = await launch();
    const page = await browser.newPage();
    await page.goto(`${origin}/deck/print`, { waitUntil: "networkidle0", timeout: 45000 });
    // The print stylesheet drives the A4-landscape slide frames.
    await page.emulateMediaType("print");
    const pdf = await page.pdf({
      printBackground: true,
      format: "A4",
      landscape: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });
    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Conductor-Investor-Deck.pdf"',
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    return new Response(
      `Could not generate the PDF. Open /deck/print and use your browser's Save as PDF instead. (${(err as Error).message})`,
      { status: 500 },
    );
  } finally {
    await browser?.close();
  }
}
