"use client";
import { useState } from "react";

const Q = {
  bg: "#FAFAF8", card: "#FFFFFF", border: "#E5E2DB",
  text: "#1C1C1C", sub: "#555555", muted: "#999999",
  accent: "#2D5A3D", accentLight: "#EEF4F0",
  red: "#B5342B", redLight: "#FDF0EF",
  amber: "#B8860B", amberLight: "#FBF5E9",
  green: "#2D5A3D", greenLight: "#EEF4F0",
};
const f = { body: "'IBM Plex Sans', sans-serif", head: "Georgia, serif", mono: "'JetBrains Mono', monospace" };

const Tag = ({ children, color = Q.accent, hollow }) => (
  <span style={{
    fontFamily: f.mono, fontSize: 10, fontWeight: 500, letterSpacing: 0.4,
    color: hollow ? color : "#fff", background: hollow ? "transparent" : color,
    border: hollow ? `1px solid ${color}` : "none",
    padding: "2px 7px", borderRadius: 3, whiteSpace: "nowrap",
  }}>{children}</span>
);
const Mono = ({ children, size = 10, color = Q.muted, style = {} }) => (
  <span style={{ fontFamily: f.mono, fontSize: size, color, letterSpacing: 0.6, textTransform: "uppercase", ...style }}>{children}</span>
);
const AskBtn = ({ children, onClick, small }) => (
  <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={{
    fontFamily: f.mono, fontSize: small ? 9 : 10, letterSpacing: 0.4,
    color: Q.accent, background: Q.accentLight, border: `1px solid ${Q.accent}30`,
    borderRadius: 4, padding: small ? "3px 7px" : "5px 10px", cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 4,
  }}>
    <span style={{ fontSize: small ? 10 : 12 }}>↗</span> {children}
  </button>
);

// ── Data ──
const COLLECTORS = [
  { id: "amit", name: "Amit Saxena", role: "Senior Collector", assigned: 28, exposure: "₹1.8 Cr", calls: 18, fieldVisits: 3, legal: 2, yAtttempted: 24, yReached: 16, yResolved: 4, resolvedAmt: "₹12.4L", capacity: "full" },
  { id: "priya", name: "Priya Nair", role: "Field Agent", assigned: 12, exposure: "₹2.1 Cr", calls: 2, fieldVisits: 8, legal: 0, yAtttempted: 10, yReached: 8, yResolved: 3, resolvedAmt: "₹18.2L", capacity: "full" },
  { id: "dev", name: "Dev Patel", role: "Collector", assigned: 30, exposure: "₹0.9 Cr", calls: 25, fieldVisits: 0, legal: 1, yAtttempted: 28, yReached: 19, yResolved: 6, resolvedAmt: "₹4.1L", capacity: "over" },
  { id: "sunita", name: "Sunita Rao", role: "Collector", assigned: 22, exposure: "₹0.7 Cr", calls: 20, fieldVisits: 0, legal: 0, yAtttempted: 20, yReached: 14, yResolved: 5, resolvedAmt: "₹3.8L", capacity: "ok" },
  { id: "vikram", name: "Vikram Singh", role: "Field Agent", assigned: 10, exposure: "₹1.4 Cr", calls: 1, fieldVisits: 7, legal: 1, yAtttempted: 8, yReached: 7, yResolved: 2, resolvedAmt: "₹8.9L", capacity: "ok" },
  { id: "neha", name: "Neha Gupta", role: "Senior Collector", assigned: 26, exposure: "₹1.2 Cr", calls: 20, fieldVisits: 2, legal: 1, yAtttempted: 22, yReached: 15, yResolved: 5, resolvedAmt: "₹9.6L", capacity: "ok" },
  { id: "arjun", name: "Arjun Reddy", role: "Collector", assigned: 24, exposure: "₹0.6 Cr", calls: 22, fieldVisits: 0, legal: 0, yAtttempted: 18, yReached: 11, yResolved: 3, resolvedAmt: "₹2.4L", capacity: "ok" },
  { id: "fatima", name: "Fatima Khan", role: "Legal Specialist", assigned: 14, exposure: "₹3.2 Cr", calls: 3, fieldVisits: 0, legal: 10, yAtttempted: 12, yReached: 5, yResolved: 1, resolvedAmt: "₹14.1L", capacity: "ok" },
  { id: "rahul", name: "Rahul Joshi", role: "Collector", assigned: 18, exposure: "₹0.5 Cr", calls: 16, fieldVisits: 0, legal: 0, yAtttempted: 15, yReached: 10, yResolved: 4, resolvedAmt: "₹2.8L", capacity: "light" },
  { id: "meena", name: "Meena Sharma", role: "Collector", assigned: 20, exposure: "₹0.4 Cr", calls: 18, fieldVisits: 0, legal: 0, yAtttempted: 16, yReached: 9, yResolved: 2, resolvedAmt: "₹1.6L", capacity: "light" },
];

