"use client"
import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#0b141a", bubble: "#202c33", sent: "#005c4b",
  text: "#e9edef", mut: "#8696a0", morrie: "#1b6b4a",
  teal: "#008069", red: "#ff6b6b", amber: "#ffd666", green: "#25d366",
};

/* ── Typewriter (unicode-safe) ── */
function Typewriter({ text, speed = 22, delay = 0, onDone }) {
  const chars = useRef(Array.from(text));
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!go) return;
    if (n < chars.current.length) { const t = setTimeout(() => setN(x => x + 1), speed); return () => clearTimeout(t); }
    else onDone?.();
  }, [n, go, speed, onDone]);
  if (!go) return null;
  const visible = chars.current.slice(0, n).join("");
  return <>{visible}{n < chars.current.length && <span style={{ animation: "blink 1s step-end infinite" }}>|</span>}</>
}

/* ── WA bold/italic parser ── */
function formatWA(input) {
  if (typeof input !== "string") return input;
  const result = [];
  let i = 0, key = 0;
  while (i < input.length) {
    if (input[i] === "*") {
      const end = input.indexOf("*", i + 1);
      if (end !== -1) { result.push(<b key={key++} style={{ fontWeight: 600 }}>{input.slice(i + 1, end)}</b>); i = end + 1; continue; }
    }
    if (input[i] === "_") {
      const end = input.indexOf("_", i + 1);
      if (end !== -1) { result.push(<i key={key++}>{input.slice(i + 1, end)}</i>); i = end + 1; continue; }
    }
    let plain = "";
    while (i < input.length && input[i] !== "*" && input[i] !== "_") { plain += input[i]; i++; }
    if (plain) result.push(plain);
  }
  return result;
}

function WaText({ text }) {
  return <>{text.split("\n").map((line, li) => <span key={li}>{li > 0 && <br />}{formatWA(line)}</span>)}</>;
}

/* ── Typed WA message (unicode-safe) ── */
function TypedWaText({ text, speed = 10 }) {
  const chars = useRef(Array.from(text));
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n < chars.current.length) {
      const ch = chars.current[n];
      // Skip faster through newlines
      const spd = ch === "\n" ? 2 : speed;
      const t = setTimeout(() => setN(x => x + 1), spd);
      return () => clearTimeout(t);
    }
  }, [n, speed]);
  const visible = chars.current.slice(0, n).join("");
  // Only apply WA formatting to fully completed *bold* blocks
  const safeFormat = (str) => {
    // Check if there's an unmatched * or _ — if so, don't format the last segment
    const lines = str.split("\n");
    return lines.map((line, li) => {
      // Count asterisks — if odd, the last one is unclosed, treat as plain
      const starCount = (line.match(/\*/g) || []).length;
      if (starCount % 2 !== 0) {
        // Find last * and treat everything from it as plain
        const lastStar = line.lastIndexOf("*");
        const safe = line.slice(0, lastStar);
        const tail = line.slice(lastStar);
        return <span key={li}>{li > 0 && <br />}{formatWA(safe)}{tail}</span>;
      }
      return <span key={li}>{li > 0 && <br />}{formatWA(line)}</span>;
    });
  };
  return <>{safeFormat(visible)}{n < chars.current.length && <span style={{ color: C.mut, animation: "blink 1s step-end infinite" }}>|</span>}</>;
}

function Bubble({ time, side, text, typed = false, typeSpeed = 10, children }) {
  const left = side === "l";
  return (
    <div style={{ display: "flex", justifyContent: left ? "flex-start" : "flex-end", animation: left ? "sl .25s ease" : "sr .25s ease" }}>
      <div style={{ maxWidth: "80%", padding: "5px 8px 3px", borderRadius: left ? "0 7px 7px 7px" : "7px 0 7px 7px", background: left ? C.bubble : C.sent }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>
          {text ? (typed ? <TypedWaText text={text} speed={typeSpeed} /> : <WaText text={text} />) : children}
        </div>
        <div style={{ fontSize: 9.5, color: left ? C.mut : "rgba(255,255,255,.4)", textAlign: "right", marginTop: 1 }}>
          {time}{!left && " ✓✓"}
        </div>
      </div>
    </div>
  );
}

/* ── Counter for impact slide ── */
function Counter({ end, prefix = "", suffix = "", dur = 1200, delay = 0, color = C.text }) {
  const [val, setVal] = useState(0);
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!go) return;
    const steps = 30; const inc = end / steps; let s = 0;
    const iv = setInterval(() => { s++; setVal(Math.min(s * inc, end)); if (s >= steps) clearInterval(iv); }, dur / steps);
    return () => clearInterval(iv);
  }, [go, end, dur]);
  const display = end % 1 === 0 ? Math.round(val) : val.toFixed(1);
  return <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 36, color }}>{prefix}{display}{suffix}</span>;
}

