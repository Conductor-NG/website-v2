"use client";

import { type CSSProperties, useCallback, useEffect, useState } from "react";

// Never statically prerender — this dashboard is entirely client-driven and
// gated behind a password held in sessionStorage.
export const dynamic = "force-dynamic";

// ---- Palette (deck design system) --------------------------------------
const ORANGE = "#EE4643";
const INK = "#211A14";
const CREAM = "#FFF8F0";
const LINE = "#ECDFCE";
const MUTED = "#6B5D4E";
const CARD = "#ffffff";

// ---- Types (mirror the API) --------------------------------------------
type TokenRow = {
  id: string;
  name: string;
  note: string;
  createdAt: number | null;
  lastSeen: number | null;
  views: number;
  ctas: number;
};
type StoredEvent = {
  type: "view" | "dwell" | "cta";
  slide: string;
  seconds?: number;
  cta?: string;
  ts: number;
};

type Gate = "checking" | "need-key" | "not-configured" | "ready";

export default function DeckStatsPage() {
  const [gate, setGate] = useState<Gate>("checking");
  const [deckKey, setDeckKey] = useState<string>("");
  const [tokens, setTokens] = useState<TokenRow[]>([]);
  const [origin, setOrigin] = useState<string>("");
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");

  const load = useCallback(async (key: string): Promise<Gate> => {
    const res = await fetch("/api/deck/tokens", {
      headers: { "x-deck-key": key },
    });
    if (res.status === 503) {
      return "not-configured";
    }
    if (res.status === 401) {
      return "need-key";
    }
    if (!res.ok) {
      return "need-key";
    }
    const data = (await res.json()) as { tokens: TokenRow[]; origin: string };
    setTokens(data.tokens || []);
    setOrigin(data.origin || "");
    return "ready";
  }, []);

  // On mount, try a stored key.
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("deck_key")
        : null;
    if (!stored) {
      setGate("need-key");
      return;
    }
    setDeckKey(stored);
    load(stored).then((g) => {
      if (g === "need-key") {
        window.sessionStorage.removeItem("deck_key");
      }
      setGate(g);
    });
  }, [load]);

  const submitPw = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    const key = pwInput.trim();
    if (!key) {
      return;
    }
    const g = await load(key);
    if (g === "ready") {
      window.sessionStorage.setItem("deck_key", key);
      setDeckKey(key);
      setGate("ready");
    } else if (g === "not-configured") {
      setGate("not-configured");
    } else {
      setPwError("Wrong password.");
    }
  };

  const refresh = useCallback(() => {
    if (deckKey) {
      load(deckKey).then(setGate);
    }
  }, [deckKey, load]);

  return (
    <main style={wrap}>
      {gate === "checking" && <p style={{ color: MUTED }}>Loading…</p>}

      {gate === "not-configured" && <SetupNotice />}

      {gate === "need-key" && (
        <PasswordForm
          value={pwInput}
          error={pwError}
          onChange={setPwInput}
          onSubmit={submitPw}
        />
      )}

      {gate === "ready" && (
        <Dashboard
          deckKey={deckKey}
          tokens={tokens}
          origin={origin}
          onRefresh={refresh}
        />
      )}
    </main>
  );
}

// ======================================================================
// Password gate
// ======================================================================
function PasswordForm({
  value,
  error,
  onChange,
  onSubmit,
}: {
  value: string;
  error: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div style={centered}>
      <form onSubmit={onSubmit} style={{ ...card, width: 360, maxWidth: "100%" }}>
        <h1 style={{ ...h1, fontSize: 24, marginBottom: 4 }}>Deck views</h1>
        <p style={{ color: MUTED, fontSize: 15, margin: "0 0 8px" }}>
          Enter the dashboard password.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Password"
          // biome-ignore lint/a11y/noAutofocus: single-field gate, focus is expected
          autoFocus
          style={input}
        />
        {error && (
          <p style={{ color: "#c41818", fontSize: 14, margin: "2px 0 0" }}>
            {error}
          </p>
        )}
        <button type="submit" style={primaryBtn}>
          Enter
        </button>
      </form>
    </div>
  );
}