const ESCALATIONS = [
  {
    id: "esc1", name: "Rajesh Malhotra", product: "Home Loan", exposure: "₹42.8L", bucket: "SMA-2", days: 54,
    collector: "Amit Saxena", escalationType: "Can't reach → Field visit approval",
    summary: "Two calls made, reached but no commitment. Salary credit stopped. Amit requesting field visit.",
    trail: [
      { node: "RepaymentEvent", detail: "EMI missed Feb 12, Mar 12. Two consecutive defaults.", color: Q.red },
      { node: "DelinquencyState", detail: "SMA-0 → SMA-1 (Day 18) → SMA-2 (Day 42). Now at Day 54.", color: Q.red },
      { node: "EarlyWarningState", detail: "Triggered Day 8 — deposit balance dropped 78% before first miss.", color: Q.amber },
      { node: "MandateExecutionEvent", detail: "3 consecutive bounces. Insufficient funds, not technical.", color: Q.red },
      { node: "DepositPositionState", detail: "Avg balance ₹1.2L → ₹26K. Salary credit stopped February.", color: Q.amber },
      { node: "TelcoSignalState", detail: "Recharge stable. Data usage unchanged. Still reachable.", color: Q.accent },
      { node: "CollectionActionEvent", detail: "SMS (Day 1) → Call x2 (Day 15, 30) — reached, no commitment.", color: Q.muted },
    ],
    reasoning: "High exposure, salary disruption as root cause. Telco says reachable — not avoiding. Field visit justified: face-to-face needed to assess actual situation and discuss restructuring. Approve and assign to Priya (field agent, NCR-West route tomorrow).",
    actions: ["Approve field visit", "Reassign", "Escalate to DGM"],
    askPrompt: "What's Priya's field schedule tomorrow? Can she fit Rajesh in NCR-West?",
  },
  {
    id: "esc2", name: "Ankit Verma", product: "Personal Loan", exposure: "₹6.2L", bucket: "SMA-2", days: 67,
    collector: "Dev Patel", escalationType: "NPA threshold — legal notice approval",
    summary: "23 days to NPA. Multi-lender stress, going dark. Dev requesting legal notice initiation.",
    trail: [
      { node: "RepaymentEvent", detail: "3 consecutive misses. No partial payments attempted.", color: Q.red },
      { node: "DelinquencyState", detail: "NPA in 23 days if no cure.", color: Q.red },
      { node: "BureauPull", detail: "Score dropped 80 pts. Two other lender delinquencies.", color: Q.red },
      { node: "TelcoSignalState", detail: "Recharge stopped 3 weeks ago. Possible number change.", color: Q.red },
      { node: "DepositPositionState", detail: "Near-zero 60+ days. No salary since January.", color: Q.red },
      { node: "CollectionActionEvent", detail: "SMS x3, Call x4 (2 reached, 2 unreachable). No commitment.", color: Q.muted },
    ],
    reasoning: "Every signal is red. Multi-lender, income gone, disappearing. Legal notice is procedurally required before NPA. Low exposure — write-off candidate if no response in 15 days. Approve notice, route to Fatima.",
    actions: ["Approve legal notice", "One more call attempt", "Escalate to DGM"],
    askPrompt: "What's our total exposure to borrowers with similar multi-lender NPA profiles in NCR?",
  },
  {
    id: "esc3", name: "Meera Krishnan", product: "Home Loan", exposure: "₹31.1L", bucket: "SMA-1", days: 35,
    collector: "Neha Gupta", escalationType: "Settlement/restructuring — above ₹10L threshold",
    summary: "Partial payment received, salary resumed. Neha recommends restructuring over settlement.",
    trail: [
      { node: "RepaymentEvent", detail: "Missed Jan EMI. Partial ₹18K (vs ₹34K) received Feb 28.", color: Q.amber },
      { node: "DepositPositionState", detail: "Balance recovering — ₹45K vs ₹12K low. Salary resumed.", color: Q.accent },
      { node: "MandateExecutionEvent", detail: "Mandate active. Last bounce was insufficient funds, not revocation.", color: Q.amber },
      { node: "CollectionActionEvent", detail: "Call (Day 12) — temporary job gap. Partial payment followed voluntarily.", color: Q.muted },
    ],
    reasoning: "Strong cure signals. She paid voluntarily, salary is back, mandate active. Restructure the arrears over 6 months rather than taking a settlement haircut. Expected recovery: 100% of principal vs ~70% on settlement. Approve restructuring, Neha to present the plan.",
    actions: ["Approve restructuring", "Offer settlement instead", "Need more info"],
    askPrompt: "Draft the restructuring terms — spread ₹34K arrears over 6 months on top of regular EMI",
  },
];