const MSGS = [
  { id: "title", dur: 4500 },
  { id: "ts", dur: 500, el: (
    <div style={{ textAlign: "center", padding: "4px 0" }}>
      <span style={{ fontSize: 10.5, color: `${C.mut}aa`, background: "#182229", padding: "3px 12px", borderRadius: 5 }}>TODAY</span>
    </div>
  )},

  // ─── MORNING 7:45 ───
  { id: "m1", dur: 5500,
    label: { time: "7:45 AM", title: "Morning Brief", desc: "Personalised daily targets and priority stores before the first outlet visit.", color: C.green },
    el: <Bubble side="l" time="7:45 AM" typed text={"🌅 शुभ प्रभात Pradeep!\n\nToday's target: *₹5,200* | 15 outlets\nBeat: Andheri West\n\n🔴 *3 priority stores:*\n1. महालक्ष्मी स्टोर — ₹850 pending\n2. लक्ष्मी ट्रेडर्स — scheme expiring today\n3. भारत किराना — 3 weeks no order\n\nInse pehle cover karo 👆"} />
  },

  { id: "m3", dur: 1500, el: <Bubble side="r" time="7:48 AM" text="👍 Chal raha hoon" /> },
  { id: "p1", dur: 1000, el: null },

  // ─── ORDER HISTORY 10:20 ───
  { id: "m4", dur: 2000,
    label: { time: "10:20 AM", title: "Order History", desc: "The salesman asks Morrie for context before walking into a store — instant prep, no guesswork.", color: "#53bdeb" },
    el: <Bubble side="r" time="10:20 AM" text="Sharma Store pe last 3 months ka order history bata do" />
  },

  { id: "m5", dur: 5500,
    el: <Bubble side="l" time="10:20 AM" typed text={"📋 *Sharma Store — Last 3 months:*\n\nNov: ₹2,400 (12 SKUs)\nDec: ₹1,800 (8 SKUs) ⬇️\nJan: ₹950 (4 SKUs) ⬇️⬇️\n\n*Declining trend:* -60% in 3 months\nDropped SKUs: Kurkure 48gm, Lays Classic, Doritos\n\nPichle visit mein retailer ne bola tha — competition scheme zyada hai. Aaj scheme push karo 💡"} />
  },

  { id: "m6", dur: 1800, el: <Bubble side="r" time="10:22 AM" text="Aur iska best selling SKU kaunsa tha pehle?" /> },

  { id: "m7", dur: 4500,
    el: <Bubble side="l" time="10:22 AM" typed text={"*Sharma Store — Top SKUs (peak month):*\n\n1. Kurkure Masala 48gm — 36 units/month\n2. Lays Classic 52gm — 24 units/month\n3. Uncle Chipps 55gm — 18 units/month\n\nKurkure 48gm was the anchor — abhi zero billing last 2 months. Isse pehle push karo, baaki follow karenge."} />
  },

  { id: "m8", dur: 1200, el: <Bubble side="r" time="10:24 AM" text="Okay got it, going in now 👍" /> },
  { id: "p2", dur: 1000, el: null },

  // ─── MIDDAY 1:15 ───
  { id: "m9", dur: 5000,
    label: { time: "1:15 PM", title: "Midday Check", desc: "Real-time progress with specific course correction — which outlets, which amounts, what's possible.", color: C.amber },
    el: <Bubble side="l" time="1:15 PM" typed text={"⏱️ *Halfway check!*\n\n₹3,100 / ₹5,200 (60%)\n8 / 15 outlets done\n\nAchha pace hai 💪 Next 3 stores mein avg ₹700 billing karo toh 90%+ pakka.\n\nPending high-value:\n→ सिटी मार्ट — ₹920 last month\n→ गुप्ता ट्रेडर्स — ₹780 last month"} />
  },

  { id: "m10", dur: 1200, el: <Bubble side="r" time="1:18 PM" text="Haan abhi 4 stores cover karunga" /> },
  { id: "p3", dur: 900, el: null },

  // ─── SKU NUDGE 2:10 ───
  { id: "m11", dur: 5000,
    label: { time: "2:10 PM", title: "SKU-Level Alert", desc: "Specific product gaps at specific outlets — not generic \"sell more\" targets.", color: C.amber },
    el: <Bubble side="l" time="2:10 PM" typed text={"🎯 *Low volume alert — Kurkure 48gm*\n\n5 outlets in today's beat below target:\n\n1. मॉडर्न बाजार — 8 units (target 24)\n2. गुप्ता ट्रेडर्स — 12 units (target 30)\n3. वर्मा स्टोर्स — 6 units (target 20)\n\nScheme active — ₹2 extra margin per unit. Push karo in teeno mein 🔥"} />
  },

  { id: "m12", dur: 1300, el: <Bubble side="r" time="2:12 PM" text="Got it! Kurkure push karunga 💪" /> },
  { id: "p4", dur: 900, el: null },

  // ─── RECOVERY 3:30 ───
  { id: "m13", dur: 6000,
    label: { time: "3:30 PM", title: "Loss Recovery", desc: "Identifies past stockout losses, checks current stock, sends targeted recovery nudge with exact revenue impact.", color: C.red },
    el: <Bubble side="l" time="3:30 PM" typed text={"🚨 *Sales loss recovery*\n\nPichle hafte 2 outlets pe stockout tha — ab stock wapas aa gaya:\n\n❌ राज जनरल स्टोर\nCheetos Puff 28gm — unavailable 22 Nov\nLost: ₹720\n✅ *Stock available now*\n\n❌ सिटी मार्ट\nSame SKU — customer asked, out of stock\nLost: ₹480\n✅ *Stock available now*\n\nAaj confirm karo — ₹1,200 recover ho jayega 🎯"} />
  },

  { id: "m14", dur: 1500, el: <Bubble side="r" time="3:35 PM" text="📦 Dono mein order place kiya! ₹1,200 recovered 🎉" /> },
  { id: "p5", dur: 1000, el: null },

  // ─── EOD 6:45 ───
  { id: "m15", dur: 5500,
    label: { time: "6:45 PM", title: "Day Summary", desc: "Clear scorecard — what was achieved, what was missed, and what's coming tomorrow.", color: C.green },
    el: <Bubble side="l" time="6:45 PM" typed text={"🏁 *Din khatam! Great effort Pradeep*\n\n📊 Today's scorecard:\n• Revenue: ₹4,980 / ₹5,200 (96%) ✅\n• Stores: 13/15 covered\n• Focus brand: 92% achievement\n• Recovery: ₹1,200 stockout recaptured\n\n🔜 *Tomorrow: Vashi beat — 18 outlets*\nEarly start — 2 high-value stores open at 9 AM\n\nGood night! 🌙"} />
  },

  { id: "m16", dur: 2000, el: <Bubble side="r" time="6:48 PM" text="Thanks Morrie! Kal early start karunga 🙏" /> },

  { id: "impact", dur: 8000 },
  { id: "close", dur: 5000 },
];