// ======================================================================
// Setup notice (503 not_configured)
// ======================================================================
function SetupNotice() {
  return (
    <div style={centered}>
      <div style={{ ...card, maxWidth: 560 }}>
        <div style={kicker}>Setup needed</div>
        <h1 style={{ ...h1, fontSize: 26, margin: "6px 0 10px" }}>
          Tracking storage isn't connected yet
        </h1>
        <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.55, margin: 0 }}>
          The deck is live and collecting nothing until a Redis store is wired
          up. Once connected, per-recipient views and CTA clicks land here.
        </p>
        <ol style={steps}>
          <li>
            In the Vercel project → <strong>Storage</strong> → create an{" "}
            <strong>Upstash Redis</strong> (or KV) store and{" "}
            <strong>connect it</strong> to this project. The env vars inject
            automatically.
          </li>
          <li>
            Set <code style={code}>DECK_STATS_PASSWORD</code> in the project's
            environment variables.
          </li>
          <li>
            <strong>Redeploy</strong>, then reload this page.
          </li>
        </ol>
      </div>
    </div>
  );
}

// ======================================================================
// Dashboard
// ======================================================================
function Dashboard({
  deckKey,
  tokens,
  origin,
  onRefresh,
}: {
  deckKey: string;
  tokens: TokenRow[];
  origin: string;
  onRefresh: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <h1 style={h1}>Deck views</h1>
        <button type="button" onClick={onRefresh} style={ghostBtn}>
          Refresh
        </button>
      </div>

      <GenerateLink deckKey={deckKey} origin={origin} onCreated={onRefresh} />

      <RecipientsTable deckKey={deckKey} tokens={tokens} origin={origin} />
    </div>
  );
}

// ---- Generate a link ---------------------------------------------------
function GenerateLink({
  deckKey,
  origin,
  onCreated,
}: {
  deckKey: string;
  origin: string;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [made, setMade] = useState<{ url: string } | null>(null);
  const [err, setErr] = useState("");

  const create = async () => {
    if (!name.trim()) {
      setErr("Add a name so you can tell recipients apart.");
      return;
    }
    setErr("");
    setBusy(true);
    try {
      const res = await fetch("/api/deck/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-deck-key": deckKey },
        body: JSON.stringify({ name: name.trim(), note: note.trim() }),
      });
      if (!res.ok) {
        setErr("Couldn't create link.");
        return;
      }
      const data = (await res.json()) as { url: string };
      setMade({ url: data.url || `${origin}/deck` });
      setName("");
      setNote("");
      onCreated();
    } finally {
      setBusy(false);
    }
  };

  return (
    <section style={card}>
      <div style={kicker}>Generate a link</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) auto",
          gap: 12,
          alignItems: "end",
          marginTop: 14,
        }}
      >
        <label style={field}>
          <span style={label}>Recipient name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ada — Ventures Platform"
            style={input}
          />
        </label>
        <label style={field}>
          <span style={label}>Note (optional)</span>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. warm intro from Tunde"
            style={input}
          />
        </label>
        <button
          type="button"
          onClick={create}
          disabled={busy}
          style={{ ...primaryBtn, opacity: busy ? 0.6 : 1 }}
        >
          {busy ? "Creating…" : "Create link"}
        </button>
      </div>
      {err && (
        <p style={{ color: "#c41818", fontSize: 14, margin: "10px 0 0" }}>
          {err}
        </p>
      )}
      {made && (
        <div style={madeRow}>
          <span style={{ color: MUTED, fontSize: 13, flex: "none" }}>
            New link
          </span>
          <code style={{ ...code, flex: 1, minWidth: 0, ...ellipsis }}>
            {made.url}
          </code>
          <CopyButton text={made.url} />
        </div>
      )}
    </section>
  );
}