const ACTIONS_DATA = [
  { name: "Rajesh Malhotra", product: "Home Loan", exposure: "₹42.8L", bucket: "SMA-2", days: 54, action: "Field Visit", priority: "critical", collector: "Amit Saxena", escalated: true,
    trail: [
      { node: "RepaymentEvent", detail: "EMI missed Feb 12, Mar 12. Two consecutive.", color: Q.red },
      { node: "DelinquencyState", detail: "SMA-2 at Day 54. NPA in 36 days.", color: Q.red },
      { node: "DepositPositionState", detail: "Balance ₹1.2L → ₹26K. Salary stopped Feb.", color: Q.amber },
      { node: "TelcoSignalState", detail: "Recharge stable. Still reachable.", color: Q.accent },
      { node: "CollectionActionEvent", detail: "SMS + Call x2. Reached, no commitment.", color: Q.muted },
    ],
    reasoning: "Salary disruption, still reachable. Field visit needed for face-to-face restructuring discussion.",
    askPrompt: "What restructuring options exist for salary-disruption cases above ₹40L?" },
  { name: "Priya Sundaram", product: "LAP", exposure: "₹28.4L", bucket: "SMA-1", days: 22, action: "Call (3rd)", priority: "high", collector: "Neha Gupta", escalated: false,
    trail: [
      { node: "RepaymentEvent", detail: "First default in 3-year history. Missed Mar 4.", color: Q.amber },
      { node: "MandateExecutionEvent", detail: "2 bounces. Second was ₹8K short — she tried.", color: Q.amber },
      { node: "BureauPull", detail: "New NBFC inquiry 45 days ago. Red flag.", color: Q.red },
      { node: "DepositPositionState", detail: "Volatile but not zeroed. Irregular salary.", color: Q.amber },
      { node: "CollectionActionEvent", detail: "Call x2. Day 18 reached, said 'next week'.", color: Q.muted },
    ],
    reasoning: "First-time defaulter, tried to pay. New credit inquiry is concerning — probe if borrowing elsewhere. Push regularization.",
    askPrompt: "Show me Priya's bureau detail — what's the new NBFC inquiry?" },
  { name: "Ankit Verma", product: "Personal Loan", exposure: "₹6.2L", bucket: "SMA-2", days: 67, action: "Legal Notice", priority: "critical", collector: "Dev Patel", escalated: true,
    trail: [
      { node: "RepaymentEvent", detail: "3 consecutive misses. Zero partial.", color: Q.red },
      { node: "BureauPull", detail: "Score -80 pts. Two other lender delinquencies.", color: Q.red },
      { node: "TelcoSignalState", detail: "Number inactive 3 weeks. Gone dark.", color: Q.red },
      { node: "CollectionActionEvent", detail: "Full waterfall attempted. 2 of 4 calls reached.", color: Q.muted },
    ],
    reasoning: "Multi-lender stress, going dark. NPA in 23 days. Legal notice required. Write-off candidate.",
    askPrompt: "What's the provision impact if Ankit goes to NPA?" },
  { name: "Meera Krishnan", product: "Home Loan", exposure: "₹31.1L", bucket: "SMA-1", days: 35, action: "Restructuring", priority: "medium", collector: "Neha Gupta", escalated: true,
    trail: [
      { node: "RepaymentEvent", detail: "Partial ₹18K received voluntarily.", color: Q.amber },
      { node: "DepositPositionState", detail: "Salary resumed. Balance recovering.", color: Q.accent },
      { node: "MandateExecutionEvent", detail: "Mandate active, not revoked.", color: Q.amber },
    ],
    reasoning: "Best cure candidate. Restructure arrears over 6 months. Expected recovery: 100%.",
    askPrompt: "Draft restructuring terms for Meera" },
  { name: "Deepak Agarwal", product: "Loan Against MF", exposure: "₹15.7L", bucket: "SMA-0", days: 8, action: "Call (1st)", priority: "high", collector: "Amit Saxena", escalated: false,
    trail: [
      { node: "PortfolioPositionState", detail: "Collateral MF down 18%. Cover at 1.08x.", color: Q.red },
      { node: "InvestmentAccount", detail: "SIP stopped. ₹3.2L redemption initiated.", color: Q.red },
      { node: "DepositPositionState", detail: "Deposit healthy ₹2.8L. Not cash-flow.", color: Q.accent },
      { node: "BehavioralScoreState", detail: "All signals clean. No stress.", color: Q.accent },
    ],
    reasoning: "Collateral problem, not collections. Check lien on MF. Call about redemption, not EMI. Escalate to ops if lien isn't marked.",
    askPrompt: "Check lien status on Deepak's MF — is the redemption valid?" },
  { name: "Farhan Sheikh", product: "Personal Loan", exposure: "₹4.8L", bucket: "NPA", days: 112, action: "Write-off", priority: "critical", collector: "Fatima Khan", escalated: false,
    trail: [
      { node: "DelinquencyState", detail: "NPA Day 112. Classified Day 90.", color: "#7F1D1D" },
      { node: "TelcoSignalState", detail: "Number inactive 60+ days.", color: Q.red },
      { node: "BureauPull", detail: "4 other lender NPAs. ~₹18L total stress.", color: Q.red },
      { node: "CollectionActionEvent", detail: "Full waterfall. Field visit — address vacant.", color: Q.muted },
    ],
    reasoning: "Exhausted. Write-off. No further effort justified at ₹4.8L.",
    askPrompt: "Process write-off for Farhan — approvals needed?" },
  { name: "Sanjay Bhatt", product: "Personal Loan", exposure: "₹3.4L", bucket: "SMA-0", days: 5, action: "Call (1st)", priority: "medium", collector: "Rahul Joshi", escalated: false,
    trail: [
      { node: "RepaymentEvent", detail: "First miss. EMI due Mar 21.", color: Q.amber },
      { node: "MandateExecutionEvent", detail: "Bounce — insufficient funds.", color: Q.amber },
      { node: "DepositPositionState", detail: "Salary credit came 3 days late this month.", color: Q.amber },
    ],
    reasoning: "Likely timing issue. Salary delayed. Standard first call.",
    askPrompt: "Any pattern of late salary credits for Sanjay?" },
  { name: "Kavita Menon", product: "Home Loan", exposure: "₹22.6L", bucket: "SMA-1", days: 28, action: "Call (2nd)", priority: "high", collector: "Sunita Rao", escalated: false,
    trail: [
      { node: "RepaymentEvent", detail: "Missed Feb EMI. No March payment yet.", color: Q.red },
      { node: "DepositPositionState", detail: "Large withdrawal ₹4L three weeks ago.", color: Q.amber },
      { node: "BureauPull", detail: "Clean. No other stress signals.", color: Q.accent },
      { node: "CollectionActionEvent", detail: "First call reached. Said 'family emergency'.", color: Q.muted },
    ],
    reasoning: "Likely genuine one-time event. Bureau clean, no other stress. Second call to confirm timeline and get commitment.",
    askPrompt: "Compare Kavita's payment history over 24 months — any prior irregularity?" },
];