export default function SalesNudgesVideo() {
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [label, setLabel] = useState(null);
  const timerRef = useRef(null);
  const idxRef = useRef(0);
  const chatEnd = useRef(null);
  const total = MSGS.reduce((s, m) => s + m.dur, 0);

  const advance = useCallback(() => {
    idxRef.current += 1;
    if (idxRef.current > MSGS.length) { setPlaying(false); return; }
    setIdx(idxRef.current);
    const msg = MSGS[idxRef.current - 1];
    if (msg?.label) setLabel(msg.label);
    else if (msg?.id?.startsWith("p") || msg?.id === "close" || msg?.id === "impact") setLabel(null);
    timerRef.current = setTimeout(advance, msg?.dur || 3000);
  }, []);

  const play = () => { setPlaying(true); setIdx(0); setElapsed(0); idxRef.current = 0; setLabel(null); advance(); };
  useEffect(() => { if (playing) { const i = setInterval(() => setElapsed(e => e + 100), 100); return () => clearInterval(i); } }, [playing]);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [idx]);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const vis = MSGS.slice(0, idx);
  const lastId = vis.length > 0 ? vis[vis.length - 1]?.id : null;
  const isTitle = idx === 0 || lastId === "title";
  const isImpact = lastId === "impact";
  const isClose = lastId === "close";
  const showChat = idx > 0 && !isTitle && !isImpact && !isClose;

  return (
    <div className="" style={{ width: "100%", height: "100vh", background: "#060a0d", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes sl{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes sr{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fi{from{opacity:0}to{opacity:1}}
        @keyframes blink{50%{opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${C.mut}22;border-radius:2px}
      `}</style>

      <div style={{ width: "100%", height: "100%", maxWidth: 1200, background: "#060a0d", position: "relative", overflow: "hidden" }}>

        {/* ── Title ── */}
        {(idx === 0 || isTitle) && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 50% 40%, #0a2e1a, transparent 60%), #060a0d`, zIndex: 50 }}>
            {idx === 0 ? (
              <div style={{ textAlign: "center", animation: "fu .7s ease" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: C.morrie, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: `0 8px 32px ${C.morrie}44` }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>M</span>
                </div>
                <div style={{ fontSize: 52, fontWeight: 700, color: C.text, letterSpacing: "-0.03em", marginBottom: 10 }}>Sales Nudges</div>
                <div style={{ fontSize: 15, color: C.mut, letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 56 }}>Intelligence at the Last Mile</div>
                <button onClick={play} style={{ padding: "15px 48px", borderRadius: 28, border: "none", background: C.morrie, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: `0 4px 20px ${C.morrie}55` }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="#fff"><path d="M4 2l10 6-10 6V2z"/></svg>
                  Play Demo
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", maxWidth: 560 }}>
                <div style={{ fontSize: 56, fontWeight: 700, color: C.text, lineHeight: 1, animation: "fu .6s ease" }}>25–30</div>
                <div style={{ fontSize: 17, color: C.mut, marginTop: 10, animation: "fu .6s ease .2s both" }}>outlets visited daily by an FMCG salesman</div>
                <div style={{ fontSize: 18, color: C.green, marginTop: 20 }}>
                  <Typewriter text="What if every visit was guided by intelligence?" speed={35} delay={800} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Impact ── */}
        {isImpact && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 50% 50%, #0a2e1a, transparent 55%), #060a0d`, zIndex: 50, animation: "fi .6s ease" }}>
            <div style={{ textAlign: "center", maxWidth: 700 }}>
              <div style={{ fontSize: 14, color: C.morrie, fontFamily: "monospace", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 12, animation: "fu .5s ease" }}>Projected Impact</div>
              <div style={{ fontSize: 22, color: C.mut, marginBottom: 48, lineHeight: 1.5, animation: "fu .5s ease .2s both" }}>
                <Typewriter text="Across a 500-salesman field force over 6 months" speed={25} delay={300} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, animation: "fu .5s ease .5s both" }}>
                {[
                  { val: 14, suffix: "%", label: "Increase in daily\nrevenue per salesman", sub: "From ₹4,200 → ₹4,800 avg", color: C.green, delay: 800 },
                  { val: 22, suffix: "%", label: "Reduction in\nstockout losses", sub: "₹2.3Cr annually recovered", color: C.amber, delay: 1200 },
                  { val: 31, suffix: "%", label: "More dormant outlets\nreactivated monthly", sub: "85 → 112 outlets/month", color: "#53bdeb", delay: 1600 },
                ].map((m, i) => (
                  <div key={i} style={{ textAlign: "center", opacity: 0, animation: `fu .5s ease ${m.delay}ms both` }}>
                    <Counter end={m.val} suffix={m.suffix} delay={m.delay} color={m.color} />
                    <div style={{ fontSize: 13, color: C.text, marginTop: 10, lineHeight: 1.45, whiteSpace: "pre-line" }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: C.mut, marginTop: 6 }}>{m.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 40, maxWidth: 440, margin: "40px auto 0", opacity: 0, animation: "fu .5s ease 2.2s both" }}>
                {[
                  { val: 8, suffix: " min", label: "Saved per store visit\non prep & lookup", color: C.green, delay: 2400 },
                  { val: 96, suffix: "%", label: "Salesman adoption rate\nafter 30 days", color: C.morrie, delay: 2800 },
                ].map((m, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <Counter end={m.val} suffix={m.suffix} delay={m.delay} color={m.color} />
                    <div style={{ fontSize: 12, color: C.mut, marginTop: 8, lineHeight: 1.4, whiteSpace: "pre-line" }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 40, fontSize: 11, color: `${C.mut}66`, opacity: 0, animation: "fi .4s ease 3.5s both" }}>
                Based on pilot data across 3 FMCG deployments
              </div>
            </div>
          </div>
        )}

        {/* ── Close ── */}
        {isClose && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#060a0d", zIndex: 50, animation: "fi .8s ease" }}>
            <div style={{ textAlign: "center", animation: "fu .7s ease" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: C.morrie, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>M</span>
              </div>
              <div style={{ fontSize: 52, fontWeight: 700, color: C.text, letterSpacing: "-0.03em", marginBottom: 8 }}>Sales Nudges</div>
              <div style={{ fontSize: 16, color: C.mut, marginBottom: 30 }}>
                <Typewriter text="Intelligence delivered where the salesman already lives." speed={25} delay={400} />
              </div>
              <div style={{ display: "flex", gap: 24, justifyContent: "center", fontSize: 13, fontFamily: "monospace", color: C.green, opacity: 0, animation: "fi .4s ease 2s both" }}>
                <span>Training</span><span style={{ color: `${C.mut}33` }}>·</span><span>Nudges</span><span style={{ color: `${C.mut}33` }}>·</span><span>Recovery</span>
              </div>
              <div style={{ marginTop: 40, fontSize: 13, color: `${C.mut}55`, opacity: 0, animation: "fi .4s ease 2.5s both" }}>questt.ai</div>
            </div>
          </div>
        )}

        {/* ── Chat ── */}
        {showChat && (
          <div style={{ position: "absolute", inset: 0, display: "flex", animation: "fi .3s ease" }}>
            <div style={{ width: "55%", display: "flex", flexDirection: "column", background: "#060a0d", padding: "24px 20px" }}>
              <div style={{ flex: 1, display: "flex", width: "100%", maxWidth: "380px", flexDirection: "column", borderRadius: 12, overflow: "hidden", background: C.bg, border: `1px solid ${C.mut}15` }}>
                <div style={{ background: "#1f2c34", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span style={{ color: C.mut, fontSize: 18 }}>←</span>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.morrie, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>M</span>
                  </div>
                  <div>
                    <div style={{ color: C.text, fontSize: 14, fontWeight: 500 }}>Morrie</div>
                    <div style={{ color: C.mut, fontSize: 11 }}>online</div>
                  </div>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                  {vis.filter(m => m.el).map(m => <div key={m.id}>{m.el}</div>)}
                  <div ref={chatEnd}/>
                </div>
                <div style={{ padding: "7px 10px", background: "#1f2c34", display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
                  <span style={{ fontSize: 16 }}>😊</span>
                  <span style={{ fontSize: 14, color: C.mut }}>📎</span>
                  <div style={{ flex: 1, padding: "7px 12px", borderRadius: 18, background: "#2a3942", fontSize: 12.5, color: C.mut }}>Type a message</div>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.morrie, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"/><path d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "45%", display: "flex", alignItems: "center", justifyContent: "center", background: "#060a0d" }}>
              {label && (
                <div key={label.time + label.title} style={{ padding: "0 44px", animation: "fu .45s ease" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: label.color, fontFamily: "monospace", letterSpacing: ".08em", marginBottom: 10 }}>{label.time}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 10, lineHeight: 1.15 }}>{label.title}</div>
                  <div style={{ fontSize: 14.5, color: C.mut, lineHeight: 1.65 }}>{label.desc}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {playing && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `${C.mut}11`, zIndex: 200 }}>
            <div style={{ height: "100%", background: C.morrie, width: `${Math.min((elapsed / total) * 100, 100)}%`, transition: "width .1s linear" }}/>
          </div>
        )}
      </div>
    </div>
  );
}
