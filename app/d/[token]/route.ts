import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Clean recipient entry link — conductor.ng/d/<token>.
 *
 * Sets the client-readable `deck_v` cookie (the deck client reads it to
 * attribute events) and redirects to the deck with NO query string, so the
 * recipient never sees a `?v=` to strip or forward. Internal deck navigation
 * then stays query-less too; attribution rides the cookie.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const clean = (token || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
  const res = NextResponse.redirect(new URL("/deck", req.url));
  if (clean) {
    res.cookies.set("deck_v", clean, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
      httpOnly: false, // the deck client reads it for attribution
    });
  }
  return res;
}
