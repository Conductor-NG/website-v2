import { type EventType, recordEvent } from "@/app/deck/_track/store";

export const runtime = "nodejs";

/**
 * PUBLIC ingest endpoint for deck events. Called fire-and-forget from the
 * deck client (sendBeacon / keepalive fetch). It must be fast and never leak
 * anything: any input — even garbage or a disabled store — returns 204.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      v?: string;
      type?: string;
      slide?: string;
      seconds?: number;
      cta?: string;
    };
    await recordEvent({
      v: String(body?.v ?? ""),
      type: body?.type as EventType,
      slide: String(body?.slide ?? ""),
      seconds: typeof body?.seconds === "number" ? body.seconds : undefined,
      cta: typeof body?.cta === "string" ? body.cta : undefined,
    });
  } catch {
    // Swallow everything — validation lives in recordEvent and the public
    // deck must never see an error from analytics.
  }
  return new Response(null, { status: 204 });
}