// ---- Recipients table --------------------------------------------------
function RecipientsTable({
  deckKey,
  tokens,
  origin,
}: {
  deckKey: string;
  tokens: TokenRow[];
  origin: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (tokens.length === 0) {
    return (
      <section style={card}>
        <p style={{ color: MUTED, margin: 0 }}>
          No recipients yet. Generate a link above and send it to an investor.
        </p>
      </section>
    );
  }

  return (
    <section style={{ ...card, padding: 0, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Link</th>
              <th style={{ ...th, ...thNum }}>Views</th>
              <th style={{ ...th, ...thNum }}>CTAs</th>
              <th style={th}>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => {
              const url = `${origin}/deck?v=${t.id}`;
              const open = openId === t.id;
              return (
                <RecipientRow
                  key={t.id}
                  row={t}
                  url={url}
                  open={open}
                  deckKey={deckKey}
                  onToggle={() => setOpenId(open ? null : t.id)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RecipientRow({
  row,
  url,
  open,
  deckKey,
  onToggle,
}: {
  row: TokenRow;
  url: string;
  open: boolean;
  deckKey: string;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        style={{
          cursor: "pointer",
          background: open ? "#FBF6EE" : "transparent",
          borderTop: `1px solid ${LINE}`,
        }}
      >
        <td style={td}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                color: ORANGE,
                fontSize: 12,
                transform: open ? "rotate(90deg)" : "none",
                transition: "transform 0.15s",
              }}
            >
              ▶
            </span>
            <div>
              <div style={{ fontWeight: 600 }}>{row.name || "(unnamed)"}</div>
              {row.note && (
                <div style={{ fontSize: 13, color: MUTED }}>{row.note}</div>
              )}
            </div>
          </div>
        </td>
        <td style={td}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <code style={{ ...code, ...ellipsis, maxWidth: 220 }}>{url}</code>
            <CopyButton text={url} small />
          </div>
        </td>
        <td style={{ ...td, ...tdNum }}>{row.views}</td>
        <td style={{ ...td, ...tdNum }}>{row.ctas}</td>
        <td style={{ ...td, color: MUTED }}>{relTime(row.lastSeen)}</td>
      </tr>
      {open && (
        <tr>
          <td colSpan={5} style={{ padding: 0, background: "#FBF6EE" }}>
            <Timeline deckKey={deckKey} token={row.id} />
          </td>
        </tr>
      )}
    </>
  );
}

// ---- Timeline ----------------------------------------------------------
function Timeline({ deckKey, token }: { deckKey: string; token: string }) {
  const [events, setEvents] = useState<StoredEvent[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/deck/stats?token=${encodeURIComponent(token)}`, {
      headers: { "x-deck-key": deckKey },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad"))))
      .then((d: { timeline: StoredEvent[] }) => {
        if (alive) {
          setEvents(d.timeline || []);
        }
      })
      .catch(() => {
        if (alive) {
          setError(true);
        }
      });
    return () => {
      alive = false;
    };
  }, [deckKey, token]);

  if (error) {
    return <div style={timelineWrap}>Couldn't load timeline.</div>;
  }
  if (events === null) {
    return <div style={timelineWrap}>Loading timeline…</div>;
  }
  if (events.length === 0) {
    return <div style={timelineWrap}>No events recorded yet.</div>;
  }

  return (
    <div style={timelineWrap}>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {events.map((ev, i) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: events are append-only + immutable
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 68px 1fr",
              gap: 12,
              alignItems: "baseline",
              padding: "7px 0",
              borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
              fontSize: 14,
            }}
          >
            <span style={{ color: MUTED, fontVariantNumeric: "tabular-nums" }}>
              {clockTime(ev.ts)}
            </span>
            <span style={typeBadge(ev.type)}>{ev.type}</span>
            <span>
              <strong style={{ fontWeight: 600 }}>{ev.slide}</strong>
              {ev.cta && <span style={{ color: MUTED }}> · {ev.cta}</span>}
              {ev.seconds != null && (
                <span style={{ color: MUTED }}> · {ev.seconds}s</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ---- Copy button -------------------------------------------------------
function CopyButton({ text, small }: { text: string; small?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      // clipboard blocked — no-op
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      style={{
        ...pillBtn,
        padding: small ? "4px 10px" : "6px 14px",
        fontSize: small ? 12 : 13,
        color: done ? "#fff" : INK,
        background: done ? ORANGE : "#fff",
        borderColor: done ? ORANGE : LINE,
        flex: "none",
      }}
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

// ======================================================================
// Time helpers (client-side, relative to Date.now())
// ======================================================================
function relTime(ts: number | null): string {
  if (!ts) {
    return "—";
  }
  const diff = Date.now() - ts;
  if (diff < 0) {
    return "just now";
  }
  const s = Math.floor(diff / 1000);
  if (s < 60) {
    return "just now";
  }
  const m = Math.floor(s / 60);
  if (m < 60) {
    return `${m}m ago`;
  }
  const h = Math.floor(m / 60);
  if (h < 24) {
    return `${h}h ago`;
  }
  const d = Math.floor(h / 24);
  if (d < 30) {
    return `${d}d ago`;
  }
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

function clockTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (sameDay) {
    return time;
  }
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${date} ${time}`;
}

// ======================================================================
// Styles
// ======================================================================
const wrap: CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "48px 24px 80px",
  width: "100%",
  boxSizing: "border-box",
  color: INK,
};
const centered: CSSProperties = {
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const card: CSSProperties = {
  background: CARD,
  border: `1px solid ${LINE}`,
  borderRadius: 16,
  padding: 24,
};
const h1: CSSProperties = {
  fontSize: 34,
  fontWeight: 800,
  letterSpacing: "-0.02em",
  margin: 0,
  color: INK,
};
const kicker: CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: ORANGE,
};
const label: CSSProperties = {
  fontSize: 13,
  color: MUTED,
  fontWeight: 600,
};
const field: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
};
const input: CSSProperties = {
  font: "inherit",
  fontSize: 15,
  padding: "10px 14px",
  borderRadius: 10,
  border: `1px solid ${LINE}`,
  background: CREAM,
  color: INK,
  width: "100%",
  boxSizing: "border-box",
  outlineColor: ORANGE,
};
const pillBtn: CSSProperties = {
  font: "inherit",
  fontWeight: 600,
  cursor: "pointer",
  borderRadius: 999,
  border: `1px solid ${LINE}`,
  background: "#fff",
  color: INK,
  transition: "background 0.15s, color 0.15s, border-color 0.15s",
};
const primaryBtn: CSSProperties = {
  ...pillBtn,
  padding: "11px 22px",
  fontSize: 15,
  border: `1px solid ${ORANGE}`,
  background: ORANGE,
  color: "#fff",
  marginTop: 4,
};
const ghostBtn: CSSProperties = {
  ...pillBtn,
  padding: "8px 16px",
  fontSize: 14,
};
const madeRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 16,
  padding: "10px 14px",
  borderRadius: 12,
  background: CREAM,
  border: `1px solid ${LINE}`,
};
const table: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 15,
};
const th: CSSProperties = {
  textAlign: "left",
  padding: "14px 18px",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: MUTED,
};
const thNum: CSSProperties = { textAlign: "right" };
const td: CSSProperties = {
  padding: "14px 18px",
  verticalAlign: "top",
};
const tdNum: CSSProperties = {
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  fontWeight: 600,
};
const code: CSSProperties = {
  fontFamily: "'Roboto Mono',ui-monospace,monospace",
  fontSize: 13,
  background: "#F3F1ED",
  padding: "3px 8px",
  borderRadius: 6,
  color: INK,
};
const ellipsis: CSSProperties = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "inline-block",
};
const steps: CSSProperties = {
  margin: "18px 0 0",
  paddingLeft: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  fontSize: 15,
  lineHeight: 1.5,
  color: INK,
};
const timelineWrap: CSSProperties = {
  padding: "14px 18px 18px 40px",
  color: INK,
  fontSize: 14,
};

function typeBadge(type: StoredEvent["type"]): CSSProperties {
  const map: Record<StoredEvent["type"], { bg: string; fg: string }> = {
    view: { bg: "#EAF3EC", fg: "#24632f" },
    dwell: { bg: "#F0EDE7", fg: "#6b6257" },
    cta: { bg: "#FBE7CC", fg: "#8a5209" },
  };
  const c = map[type];
  return {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    background: c.bg,
    color: c.fg,
    padding: "2px 8px",
    borderRadius: 999,
    textAlign: "center",
  };
}
