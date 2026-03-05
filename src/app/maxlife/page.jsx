"use client";
import { useState } from "react";

const Q = {
  teal: "#1B6B5A",
  tealWash: "#EAF2EF",
  copper: "#B8734A",
  copperL: "#F5EDE6",
  ink: "#1A1A18",
  offWhite: "#FAFAF8",
  cream: "#F3F0EA",
  stone: "#E5E2DB",
  warmGray: "#A09D98",
  midGray: "#6B6965",
  deep: "#111A15",
  deepForest: "#1C2B24",
  blue: "#3B6EA5",
  blueL: "#EFF5FB",
  white: "#FFFFFF",
};

const trail = [
  {
    node: "D_LeadScoring",
    source: { label: "CRM NXT", bg: Q.blueL, color: Q.blue },
    accent: Q.deep,
    graph: "Scoring formula — w\u2081\u00b7IncomeFit + w\u2082\u00b7ChannelIntent + w\u2083\u00b7ProductGap + w\u2084\u00b7Recency. Threshold: >0.75 = auto-allocate.",
    data: "Lead record — \u20b918L income (HNI segment), Axis Bank branch referral (channel multiplier 1.5\u00d7), created 2 hours ago. Dedup check: passed.",
    result: "Score: 0.82 (Hot). Triggers D_LeadAllocation.",
  },
  {
    node: "Customer \u2192 Policy",
    source: { label: "Policy 360", bg: Q.copperL, color: Q.copper },
    accent: Q.copper,
    graph: "Relationship traversal — Customer HAS Policy. Coverage gap = product categories where no active policy exists.",
    data: "PAN lookup \u2192 existing customer. 2 term life plans active (\u20b915L + \u20b910L cover). No retirement plan, no health plan.",
    result: "Coverage gap: retirement (critical), health (moderate).",
  },
  {
    node: "M_ProductAffinity",
    source: null,
    accent: Q.teal,
    graph: "Affinity model — weights gap severity \u00d7 income-product fit \u00d7 life-stage alignment \u00d7 IRDAI suitability constraints. No external data needed.",
    data: null,
    result: "Retirement: 0.87, Health: 0.72, Term upsell: 0.34. IRDAI suitability: pass. Primary recommendation set.",
  },
  {
    node: "D_LeadAllocation",
    source: { label: "Vymo", bg: Q.tealWash, color: Q.teal },
    accent: Q.deep,
    graph: "Allocation rule — filter agents by Territory match \u2192 Specialization (top product) \u2192 Capacity > 0 slots. Rank by historical conversion rate \u00d7 geography proximity.",
    data: "8 agents in West Delhi zone. 3 have retirement specialization. Priya (RA-007): 3 open slots this week, 3.2\u00d7 avg conversion on retirement products, Thu 3 PM available.",
    result: "Assign to Priya (RA-007). Block calendar slot Thu 3 PM.",
  },
  {
    node: "D_SLAConstraint",
    source: null,
    accent: Q.teal,
    graph: "SLA rule — HNI leads must have first contact within 48 hours. Breach triggers D_Reallocation \u2192 reassign to next-best agent by conversion rate.",
    data: null,
    result: "48hr timer started. If no contact by Sat 3 PM \u2192 D_Reallocation fires automatically.",
  },
];

const execActions = [
  { svc: "Lead Service", action: "Assignment updated in MATRIX", icon: "\u2192" },
  { svc: "Comms Service", action: "WhatsApp meeting invite sent to lead", icon: "\u25c8" },
  { svc: "Calendar Service", action: "Thu 3 PM blocked in Priya's Outlook", icon: "\u25c9" },
  { svc: "SLA Monitor", action: "48hr contact timer started, watching", icon: "\u25ce" },
];

