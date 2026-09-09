"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Team-facing link generator. Anyone with the shared team passcode can mint a
 * per-recipient deck link (clean `/d/<token>` form) without waiting for the
 * founder. Gated by DECK_STATS_PASSWORD (sent as `x-deck-key`); no analytics
 * are shown here — this page only creates and copies links.
 */

type TokenRow = {
  id: string;
  name: string;
  note: string;
  createdAt: number | null;
  lastSeen: number | null;
};

const C = {
  ink: "#211A14",
  cream: "#FFF8F0",
  red: "#EE4643",
  line: "#ECDFCE",
  muted: "#6B5D4E",
  card: "#FAEDDE",
};

export default function DeckShare() {
  const [key, setKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [origin, setOrigin] = useState("");
  const [tokens, setTokens] = useState<TokenRow[]>([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    try {
      const k = window.sessionStorage.getItem("deck_key");
      if (k) {
        setKey(k);
      }
    } catch {
      // ignore
    }
  }, []);

  const linkFor = useCallback(
    (id: string) => `${origin || "https://conductor.ng"}/d/${id}`,
    [origin],
  );

  const load = useCallback(async (k: string) => {
    const res = await fetch("/api/deck/tokens", { headers: { "x-deck-key": k } });
    if (res.status === 401) {
      setKey(null);
      try {
        window.sessionStorage.removeItem("deck_key");
      } catch {
        // ignore
      }
      setStatus("Wrong passcode.");
      return;
    }
    if (res.status === 503) {
      setStatus("Link tracking is not configured yet (no store / passcode set).");
      return;
    }
    const data = (await res.json()) as { tokens: TokenRow[]; origin: string };
    setTokens(data.tokens || []);
    setOrigin(data.origin || "");
    setStatus("");
  }, []);

  useEffect(() => {
    if (key) {
      void load(key);
    }
  }, [key, load]);

  const mint = useCallback(async () => {
    if (!key || !name.trim()) {
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/deck/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-deck-key": key },
        body: JSON.stringify({ name: name.trim(), note: note.trim() }),
      });
      if (!res.ok) {
        setStatus("Could not create the link. Check the passcode and try again.");
        return;
      }
      const made = (await res.json()) as { id: string; url: string };
      setName("");
      setNote("");
      await load(key);
      // Auto-copy the fresh link for convenience.
      try {
        await navigator.clipboard.writeText(made.url);
        setCopied(made.id);
        setStatus("Link created and copied to your clipboard.");
      } catch {
        setStatus("Link created — copy it from the list below.");
      }
    } finally {
      setBusy(false);
    }
  }, [key, name, note, load]);

  const copy = useCallback(async (id: string) => {
    try {
      await navigator.clipboard.writeText(`${origin || "https://conductor.ng"}/d/${id}`);
      setCopied(id);
      setStatus("");
    } catch {
      setStatus("Copy failed — long-press or select the link manually.");
    }
  }, [origin]);

  const shell = (children: React.ReactNode) => (
    <main
      style={{
        minHeight: "100vh",
        background: C.cream,
        color: C.ink,
        fontFamily: "'Roboto Flex', system-ui, sans-serif",
        display: "flex",
        justifyContent: "center",
        padding: "48px 20px 80px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720 }}>{children}</div>
    </main>
  );

  if (!key) {
    return shell(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const k = keyInput.trim();
          if (!k) {
            return;
          }
          try {
            window.sessionStorage.setItem("deck_key", k);
          } catch {
            // ignore
          }
          setKey(k);
        }}
        style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 380, margin: "10vh auto 0" }}
      >
        <div style={{ fontSize: 22, fontWeight: 800 }}>Conductor — link generator</div>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.5, margin: 0 }}>
          Enter the team passcode to create per-recipient deck links.
        </p>
        <input
          type="password"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Team passcode"
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: `1px solid ${C.line}`,
            fontSize: 15,
            background: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(120deg,#E98B20,#EE4643)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            padding: "12px 18px",
            border: "none",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          Continue
        </button>
        {status ? <div style={{ fontSize: 13, color: C.red }}>{status}</div> : null}
      </form>,
    );
  }

  return shell(
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 800 }}>Generate a deck link</div>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.5, margin: "6px 0 0" }}>
          Each recipient gets their own tracked link. Name it so you know who it was sent to.
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, fontWeight: 600 }}>
          Recipient name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tunde — Ventures Platform"
            style={{ padding: "11px 13px", borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 15, fontWeight: 400 }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, fontWeight: 600 }}>
          Note (optional)
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. intro from Bola, angel"
            style={{ padding: "11px 13px", borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 15, fontWeight: 400 }}
          />
        </label>
        <button
          type="button"
          disabled={busy || !name.trim()}
          onClick={() => void mint()}
          style={{
            alignSelf: "flex-start",
            background: name.trim() ? "linear-gradient(120deg,#E98B20,#EE4643)" : C.line,
            color: name.trim() ? "#fff" : C.muted,
            fontWeight: 700,
            fontSize: 15,
            padding: "12px 22px",
            border: "none",
            borderRadius: 999,
            cursor: name.trim() && !busy ? "pointer" : "default",
          }}
        >
          {busy ? "Creating…" : "Create link"}
        </button>
        {status ? <div style={{ fontSize: 13, color: C.muted }}>{status}</div> : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted }}>
          Existing links ({tokens.length})
        </div>
        {tokens.length === 0 ? (
          <div style={{ fontSize: 14, color: C.muted }}>No links yet — create one above.</div>
        ) : (
          tokens.map((t) => (
            <div
              key={t.id}
              style={{
                background: C.card,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name || "(unnamed)"}</div>
                <div
                  style={{
                    fontSize: 13,
                    color: C.muted,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {linkFor(t.id)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => void copy(t.id)}
                style={{
                  flex: "none",
                  background: copied === t.id ? "#24A148" : C.ink,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 13,
                  padding: "9px 16px",
                  border: "none",
                  borderRadius: 999,
                  cursor: "pointer",
                }}
              >
                {copied === t.id ? "Copied ✓" : "Copy link"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>,
  );
}
