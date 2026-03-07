"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../pwc-theme.css";

const CREDENTIALS = { email: "nidhi@questt.com", password: "123456" };

export default function PwCLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      setLoading(true);
      setTimeout(() => router.push("/pwc-assortment-planning"), 600);
    } else {
      setError("Incorrect email or password.");
    }
  }

  return (
    <div style={styles.root}>
      {/* Left panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.wordmark}>
            <span style={styles.wordmarkDot} />
            <span style={styles.wordmarkText}>Questt x PwC</span>
          </div>
          <div style={styles.leftBody}>
            <p style={styles.leftEyebrow}>Questt x PwC</p>
            <h1 style={styles.leftHeading}>
              AI-powered<br />retail intelligence.
            </h1>
            <p style={styles.leftSub}>
              Assortment planning, market pulse, and sales
              watchtower — unified in a single command centre.
            </p>
          </div>
          {/* <div style={styles.leftFooter}>
            <span style={styles.footerBadge}>Confidential · PwC India</span>
          </div> */}
        </div>
      </div>

      {/* Right panel */}
      <div style={styles.right}>
        <form onSubmit={handleSubmit} style={styles.card} noValidate>
          {/* Logo mark on mobile / top of card */}
          <div style={styles.cardLogo}>
            <span style={styles.cardLogoDot} />
            <span style={styles.cardLogoText}>Questt</span>
          </div>

          <h2 style={styles.cardHeading}>Sign in</h2>
          <p style={styles.cardSub}>Access your intelligence suite</p>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder=""
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              style={{
                ...styles.input,
                ...(error ? styles.inputError : {}),
              }}
              required
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <div style={styles.passWrap}>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder=""
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                style={{
                  ...styles.input,
                  paddingRight: 44,
                  ...(error ? styles.inputError : {}),
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={styles.eyeBtn}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {error && <p style={styles.errorMsg}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <Spinner /> : "Continue"}
          </button>

        </form>
      </div>
    </div>
  );
}

/* ─── Icons ─────────────────────────────────────────── */
function Eye() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "pwc-spin 0.7s linear infinite" }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

/* ─── Styles ─────────────────────────────────────────── */
const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "var(--pwc-font, 'Inter', -apple-system, sans-serif)",
  },

  /* Left */
  left: {
    flex: "0 0 46%",
    background: "var(--pwc-green, #111A15)",
    display: "flex",
    flexDirection: "column",
    padding: "40px 56px",
    position: "relative",
    overflow: "hidden",
  },
  leftInner: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  wordmark: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  wordmarkDot: {
    display: "block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#EAF2EF",
  },
  wordmarkText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFFFFF",
    letterSpacing: "-0.01em",
  },
  leftBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 40,
  },
  leftEyebrow: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    marginBottom: 20,
  },
  leftHeading: {
    fontFamily: "var(--pwc-serif, 'DM Serif Display', Georgia, serif)",
    fontSize: 44,
    fontWeight: 400,
    color: "#FFFFFF",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    marginBottom: 20,
  },
  leftSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.65,
    maxWidth: 340,
  },
  leftFooter: {
    paddingTop: 32,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  footerBadge: {
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  /* Right */
  right: {
    flex: 1,
    background: "var(--pwc-bg-sub, #FAFAF8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid var(--pwc-border, #E5E2DB)",
    borderRadius: 12,
    padding: "48px 44px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  },

  /* Card logo — shown only on small screens, hidden on wide via media queries if needed */
  cardLogo: {
    display: "none",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
  },
  cardLogoDot: {
    display: "block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--pwc-sage, #1B6B5A)",
  },
  cardLogoText: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--pwc-green, #111A15)",
  },

  cardHeading: {
    fontFamily: "var(--pwc-serif, 'DM Serif Display', Georgia, serif)",
    fontSize: 28,
    fontWeight: 400,
    color: "var(--pwc-text, #1A1A18)",
    letterSpacing: "-0.02em",
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 14,
    color: "var(--pwc-dim, #6B6965)",
    marginBottom: 36,
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: "var(--pwc-text, #1A1A18)",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    fontSize: 14,
    fontFamily: "inherit",
    color: "var(--pwc-text, #1A1A18)",
    background: "#FFFFFF",
    border: "1px solid var(--pwc-border, #E5E2DB)",
    borderRadius: 6,
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box",
  },
  inputError: {
    borderColor: "var(--pwc-terra, #B33A3A)",
    boxShadow: "0 0 0 3px rgba(179,58,58,0.08)",
  },
  passWrap: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--pwc-dimmer, #A09D98)",
    display: "flex",
    alignItems: "center",
    padding: 2,
  },
  errorMsg: {
    fontSize: 13,
    color: "var(--pwc-terra, #B33A3A)",
    background: "var(--pwc-terra-soft, #FDF3F3)",
    border: "1px solid var(--pwc-terra-border, rgba(179,58,58,0.15))",
    borderRadius: 6,
    padding: "10px 14px",
    marginBottom: 16,
  },
  submitBtn: {
    width: "100%",
    padding: "13px 0",
    background: "var(--pwc-green, #111A15)",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "inherit",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    letterSpacing: "0.01em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "opacity 0.15s",
    marginTop: 4,
    marginBottom: 24,
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    color: "var(--pwc-dimmer, #A09D98)",
  },
  code: {
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    fontSize: 11,
    background: "var(--pwc-bg-alt, #F3F0EA)",
    padding: "2px 5px",
    borderRadius: 3,
    color: "var(--pwc-text-mid, #555555)",
  },
};
