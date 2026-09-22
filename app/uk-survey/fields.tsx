"use client";

import type { Opt } from "./questions";

/**
 * The input primitives the survey is assembled from.
 *
 * All of them are controlled and none of them are `required`. Only the
 * screeners gate progress, and they do it in the flow rather than through
 * HTML validation, so a respondent is never stopped by a browser message
 * they cannot see the source of.
 */

export function Question({
  number,
  title,
  hint,
  children,
}: {
  number?: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="uks-q">
      <p className="uks-q__t">
        {number ? <b>{number}</b> : null}
        <span>{title}</span>
      </p>
      {hint ? <p className="uks-q__hint">{hint}</p> : null}
      {children}
    </div>
  );
}

/** Single choice. Rendered as real radios so keyboard and screen readers work. */
export function Radio({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Opt[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="uks-opts" role="radiogroup" aria-label={name}>
      {options.map(([code, label]) => (
        <label className="uks-opt" data-on={value === code} key={code}>
          <input
            checked={value === code}
            name={name}
            onChange={() => onChange(code)}
            type="radio"
            value={code}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

/**
 * Multi-select with a cap and exclusive options.
 *
 * Two behaviours that matter for the data rather than the interface. Once the
 * cap is reached the remaining boxes are disabled rather than silently
 * ignored, so "pick up to three" means what it says and nobody submits four
 * believing all four counted. And an exclusive code — "None of these",
 * "Nothing really puts me off" — clears the rest when chosen and is cleared
 * by any other choice, because "nothing puts me off, except safety" is not an
 * answer anyone can analyse.
 */
export function CheckGroup({
  name,
  options,
  values,
  onChange,
  max,
  exclusive = ["NONE", "NOTHING", "NOWHERE"],
}: {
  name: string;
  options: Opt[];
  values: string[];
  onChange: (v: string[]) => void;
  max?: number;
  exclusive?: string[];
}) {
  const atCap = max !== undefined && values.length >= max;

  function toggle(code: string) {
    const on = values.includes(code);
    if (on) {
      onChange(values.filter((v) => v !== code));
      return;
    }
    if (exclusive.includes(code)) {
      onChange([code]);
      return;
    }
    const kept = values.filter((v) => !exclusive.includes(v));
    if (max !== undefined && kept.length >= max) return;
    onChange([...kept, code]);
  }

  return (
    <div className="uks-opts" role="group" aria-label={name}>
      {options.map(([code, label]) => {
        const on = values.includes(code);
        const blocked = !on && atCap && !exclusive.includes(code);
        return (
          <label className="uks-opt" data-off={blocked} data-on={on} key={code}>
            <input
              checked={on}
              disabled={blocked}
              name={name}
              onChange={() => toggle(code)}
              type="checkbox"
              value={code}
            />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
}

/**
 * The Q12 grid: one row per factor, one scale across the top.
 *
 * Falls back to stacked radio groups below the tablet breakpoint. A matrix
 * squeezed onto a phone is the classic way to lose half your responses, and
 * this survey will mostly be answered on a phone.
 */
export function Matrix({
  rows,
  scale,
  values,
  onChange,
}: {
  rows: Opt[];
  scale: Opt[];
  values: Record<string, string | undefined>;
  onChange: (row: string, value: string) => void;
}) {
  return (
    <div className="uks-matrix">
      <div aria-hidden="true" className="uks-matrix__head">
        <span />
        {scale.map(([code, label]) => (
          <span key={code}>{label}</span>
        ))}
      </div>
      {rows.map(([rowCode, rowLabel]) => (
        <fieldset className="uks-matrix__row" key={rowCode}>
          <legend>{rowLabel}</legend>
          {scale.map(([code, label]) => (
            <label data-on={values[rowCode] === code} key={code}>
              <input
                checked={values[rowCode] === code}
                name={`trust-${rowCode}`}
                onChange={() => onChange(rowCode, code)}
                type="radio"
                value={code}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
      ))}
    </div>
  );
}

/** A pounds-per-week box. Text input, because a number spinner on a phone is a menace. */
export function Money({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="uks-money" htmlFor={id}>
      <span>{label}</span>
      <div className="uks-money__in">
        <i aria-hidden="true">£</i>
        <input
          autoComplete="off"
          id={id}
          inputMode="decimal"
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          value={value}
        />
      </div>
    </label>
  );
}

export function Text({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength = 120,
  autoComplete = "off",
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  type?: string;
}) {
  return (
    <label className="uks-text" htmlFor={id}>
      <span>{label}</span>
      <input
        autoComplete={autoComplete}
        className="input"
        id={id}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}

export function LongText({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="uks-text" htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        maxLength={1000}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        value={value}
      />
    </label>
  );
}

/** Shown when a chosen option has an "Other" free-text tail. */
export function OtherBox({
  id,
  value,
  onChange,
  placeholder = "Tell us what",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      aria-label="Please specify"
      autoComplete="off"
      className="input uks-other"
      id={id}
      maxLength={120}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      value={value}
    />
  );
}