function TrailStep({ step, index }) {
  const [open, setOpen] = useState(index < 2);
  return (
    <div style={{ position: "relative" }}>
      {index > 0 && (
        <div style={{ width: 1, height: 16, background: Q.stone, marginLeft: 19 }} />
      )}
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: Q.white,
          border: `1px solid ${Q.stone}`,
          borderLeft: `3px solid ${step.accent}`,
          cursor: "pointer",
          transition: "box-shadow 0.15s",
          boxShadow: open ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", background: step.accent,
              color: Q.white, fontSize: 11, fontWeight: 700, display: "flex",
              alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif",
              flexShrink: 0,
            }}>
              {index + 1}
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700,
              color: Q.ink, letterSpacing: "-0.02em",
            }}>
              {step.node}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {step.source && (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600,
                color: step.source.color, background: step.source.bg,
                padding: "3px 10px", borderRadius: 3,
              }}>
                {step.source.label}
              </span>
            )}
            <span style={{ color: Q.warmGray, fontSize: 14, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.15s" }}>{"\u25be"}</span>
          </div>
        </div>

        {open && (
          <div style={{ padding: "0 16px 14px 48px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                color: Q.teal, background: Q.tealWash, padding: "2px 6px", borderRadius: 2,
                flexShrink: 0, marginTop: 1,
              }}>GRAPH</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: Q.teal, lineHeight: 1.5 }}>
                {step.graph}
              </span>
            </div>
            {step.data && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                  color: Q.blue, background: Q.blueL, padding: "2px 6px", borderRadius: 2,
                  flexShrink: 0, marginTop: 1,
                }}>DATA</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: Q.blue, lineHeight: 1.5 }}>
                  {step.data}
                </span>
              </div>
            )}
            <div style={{
              display: "flex", gap: 8, alignItems: "flex-start",
              background: Q.cream, padding: "6px 8px", borderRadius: 3, marginTop: 2,
            }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: Q.ink, lineHeight: 1.5 }}>
                {"\u2192"} {step.result}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ children, bg, color }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
      color, background: bg, padding: "3px 10px", borderRadius: 3,
      letterSpacing: "0.04em",
    }}>
      {children}
    </span>
  );
}

