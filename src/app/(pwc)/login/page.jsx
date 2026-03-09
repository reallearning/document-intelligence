"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="flex min-h-screen font-sans">
      {/* Left panel */}
      <div className="hidden md:flex flex-col w-[46%] bg-[#111A15] px-14 py-10 overflow-hidden relative">
        <div className="flex flex-col h-full">
          {/* Wordmark */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-[1.05rem] tracking-[-0.03em] text-white no-underline">
              questt<i className="not-italic text-[#3DBCA2]">.</i>
            </span>
            <span className="text-white/40 text-sm">×</span>
            <Image src="/images/pwcLogo.jpg" alt="PwC" width={48} height={24} className="object-contain" />
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center pb-10">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-5">
              questt<i className="not-italic text-[#3DBCA2]">.</i> × PwC
            </p>
            <h1 className="text-[44px] font-normal text-white leading-[1.15] tracking-tight mb-5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              AI-powered<br />retail intelligence.
            </h1>
            <p className="text-[15px] text-white/50 leading-relaxed max-w-[340px]">
              Assortment planning, market pulse, and sales
              watchtower — unified in a single command centre.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 bg-[#FAFAF8] flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white border border-[#E5E2DB] rounded-xl p-12 w-full max-w-[420px] shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        >
          <h2 className="text-[28px] font-normal text-[#1A1A18] tracking-tight mb-1.5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Sign in
          </h2>
          <p className="text-sm text-[#6B6965] mb-9">Access your intelligence suite</p>

          {/* Email */}
          <div className="flex flex-col gap-1.5 mb-5">
            <label htmlFor="email" className="text-xs font-semibold tracking-wide text-[#1A1A18]">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder=""
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              required
              className={`w-full px-3.5 py-[11px] text-sm text-[#1A1A18] bg-white border rounded-md outline-none transition-all duration-150 box-border
                ${error ? "border-[#B33A3A] shadow-[0_0_0_3px_rgba(179,58,58,0.08)]" : "border-[#E5E2DB] focus:border-[#1B6B5A] focus:shadow-[0_0_0_3px_rgba(27,107,90,0.1)]"}`}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 mb-5">
            <label htmlFor="password" className="text-xs font-semibold tracking-wide text-[#1A1A18]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder=""
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                required
                className={`w-full px-3.5 py-[11px] pr-11 text-sm text-[#1A1A18] bg-white border rounded-md outline-none transition-all duration-150 box-border
                  ${error ? "border-[#B33A3A] shadow-[0_0_0_3px_rgba(179,58,58,0.08)]" : "border-[#E5E2DB] focus:border-[#1B6B5A] focus:shadow-[0_0_0_3px_rgba(27,107,90,0.1)]"}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A09D98] flex items-center p-0.5 bg-transparent border-none cursor-pointer"
              >
                {showPass ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[13px] text-[#B33A3A] bg-[#FDF3F3] border border-[rgba(179,58,58,0.15)] rounded-md px-3.5 py-2.5 mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 bg-[#111A15] text-white text-sm font-semibold rounded-md flex items-center justify-center gap-2 mt-1 mb-6 transition-opacity duration-150 cursor-pointer border-none
              ${loading ? "opacity-70" : "hover:opacity-90"}`}
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