const YESTERDAY = {
  attempted: 173, reached: 114, resolved: 35, resolvedAmt: "₹77.9L",
  cured: 8, curedAmt: "₹14.2L", partials: 12, partialAmt: "₹6.8L", slippedDespite: 4,
  byCollector: [
    { name: "Priya Nair", resolved: 3, amt: "₹18.2L", reach: "80%", note: "Best conversion — field visits" },
    { name: "Fatima Khan", resolved: 1, amt: "₹14.1L", reach: "42%", note: "One large legal settlement" },
    { name: "Amit Saxena", resolved: 4, amt: "₹12.4L", reach: "67%", note: "Consistent high volume" },
    { name: "Neha Gupta", resolved: 5, amt: "₹9.6L", reach: "68%", note: "Strong SMA-0 cure rate" },
    { name: "Dev Patel", resolved: 6, amt: "₹4.1L", reach: "68%", note: "High volume but small tickets" },
    { name: "Sunita Rao", resolved: 5, amt: "₹3.8L", reach: "70%", note: "Solid performer" },
  ],
};

const pColor = { critical: Q.red, high: Q.amber, medium: "#6B7280" };
const bColor = { "SMA-0": Q.amber, "SMA-1": "#C27A1A", "SMA-2": Q.red, "NPA": "#7F1D1D" };
const nodeColor = (c) => ({ [Q.red]: Q.redLight, [Q.amber]: Q.amberLight, [Q.accent]: Q.greenLight, [Q.muted]: "#F0EDEA" }[c] || "#F0EDEA");