export default function WorkflowView() {
  const [mode, setMode] = useState("deterministic");
  const isAgentic = mode === "agentic";

  return (
    <div className="overflow-auto" style={{ background: Q.offWhite, height: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
            <h1 style={{
              fontFamily: "'DM Serif Display', serif", fontSize: 36, color: Q.ink,
              margin: 0, fontWeight: 400,
            }}>
              {isAgentic ? "Agentic Workflow" : "Deterministic Workflow"}
            </h1>
            {isAgentic ? (
              <Badge bg={Q.copperL} color={Q.copper}>LLM AT SYNTHESIS</Badge>
            ) : (
              <Badge bg={Q.tealWash} color={Q.teal}>NO LLM — IW EXECUTION, NO LLM</Badge>
            )}
          </div>
          <p style={{ fontSize: 14, color: Q.warmGray, margin: 0 }}>
            {isAgentic
              ? "Human-triggered via Cortex \u00b7 Same trail, same agent \u00b7 + LLM parses intent & synthesises response"
              : "Event-triggered \u00b7 Single node called \u00b7 Downstream execution cascades \u00b7 No LLM calls anywhere"
            }
          </p>
        </div>

        <div style={{
          display: "flex", gap: 0, marginBottom: 32,
          border: `1px solid ${Q.stone}`, borderRadius: 6, overflow: "hidden", width: "fit-content",
        }}>
          {["deterministic", "agentic"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "10px 24px", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
              background: mode === m ? Q.deep : Q.white,
              color: mode === m ? Q.white : Q.midGray,
              transition: "all 0.15s",
            }}>
              {m === "deterministic" ? "Deterministic" : "Agentic"}
            </button>
          ))}
        </div>

        {!isAgentic && (
          <div style={{
            background: Q.tealWash, border: `1px solid ${Q.teal}`, borderLeft: `3px solid ${Q.teal}`,
            padding: "12px 16px", marginBottom: 24, borderRadius: "0 4px 4px 0",
          }}>
            <div style={{ fontSize: 13, color: Q.teal, fontWeight: 600, marginBottom: 4 }}>
              IW execution — no LLM call made
            </div>
            <div style={{ fontSize: 12, color: Q.midGray, lineHeight: 1.5 }}>
              The event triggers a single decision node in the graph (D_LeadScoring). That node executes its formula, and its output cascades through downstream nodes — allocation, SLA, execution — automatically. No LLM is called at any point. Each node is a deterministic program: read the graph rule, fetch data from the source system, compute, pass the result forward.
            </div>
          </div>
        )}
        {isAgentic && (
          <div style={{
            background: Q.copperL, border: `1px solid ${Q.copper}`, borderLeft: `3px solid ${Q.copper}`,
            padding: "12px 16px", marginBottom: 24, borderRadius: "0 4px 4px 0",
          }}>
            <div style={{ fontSize: 13, color: Q.copper, fontWeight: 600, marginBottom: 4 }}>
              Same IW trail + LLM at two points only
            </div>
            <div style={{ fontSize: 12, color: Q.midGray, lineHeight: 1.5 }}>
              LLM is used twice: (1) to parse the agent's natural language query into a structured intent the orchestrator can route, and (2) to synthesise the structured trail results into a conversational response. The decision trail itself is identical — pure graph traversal.
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: Q.warmGray, letterSpacing: "0.12em", marginBottom: 10 }}>TRIGGER</div>
          {isAgentic ? (
            <div style={{ background: Q.white, border: `1px solid ${Q.stone}`, overflow: "hidden", maxWidth: 480 }}>
              <div style={{ background: Q.deep, padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: Q.white }}>Cortex</span>
                <span style={{ fontSize: 12, color: Q.warmGray }}>Priya \u00b7 RA \u00b7 West Delhi</span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 15, color: Q.ink, fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>
                  "Which of my leads should I prioritize for retirement plans this week?"
                </p>
              </div>
            </div>
          ) : (
            <div style={{ background: Q.deep, padding: "16px 20px", maxWidth: 480 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: Q.warmGray, letterSpacing: "0.08em", marginBottom: 6 }}>EVENT TRIGGER</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: Q.white, marginBottom: 4 }}>Kafka: lead.created</div>
              <div style={{ fontSize: 13, color: Q.warmGray }}>CDP {"\u2192"} Axis Bank branch referral pushed to MSK topic</div>
            </div>
          )}
        </div>

        <div style={{ width: 1, height: 20, background: Q.stone, marginLeft: 19 }} />

        {isAgentic && (
          <>
            <div style={{
              background: Q.copper, padding: "10px 20px", maxWidth: 480, marginBottom: 4,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: Q.white }}>LLM — Intent Parsing</div>
                <div style={{ fontSize: 12, color: Q.copperL }}>Natural language {"\u2192"} structured intent: "lead prioritization, retirement, this week"</div>
              </div>
              <Badge bg="rgba(255,255,255,0.15)" color={Q.white}>LLM CALL 1</Badge>
            </div>
            <div style={{ width: 1, height: 12, background: Q.stone, marginLeft: 19 }} />
          </>
        )}

        <div style={{ background: Q.deep, padding: "14px 20px", maxWidth: 480, marginBottom: 4 }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: Q.white, marginBottom: 2 }}>
            {isAgentic ? "Orchestration Agent" : "Orchestration Router"}
          </div>
          <div style={{ fontSize: 13, color: isAgentic ? Q.copperL : Q.warmGray }}>
            {isAgentic ? "Routes parsed intent \u2192 Lead Management Agent" : "Event type \u2192 entry node: D_LeadScoring. Downstream nodes cascade automatically."}
          </div>
          {!isAgentic && (
            <div style={{ fontSize: 11, color: Q.midGray, marginTop: 4, fontStyle: "italic" }}>No LLM — event type maps to a single BKG entry node via config</div>
          )}
        </div>

        <div style={{ width: 1, height: 20, background: Q.stone, marginLeft: 19 }} />
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: Q.warmGray, letterSpacing: "0.12em" }}>
              {isAgentic ? "SAME DECISION TRAIL \u2014 IW EXECUTION, NO LLM" : "CASCADING EXECUTION FROM SINGLE NODE \u2014 NO LLM"}
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, background: Q.teal, borderRadius: 1, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: Q.warmGray }}>Graph intelligence</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, background: Q.blue, borderRadius: 1, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: Q.warmGray }}>System data</span>
              </span>
            </div>
          </div>
          {trail.map((step, i) => (<TrailStep key={i} step={step} index={i} />))}
          <div style={{ marginTop: 8, padding: "6px 12px", background: Q.cream, borderRadius: 3, fontSize: 11, color: Q.midGray, fontStyle: "italic" }}>
            Event triggers D_LeadScoring {"\u2192"} output cascades through each downstream node automatically. Every step is a deterministic node-program. No LLM involvement.
          </div>
        </div>

        <div style={{ width: 1, height: 20, background: Q.stone, marginLeft: 19 }} />

        {isAgentic ? (
          <>
            <div style={{ background: Q.copper, padding: "14px 20px", marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: Q.white, marginBottom: 4 }}>LLM — Synthesis</div>
                <div style={{ fontSize: 13, color: Q.copperL }}>Structured trail results {"\u2192"} natural language prioritized answer for Priya</div>
              </div>
              <Badge bg="rgba(255,255,255,0.15)" color={Q.white}>LLM CALL 2</Badge>
            </div>
            <div style={{ width: 1, height: 16, background: Q.stone, marginLeft: 19 }} />
            <div style={{ background: Q.white, border: `2px solid ${Q.teal}`, maxWidth: 480, marginBottom: 16 }}>
              <div style={{ background: Q.teal, padding: "8px 16px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: Q.white }}>Cortex Response</span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 14, color: Q.ink, margin: "0 0 12px 0", lineHeight: 1.5 }}>12 HNI leads in West Delhi with no retirement coverage. Top 3:</p>
                {[
                  { name: "Vikram Mehta", detail: "Age 42 \u00b7 \u20b92.1Cr portfolio \u00b7 Affinity 0.91" },
                  { name: "Priya Saxena", detail: "Age 38 \u00b7 \u20b91.4Cr portfolio \u00b7 Affinity 0.87" },
                  { name: "Rajeev Gupta", detail: "Age 45 \u00b7 \u20b93.2Cr portfolio \u00b7 Affinity 0.84" },
                ].map((lead, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: Q.teal }}>{i + 1}. {lead.name}</div>
                    <div style={{ fontSize: 12, color: Q.midGray, marginLeft: 16 }}>{lead.detail}</div>
                  </div>
                ))}
                <div style={{ fontSize: 14, fontWeight: 600, color: Q.copper, fontStyle: "italic", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${Q.stone}` }}>
                  "Schedule meetings with all 3?"
                </div>
              </div>
            </div>
            <div style={{ background: Q.cream, border: `1px solid ${Q.stone}`, padding: "10px 16px", fontSize: 12, color: Q.warmGray, marginBottom: 32 }}>
              <span style={{ fontWeight: 600 }}>LangFuse Trace</span> {"\u00b7"} Full audit: BKG nodes traversed, sources queried, 2 LLM calls (intent + synthesis), latency
            </div>
          </>
        ) : (
          <>
            <div style={{ background: Q.deep, padding: "16px 20px", marginBottom: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: Q.warmGray, letterSpacing: "0.12em" }}>DIRECT EXECUTION ACROSS SYSTEMS</div>
                <Badge bg={Q.tealWash} color={Q.teal}>NO LLM</Badge>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {execActions.map((ea, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: i === 3 ? Q.copper : Q.teal, fontSize: 14, marginTop: 1 }}>{ea.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: Q.white, marginBottom: 2 }}>{ea.svc}</div>
                      <div style={{ fontSize: 12, color: Q.warmGray }}>{ea.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: Q.cream, border: `1px solid ${Q.stone}`, padding: "10px 16px", fontSize: 12, color: Q.warmGray, marginBottom: 32 }}>
              <span style={{ fontWeight: 600 }}>LangFuse Trace</span> {"\u00b7"} Graph traversal path, source system queries, execution results — no LLM calls to log
            </div>
          </>
        )}

        <div style={{ textAlign: "center", fontSize: 12, color: Q.warmGray, padding: "24px 0", borderTop: `1px solid ${Q.stone}` }}>
          {isAgentic
            ? "Same BKG \u00b7 Same sources \u00b7 Same trail \u00b7 + LLM at intent & synthesis only \u00b7 Human triggers execution \u00b7 IRDAI-auditable"
            : "No human in the loop \u00b7 No LLM anywhere \u00b7 Single node triggered \u2192 cascading execution \u00b7 Full trail in LangFuse"
          }
        </div>

        <div style={{ background: Q.white, border: `1px solid ${Q.stone}`, marginBottom: 32, overflow: "hidden" }}>
          <div style={{ background: Q.deep, padding: "10px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: Q.white, letterSpacing: "0.06em" }}>
            WHERE DOES THE LLM SIT?
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 12 }}>
            <div style={{ padding: "10px 14px", fontWeight: 700, color: Q.ink, borderBottom: `1px solid ${Q.stone}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>Stage</div>
            <div style={{ padding: "10px 14px", fontWeight: 700, color: Q.ink, borderBottom: `1px solid ${Q.stone}`, borderLeft: `1px solid ${Q.stone}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>Deterministic</div>
            <div style={{ padding: "10px 14px", fontWeight: 700, color: Q.ink, borderBottom: `1px solid ${Q.stone}`, borderLeft: `1px solid ${Q.stone}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>Agentic</div>
            {[
              ["Trigger", "Kafka event", "Cortex natural language"],
              ["Intent parsing", "Config table lookup", "LLM parses intent"],
              ["Orchestration", "Maps to entry node", "Deterministic router"],
              ["Decision trail", "Single node \u2192 cascade", "Same IW graph traversal"],
              ["Data fetching", "Live source queries", "Same live source queries"],
              ["Execution", "Automatic, no human", "Human confirms, then same"],
              ["Synthesis", "Not needed (structured)", "LLM \u2192 natural language"],
            ].map(([stage, trad, agent], i) => (
              <div key={i} style={{ display: "contents" }}>
                <div style={{ padding: "8px 14px", color: Q.ink, fontWeight: 500, borderBottom: `1px solid ${Q.stone}`, background: i % 2 === 0 ? Q.offWhite : Q.white }}>{stage}</div>
                <div style={{ padding: "8px 14px", color: Q.teal, borderBottom: `1px solid ${Q.stone}`, borderLeft: `1px solid ${Q.stone}`, background: i % 2 === 0 ? Q.offWhite : Q.white }}>{trad}</div>
                <div style={{ padding: "8px 14px", color: stage === "Intent parsing" || stage === "Synthesis" ? Q.copper : Q.teal, fontWeight: stage === "Intent parsing" || stage === "Synthesis" ? 600 : 400, borderBottom: `1px solid ${Q.stone}`, borderLeft: `1px solid ${Q.stone}`, background: i % 2 === 0 ? Q.offWhite : Q.white }}>{agent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