// ── Side Panel ──
const SidePanel = ({ open, onClose, content }) => (
  <>
    {open && <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.12)", zIndex: 20 }} />}
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 460,
      background: Q.card, borderLeft: `1px solid ${Q.border}`,
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.25s ease", zIndex: 30,
      display: "flex", flexDirection: "column",
      boxShadow: open ? "-8px 0 32px rgba(0,0,0,0.08)" : "none",
    }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${Q.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: f.body, fontWeight: 700, fontSize: 14, color: Q.accent }}>questt<span style={{ fontSize: 16 }}>.</span></span>
          {content?.title && <Mono size={9}>{content.title}</Mono>}
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: f.mono, fontSize: 16, color: Q.muted, padding: 4 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 0 }}>
        {content?.body}
      </div>
      {/* Input */}
      <div style={{ padding: "12px 20px", borderTop: `1px solid ${Q.border}` }}>
        <div style={{ display: "flex", gap: 8, background: Q.bg, borderRadius: 8, padding: "8px 12px", border: `1px solid ${Q.border}` }}>
          <input placeholder="Ask a follow-up..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontFamily: f.body, fontSize: 13, color: Q.text }} />
          <div style={{ width: 28, height: 28, borderRadius: 6, background: Q.accent, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </div>
        </div>
      </div>
    </div>
  </>
);

// ── Decision Trail Component (reusable) ──
const DecisionTrail = ({ trail, reasoning, askPrompt, onAsk }) => (
  <div>
    <div style={{ padding: "16px 20px" }}>
      <Mono size={10} color={Q.accent} style={{ display: "block", marginBottom: 12 }}>Decision Trail</Mono>
      <div style={{ position: "relative", paddingLeft: 22 }}>
        <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: Q.border }} />
        {trail.map((t, j) => (
          <div key={j} style={{ display: "flex", gap: 12, marginBottom: j < trail.length - 1 ? 12 : 0, position: "relative" }}>
            <div style={{ position: "absolute", left: -18, top: 4, width: 10, height: 10, borderRadius: "50%", background: t.color, border: `2px solid ${Q.card}`, boxShadow: `0 0 0 1px ${t.color}40`, zIndex: 1 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-block", fontFamily: f.mono, fontSize: 9, fontWeight: 600, color: t.color, background: nodeColor(t.color), padding: "2px 7px", borderRadius: 3, marginBottom: 3, letterSpacing: 0.3 }}>{t.node}</div>
              <p style={{ fontFamily: f.body, fontSize: 12, color: Q.text, margin: 0, lineHeight: 1.5 }}>{t.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: "14px 20px", background: "#FDFCFB", borderTop: `1px solid ${Q.border}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <Mono size={10} color={Q.accent}>Reasoning</Mono>
        {onAsk && askPrompt && <AskBtn onClick={() => onAsk(askPrompt)} small>Ask questt.</AskBtn>}
      </div>
      <p style={{ fontFamily: f.body, fontSize: 12, color: Q.text, margin: 0, lineHeight: 1.6 }}>{reasoning}</p>
    </div>
  </div>
);

// ── Collector Panel Content ──
const CollectorPanel = ({ collector }) => {
  const accts = ACTIONS_DATA.filter(a => a.collector === collector.name);
  return (
    <div>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${Q.border}` }}>
        <h3 style={{ fontFamily: f.head, fontSize: 16, fontWeight: 600, color: Q.text, margin: "0 0 4px" }}>{collector.name}</h3>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}><Tag color={Q.muted} hollow>{collector.role}</Tag><Tag color={collector.capacity === "over" ? Q.red : collector.capacity === "light" ? Q.accent : Q.muted} hollow>{collector.capacity === "over" ? "Overloaded" : collector.capacity === "light" ? "Has capacity" : "On track"}</Tag></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: Q.border, borderRadius: 6, overflow: "hidden" }}>
          {[
            { l: "Assigned", v: collector.assigned },
            { l: "Exposure", v: collector.exposure },
            { l: "Resolved Y'day", v: collector.yResolved },
          ].map(m => (
            <div key={m.l} style={{ background: Q.card, padding: "10px 12px" }}>
              <Mono style={{ display: "block", marginBottom: 4 }}>{m.l}</Mono>
              <span style={{ fontFamily: f.head, fontSize: 16, fontWeight: 600, color: Q.text }}>{m.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 20px" }}>
        <Mono style={{ display: "block", marginBottom: 8 }}>Today's Mix</Mono>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Tag color={Q.accent} hollow>{collector.calls} calls</Tag>
          <Tag color={Q.amber} hollow>{collector.fieldVisits} field visits</Tag>
          <Tag color={Q.red} hollow>{collector.legal} legal</Tag>
        </div>
        <Mono style={{ display: "block", marginBottom: 8 }}>Yesterday</Mono>
        <div style={{ fontFamily: f.body, fontSize: 12, color: Q.sub, lineHeight: 1.6, marginBottom: 16 }}>
          Attempted {collector.yAtttempted}, reached {collector.yReached} ({Math.round(collector.yReached / collector.yAtttempted * 100)}% reach rate).
          Resolved {collector.yResolved} for {collector.resolvedAmt}.
        </div>
        {accts.length > 0 && (
          <>
            <Mono style={{ display: "block", marginBottom: 8 }}>Assigned Accounts</Mono>
            {accts.map((a, i) => (
              <div key={i} style={{ padding: "10px 12px", border: `1px solid ${Q.border}`, borderRadius: 6, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontFamily: f.body, fontSize: 12, fontWeight: 600, color: Q.text }}>{a.name}</span>
                  <span style={{ fontFamily: f.body, fontSize: 11, color: Q.muted, marginLeft: 8 }}>{a.product}</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Tag color={bColor[a.bucket]}>{a.bucket}</Tag>
                  <span style={{ fontFamily: f.mono, fontSize: 11, color: Q.text }}>{a.exposure}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ── Today's Brief ──
const TodaysBrief = ({ onAsk }) => (
  <div style={{ marginBottom: 28, padding: "20px 24px", background: Q.card, border: `1px solid ${Q.border}`, borderRadius: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <div>
        <Mono size={11} style={{ display: "block", marginBottom: 4 }}>March 26, 2026 · 6:00 AM</Mono>
        <h1 style={{ fontFamily: f.head, fontSize: 22, fontWeight: 600, color: Q.text, margin: 0 }}>Good morning, Karan</h1>
      </div>
      <Tag color={Q.accent}>NCR Region</Tag>
    </div>
    <div style={{ fontFamily: f.body, fontSize: 13, color: Q.text, lineHeight: 1.7 }}>
      <p style={{ margin: "0 0 10px" }}>
        <strong style={{ color: Q.red }}>3 escalations</strong> waiting for your decision — Rajesh's field visit, Ankit's legal notice, and Meera's restructuring.
        Your team has <strong>204 actions</strong> queued today across 10 collectors.
        Yesterday: 173 attempted, 114 reached, <strong style={{ color: Q.accent }}>35 resolved for ₹77.9L</strong>.
        Dev is overloaded at 30 accounts — consider rebalancing 5 to Rahul who has capacity.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <AskBtn onClick={() => onAsk("Rebalance Dev's queue — move 5 lowest-priority accounts to Rahul")}>Rebalance Dev → Rahul</AskBtn>
        <AskBtn onClick={() => onAsk("Compare this week's reach rates vs last week by collector")}>This week vs last</AskBtn>
      </div>
    </div>
  </div>
);

// ── Escalation Queue ──
const EscalationQueue = ({ onOpenTrail }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
      <div>
        <h2 style={{ fontFamily: f.head, fontSize: 18, fontWeight: 600, color: Q.text, margin: 0 }}>Needs Your Decision</h2>
        <span style={{ fontFamily: f.body, fontSize: 12, color: Q.muted }}>Blocking your team until resolved</span>
      </div>
      <Tag color={Q.red}>{ESCALATIONS.length} pending</Tag>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {ESCALATIONS.map((e) => (
        <div key={e.id} onClick={() => onOpenTrail(e)} style={{
          background: Q.card, border: `1px solid ${Q.border}`, borderRadius: 8,
          padding: "16px 20px", cursor: "pointer", transition: "border-color 0.15s",
          borderLeft: `3px solid ${Q.red}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontFamily: f.body, fontSize: 14, fontWeight: 600, color: Q.text }}>{e.name}</span>
                <Tag color={bColor[e.bucket]}>{e.bucket}</Tag>
                <span style={{ fontFamily: f.mono, fontSize: 12, fontWeight: 600, color: Q.text }}>{e.exposure}</span>
              </div>
              <span style={{ fontFamily: f.body, fontSize: 12, color: Q.muted }}>{e.product} · {e.collector} · {e.days}d in bucket</span>
            </div>
            <Tag color={Q.red} hollow>{e.escalationType.split("—")[0].trim()}</Tag>
          </div>
          <p style={{ fontFamily: f.body, fontSize: 13, color: Q.sub, margin: "0 0 10px", lineHeight: 1.5 }}>{e.summary}</p>
          <div style={{ display: "flex", gap: 6 }}>
            {e.actions.map((a, i) => (
              <button key={i} onClick={(ev) => ev.stopPropagation()} style={{
                fontFamily: f.body, fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 5, cursor: "pointer",
                background: i === 0 ? Q.accent : "transparent",
                color: i === 0 ? "#fff" : Q.accent,
                border: i === 0 ? "none" : `1px solid ${Q.accent}`,
              }}>{a}</button>
            ))}
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: f.mono, fontSize: 10, color: Q.muted, alignSelf: "center" }}>Click for decision trail →</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Team Workload ──
const TeamWorkload = ({ onClickCollector }) => {
  const capColor = { over: Q.red, full: Q.amber, ok: Q.accent, light: Q.muted };
  const capLabel = { over: "Overloaded", full: "Full", ok: "On track", light: "Capacity" };
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontFamily: f.head, fontSize: 18, fontWeight: 600, color: Q.text, margin: "0 0 12px" }}>Team</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {COLLECTORS.map((c) => (
          <div key={c.id} onClick={() => onClickCollector(c)} style={{
            background: Q.card, border: `1px solid ${Q.border}`, borderRadius: 8,
            padding: "12px 14px", cursor: "pointer", transition: "border-color 0.15s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: Q.accentLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: f.mono, fontSize: 10, fontWeight: 600, color: Q.accent,
              }}>{c.name.split(" ").map(n => n[0]).join("")}</div>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: capColor[c.capacity] }} />
            </div>
            <div style={{ fontFamily: f.body, fontSize: 12, fontWeight: 600, color: Q.text, marginBottom: 1 }}>{c.name.split(" ")[0]}</div>
            <Mono size={9} style={{ display: "block", marginBottom: 8 }}>{capLabel[c.capacity]}</Mono>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <Mono size={9}>Today</Mono>
              <span style={{ fontFamily: f.mono, fontSize: 11, fontWeight: 600, color: Q.text }}>{c.assigned}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <Mono size={9}>Exposure</Mono>
              <span style={{ fontFamily: f.mono, fontSize: 11, color: Q.text }}>{c.exposure}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Mono size={9}>Y'day</Mono>
              <span style={{ fontFamily: f.mono, fontSize: 11, color: Q.accent }}>{c.yResolved} / {c.resolvedAmt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Action Queue ──
const ActionQueue = ({ onOpenTrail, onAsk }) => {
  const [viewAll, setViewAll] = useState(false);
  const [filterBucket, setFilterBucket] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  let filtered = ACTIONS_DATA;
  if (filterBucket !== "All") filtered = filtered.filter(a => a.bucket === filterBucket);
  if (filterPriority !== "All") filtered = filtered.filter(a => a.priority === filterPriority);
  const visible = viewAll ? filtered : filtered.slice(0, 5);

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div>
          <h2 style={{ fontFamily: f.head, fontSize: 18, fontWeight: 600, color: Q.text, margin: 0 }}>Action Queue</h2>
          <span style={{ fontFamily: f.body, fontSize: 12, color: Q.muted }}>{ACTIONS_DATA.length} accounts · Click any row for decision trail</span>
        </div>
        <Mono>{filtered.length} shown</Mono>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        <Mono size={9} style={{ alignSelf: "center", marginRight: 4 }}>Filter</Mono>
        {["All", "SMA-0", "SMA-1", "SMA-2", "NPA"].map(b => (
          <button key={b} onClick={() => setFilterBucket(b)} style={{
            fontFamily: f.mono, fontSize: 10, padding: "3px 8px", borderRadius: 4, cursor: "pointer",
            background: filterBucket === b ? Q.text : "transparent",
            color: filterBucket === b ? "#fff" : Q.sub,
            border: `1px solid ${filterBucket === b ? Q.text : Q.border}`,
          }}>{b}</button>
        ))}
        <span style={{ color: Q.border, margin: "0 4px" }}>|</span>
        {["All", "critical", "high", "medium"].map(p => (
          <button key={p} onClick={() => setFilterPriority(p)} style={{
            fontFamily: f.mono, fontSize: 10, padding: "3px 8px", borderRadius: 4, cursor: "pointer", textTransform: "capitalize",
            background: filterPriority === p ? Q.text : "transparent",
            color: filterPriority === p ? "#fff" : Q.sub,
            border: `1px solid ${filterPriority === p ? Q.text : Q.border}`,
          }}>{p}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: Q.card, border: `1px solid ${Q.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "24px 1.4fr 0.7fr 0.55fr 0.7fr 0.45fr 0.9fr", padding: "8px 16px", borderBottom: `1px solid ${Q.border}`, background: "#FAFAF8", gap: 10 }}>
          {["", "Account", "Exposure", "Bucket", "Collector", "Days", "Action"].map(h => <Mono key={h} size={9}>{h}</Mono>)}
        </div>
        {visible.map((a, i) => (
          <div key={i} onClick={() => onOpenTrail(a)} style={{
            display: "grid", gridTemplateColumns: "24px 1.4fr 0.7fr 0.55fr 0.7fr 0.45fr 0.9fr",
            padding: "11px 16px", gap: 10, alignItems: "center",
            borderBottom: `1px solid ${Q.border}`, cursor: "pointer",
            transition: "background 0.12s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9F8F6"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: pColor[a.priority] }} />
            <div>
              <span style={{ fontFamily: f.body, fontSize: 13, fontWeight: 600, color: Q.text }}>{a.name}</span>
              <span style={{ fontFamily: f.body, fontSize: 11, color: Q.muted, marginLeft: 6 }}>{a.product}</span>
              {a.escalated && <span style={{ fontFamily: f.mono, fontSize: 8, color: Q.red, background: Q.redLight, padding: "1px 4px", borderRadius: 2, marginLeft: 6 }}>ESC</span>}
            </div>
            <span style={{ fontFamily: f.mono, fontSize: 12, fontWeight: 600, color: Q.text }}>{a.exposure}</span>
            <Tag color={bColor[a.bucket]}>{a.bucket}</Tag>
            <span style={{ fontFamily: f.body, fontSize: 11, color: Q.sub }}>{a.collector.split(" ")[0]}</span>
            <span style={{ fontFamily: f.mono, fontSize: 11, color: Q.sub }}>{a.days}d</span>
            <span style={{ fontFamily: f.body, fontSize: 12, fontWeight: 500, color: pColor[a.priority] }}>{a.action}</span>
          </div>
        ))}
      </div>

      {!viewAll && filtered.length > 5 && (
        <button onClick={() => setViewAll(true)} style={{
          width: "100%", padding: "11px", marginTop: 8,
          fontFamily: f.body, fontSize: 12, fontWeight: 500, color: Q.accent,
          background: Q.accentLight, border: `1px solid ${Q.accent}20`, borderRadius: 8, cursor: "pointer",
        }}>View all {filtered.length} accounts →</button>
      )}
      {viewAll && (
        <button onClick={() => setViewAll(false)} style={{
          width: "100%", padding: "11px", marginTop: 8,
          fontFamily: f.body, fontSize: 12, fontWeight: 500, color: Q.muted,
          background: "transparent", border: `1px solid ${Q.border}`, borderRadius: 8, cursor: "pointer",
        }}>Collapse</button>
      )}
    </div>
  );
};

// ── Yesterday's Results ──
const YesterdayResults = ({ onClickCollector }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontFamily: f.head, fontSize: 18, fontWeight: 600, color: Q.text, margin: "0 0 12px" }}>Yesterday's Results</h2>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: Q.border, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
      {[
        { l: "Attempted", v: YESTERDAY.attempted },
        { l: "Reached", v: `${YESTERDAY.reached} (${Math.round(YESTERDAY.reached / YESTERDAY.attempted * 100)}%)` },
        { l: "Resolved", v: `${YESTERDAY.resolved} / ${YESTERDAY.resolvedAmt}`, color: Q.accent },
        { l: "Cured", v: `${YESTERDAY.cured} / ${YESTERDAY.curedAmt}`, color: Q.accent },
        { l: "Slipped Despite", v: YESTERDAY.slippedDespite, color: Q.red },
      ].map(m => (
        <div key={m.l} style={{ background: Q.card, padding: "14px 16px" }}>
          <Mono style={{ display: "block", marginBottom: 6 }}>{m.l}</Mono>
          <span style={{ fontFamily: f.head, fontSize: 18, fontWeight: 600, color: m.color || Q.text }}>{m.v}</span>
        </div>
      ))}
    </div>

    <Mono style={{ display: "block", marginBottom: 8 }}>By Collector — Ranked by Recovery Amount</Mono>
    <div style={{ background: Q.card, border: `1px solid ${Q.border}`, borderRadius: 8, overflow: "hidden" }}>
      {YESTERDAY.byCollector.map((c, i) => {
        const collector = COLLECTORS.find(col => col.name === c.name);
        return (
          <div key={i} onClick={() => collector && onClickCollector(collector)} style={{
            display: "grid", gridTemplateColumns: "1.2fr 0.5fr 0.7fr 0.5fr 1.5fr",
            padding: "10px 16px", gap: 10, alignItems: "center", cursor: "pointer",
            borderBottom: i < YESTERDAY.byCollector.length - 1 ? `1px solid ${Q.border}` : "none",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9F8F6"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontFamily: f.body, fontSize: 12, fontWeight: 600, color: Q.text }}>{c.name}</span>
            <span style={{ fontFamily: f.mono, fontSize: 12, color: Q.accent, fontWeight: 600 }}>{c.resolved}</span>
            <span style={{ fontFamily: f.mono, fontSize: 12, color: Q.accent }}>{c.amt}</span>
            <span style={{ fontFamily: f.mono, fontSize: 11, color: Q.sub }}>{c.reach}</span>
            <span style={{ fontFamily: f.body, fontSize: 11, color: Q.muted }}>{c.note}</span>
          </div>
        );
      })}
    </div>
  </div>
);

// ── Main ──
export default function CollectionsDashboard() {
  const [panel, setPanel] = useState({ open: false, content: null });

  const openTrail = (item) => {
    setPanel({
      open: true,
      content: {
        title: `${item.name} · ${item.bucket}`,
        body: (
          <div>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${Q.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: f.body, fontSize: 16, fontWeight: 600, color: Q.text }}>{item.name}</span>
                <Tag color={bColor[item.bucket]}>{item.bucket}</Tag>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div><Mono>Product</Mono><div style={{ fontFamily: f.body, fontSize: 12, color: Q.text, marginTop: 2 }}>{item.product}</div></div>
                <div><Mono>Exposure</Mono><div style={{ fontFamily: f.mono, fontSize: 14, fontWeight: 600, color: Q.text, marginTop: 2 }}>{item.exposure}</div></div>
                <div><Mono>Days</Mono><div style={{ fontFamily: f.mono, fontSize: 14, color: Q.sub, marginTop: 2 }}>{item.days}d</div></div>
                <div><Mono>Collector</Mono><div style={{ fontFamily: f.body, fontSize: 12, color: Q.text, marginTop: 2 }}>{item.collector || "—"}</div></div>
              </div>
              {item.actions && (
                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  {item.actions.map((a, i) => (
                    <button key={i} style={{
                      fontFamily: f.body, fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 5, cursor: "pointer",
                      background: i === 0 ? Q.accent : "transparent", color: i === 0 ? "#fff" : Q.accent,
                      border: i === 0 ? "none" : `1px solid ${Q.accent}`,
                    }}>{a}</button>
                  ))}
                </div>
              )}
            </div>
            <DecisionTrail trail={item.trail} reasoning={item.reasoning} askPrompt={item.askPrompt} onAsk={(p) => {}} />
          </div>
        ),
      },
    });
  };

  const openCollector = (c) => {
    setPanel({
      open: true,
      content: { title: c.name, body: <CollectorPanel collector={c} /> },
    });
  };

  const openAsk = (prompt) => {
    setPanel({
      open: true,
      content: {
        title: "Ask questt.",
        body: (
          <div style={{ padding: 20 }}>
            <div style={{ padding: "12px 14px", borderRadius: "8px 8px 2px 8px", background: Q.accentLight, border: `1px solid ${Q.accent}20`, marginBottom: 12 }}>
              <Mono size={9} color={Q.accent} style={{ display: "block", marginBottom: 4 }}>You</Mono>
              <p style={{ fontFamily: f.body, fontSize: 13, color: Q.text, margin: 0 }}>{prompt}</p>
            </div>
            <div style={{ padding: "12px 14px", borderRadius: "2px 8px 8px 8px", background: Q.bg, border: `1px solid ${Q.border}` }}>
              <Mono size={9} color={Q.accent} style={{ display: "block", marginBottom: 4 }}>questt.</Mono>
              <p style={{ fontFamily: f.body, fontSize: 13, color: Q.text, margin: 0, lineHeight: 1.6 }}>Looking into that — traversing the relevant BKG path and pulling live data from the warehouse. In production, you'd see a grounded, data-backed response with the full reasoning chain here.</p>
            </div>
          </div>
        ),
      },
    });
  };

  return (
    <div className="overflow-auto" style={{ background: Q.bg, height: "100vh", fontFamily: f.body }}>
      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "10px 28px", borderBottom: `1px solid ${Q.border}`, background: Q.card,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: f.body, fontWeight: 700, fontSize: 15, color: Q.accent, letterSpacing: -0.3 }}>questt<span style={{ fontSize: 18 }}>.</span></span>
          <span style={{ color: Q.border }}>|</span>
          <span style={{ fontFamily: f.body, fontSize: 13, color: Q.sub }}>Collections</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mono size={9}>Area Manager · NCR</Mono>
          <Tag color={Q.accent} hollow>Jio Financial Services</Tag>
          <button onClick={() => openAsk("What should I focus on today?")} style={{
            width: 28, height: 28, borderRadius: "50%", background: Q.accentLight,
            border: `1px solid ${Q.accent}30`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}><span style={{ fontFamily: f.body, fontWeight: 700, fontSize: 11, color: Q.accent }}>q.</span></button>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", background: Q.accentLight,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: f.mono, fontSize: 10, fontWeight: 600, color: Q.accent,
          }}>KM</div>
        </div>
      </nav>

      {/* Persona */}
      <div style={{ padding: "7px 28px", background: "#F5F3F0", borderBottom: `1px solid ${Q.border}`, display: "flex", alignItems: "center", gap: 10 }}>
        <Mono size={9} color={Q.accent}>Persona</Mono>
        <span style={{ fontFamily: f.body, fontSize: 12, fontWeight: 500, color: Q.text }}>Karan Mehta · Area Manager, Collections, NCR</span>
        <span style={{ color: Q.border }}>|</span>
        <span style={{ fontFamily: f.body, fontSize: 11, color: Q.muted }}>10 collectors · ~800 delinquent accounts · Reports to DGM Suresh Kumar</span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 28px 64px" }}>
        <TodaysBrief onAsk={openAsk} />
        <EscalationQueue onOpenTrail={openTrail} />
        <TeamWorkload onClickCollector={openCollector} />
        <ActionQueue onOpenTrail={openTrail} onAsk={openAsk} />
        <YesterdayResults onClickCollector={openCollector} />
      </div>

      <SidePanel open={panel.open} onClose={() => setPanel({ open: false, content: null })} content={panel.content} />
    </div>
  );
}
