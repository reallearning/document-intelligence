"use client"
import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@600&display=swap');

  :root {
    --bg: #f4f6fa;
    --surface: #ffffff;
    --surface2: #f0f2f7;
    --border: rgba(0,0,0,0.08);
    --accent: #2d6ef0;
    --accent2: #6c3ef7;
    --green: #16a660;
    --red: #dc2626;
    --yellow: #d97706;
    --text: #111827;
    --muted: #6b7280;
    --card-radius: 14px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .cm-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    height: 100vh;
    overflow: auto;
    display: flex;
  }

  .cm-sidebar {
    width: 220px; flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 28px 0;
    display: flex; flex-direction: column;
    position: sticky; top: 0; height: 100vh;
  }
  .cm-logo {
    padding: 0 24px 28px;
    font-family: 'Playfair Display', serif;
    font-size: 18px; letter-spacing: 0.5px; color: var(--text);
    border-bottom: 1px solid var(--border);
  }
  .cm-logo span { color: var(--accent); }
  .cm-nav { padding: 20px 12px; flex: 1; }
  .cm-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 13.5px; color: var(--muted);
    cursor: pointer; transition: all 0.15s;
    margin-bottom: 2px; border: none; background: none; width: 100%; text-align: left;
  }
  .cm-nav-item:hover { background: var(--surface2); color: var(--text); }
  .cm-nav-item.active { background: rgba(45,110,240,0.1); color: var(--accent); }
  .cm-sidebar-user {
    padding: 16px 20px; border-top: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .cm-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 600; color: #fff; flex-shrink: 0;
  }
  .cm-user-name { font-size: 13px; font-weight: 500; }
  .cm-user-role { font-size: 11px; color: var(--muted); }

  .cm-main { flex: 1; overflow-y: auto; }
  .cm-topbar {
    padding: 20px 36px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--surface); position: sticky; top: 0; z-index: 10;
  }
  .cm-page-title { font-size: 17px; font-weight: 600; }
  .cm-topbar-right { display: flex; align-items: center; gap: 12px; }
  .cm-badge {
    background: var(--accent); color: #fff;
    font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px;
  }
  .cm-content { padding: 32px 36px; }

  .cm-section-label {
    font-size: 11px; text-transform: uppercase;
    letter-spacing: 1.5px; color: var(--muted); margin-bottom: 14px;
  }
  .cm-ai-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 40px; }
  .cm-ai-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--card-radius); padding: 22px;
    position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
  }
  .cm-ai-card:hover { border-color: rgba(45,110,240,0.3); transform: translateY(-1px); }
  .cm-ai-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .cm-ai-card-bar.risk { background: linear-gradient(90deg, var(--red), #f7894f); }
  .cm-ai-card-bar.renewal { background: linear-gradient(90deg, var(--yellow), #f7d94f); }
  .cm-ai-card-bar.revenue { background: linear-gradient(90deg, var(--green), #4ff7c9); }
  .cm-ai-tag {
    font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px;
    font-weight: 600; margin-bottom: 10px;
    display: inline-flex; align-items: center; gap: 5px;
  }
  .cm-ai-tag.risk { color: var(--red); }
  .cm-ai-tag.renewal { color: var(--yellow); }
  .cm-ai-tag.revenue { color: var(--green); }
  .cm-ai-card h3 { font-size: 14.5px; font-weight: 600; margin-bottom: 8px; line-height: 1.4; }
  .cm-ai-card p { font-size: 12.5px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
  .cm-chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .cm-chip {
    font-size: 11px; padding: 3px 10px; border-radius: 20px;
    background: var(--surface2); color: var(--text); border: 1px solid var(--border);
  }
  .cm-chip.red { background: rgba(220,38,38,0.08); border-color: rgba(220,38,38,0.25); color: var(--red); }
  .cm-chip.yellow { background: rgba(217,119,6,0.08); border-color: rgba(217,119,6,0.25); color: var(--yellow); }
  .cm-chip.green { background: rgba(22,166,96,0.08); border-color: rgba(22,166,96,0.25); color: var(--green); }
  .cm-ai-btn {
    width: 100%; padding: 9px; border-radius: 8px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.15s;
  }
  .cm-ai-btn.risk { background: rgba(220,38,38,0.1); color: var(--red); }
  .cm-ai-btn.risk:hover { background: rgba(220,38,38,0.18); }
  .cm-ai-btn.renewal { background: rgba(217,119,6,0.1); color: var(--yellow); }
  .cm-ai-btn.renewal:hover { background: rgba(217,119,6,0.18); }
  .cm-ai-btn.revenue { background: rgba(22,166,96,0.1); color: var(--green); }
  .cm-ai-btn.revenue:hover { background: rgba(22,166,96,0.18); }

  .cm-table-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--card-radius); }
  .cm-table-header {
    padding: 18px 24px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .cm-table-title { font-size: 15px; font-weight: 600; }
  .cm-table-actions { display: flex; gap: 8px; }
  .cm-tbl-btn {
    font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 6px 14px;
    border-radius: 7px; cursor: pointer; border: 1px solid var(--border);
    background: var(--surface2); color: var(--text); transition: all 0.15s;
  }
  .cm-tbl-btn:hover { border-color: var(--accent); color: var(--accent); }
  .cm-tbl-btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .cm-tbl-btn.active-page { background: rgba(45,110,240,0.1); color: var(--accent); border-color: rgba(45,110,240,0.3); }
  .cm-filter-tabs { display: flex; padding: 14px 24px; border-bottom: 1px solid var(--border); }
  .cm-ftab {
    font-size: 13px; padding: 5px 14px; cursor: pointer;
    border-radius: 6px; color: var(--muted); transition: all 0.15s; border: none; background: none;
  }
  .cm-ftab.active { background: rgba(45,110,240,0.1); color: var(--accent); }
  .cm-table { width: 100%; border-collapse: collapse; }
  .cm-table th {
    text-align: left; padding: 11px 20px; font-size: 11.5px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.8px; color: var(--muted); border-bottom: 1px solid var(--border);
  }
  .cm-table td { padding: 14px 20px; font-size: 13.5px; border-bottom: 1px solid var(--border); }
  .cm-table tr:last-child td { border-bottom: none; }
  .cm-table tr:hover td { background: rgba(0,0,0,0.015); }
  .cm-contract-name { font-weight: 500; color: var(--text); }
  .cm-party { color: var(--muted); }
  .cm-source-badge {
    font-size: 11px; padding: 2px 8px; border-radius: 4px;
    background: var(--surface2); color: var(--muted); border: 1px solid var(--border);
  }
  .cm-value { font-family: 'DM Mono', monospace; font-size: 13px; }
  .cm-date { color: var(--muted); font-size: 12.5px; }
  .cm-status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; white-space: nowrap; }
  .cm-status-active { background: rgba(22,166,96,0.1); color: var(--green); border: 1px solid rgba(22,166,96,0.25); }
  .cm-status-risk { background: rgba(220,38,38,0.1); color: var(--red); border: 1px solid rgba(220,38,38,0.25); }
  .cm-status-renewal { background: rgba(217,119,6,0.1); color: var(--yellow); border: 1px solid rgba(217,119,6,0.25); }
  .cm-status-new { background: rgba(45,110,240,0.1); color: var(--accent); border: 1px solid rgba(45,110,240,0.25); }
  .cm-risk-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; }
  .cm-risk-low { background: rgba(22,166,96,0.1); color: var(--green); }
  .cm-risk-high { background: rgba(220,38,38,0.1); color: var(--red); }
  .cm-risk-med { background: rgba(217,119,6,0.1); color: var(--yellow); }
  .cm-action-btn {
    font-size: 12px; padding: 4px 12px; border-radius: 6px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.15s;
    border: 1px solid var(--border); background: transparent; color: var(--accent);
  }
  .cm-action-btn:hover { background: rgba(45,110,240,0.08); border-color: var(--accent); }
  .cm-action-btn.edit { color: var(--muted); }
  .cm-action-btn.edit:hover { color: var(--text); background: var(--surface2); }

  .cm-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    z-index: 100; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px); animation: cmFadeIn 0.2s ease;
  }
  @keyframes cmFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes cmSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .cm-modal {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    width: 640px; max-width: 95vw; max-height: 88vh; overflow-y: auto;
    animation: cmSlideUp 0.25s ease;
  }
  .cm-modal-header {
    padding: 22px 26px 18px; border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; justify-content: space-between;
  }
  .cm-modal-title { font-size: 16px; font-weight: 600; }
  .cm-modal-sub { font-size: 12px; color: var(--muted); margin-top: 3px; }
  .cm-close-btn {
    background: none; border: none; color: var(--muted);
    font-size: 20px; cursor: pointer; padding: 2px; line-height: 1; transition: color 0.15s;
  }
  .cm-close-btn:hover { color: var(--text); }
  .cm-modal-body { padding: 22px 26px; }
  .cm-compliance-item {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px; margin-bottom: 12px;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .cm-compliance-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .cm-compliance-icon.red { background: rgba(220,38,38,0.12); }
  .cm-compliance-icon.yellow { background: rgba(217,119,6,0.12); }
  .cm-compliance-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .cm-compliance-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
  .cm-compliance-meta { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .cm-modal-footer {
    padding: 16px 26px; border-top: 1px solid var(--border);
    display: flex; gap: 10px; justify-content: flex-end;
  }
  .cm-btn-primary {
    background: var(--accent); color: #fff; border: none; padding: 9px 20px; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  }
  .cm-btn-primary:hover { background: #1e5ed4; }
  .cm-btn-ghost {
    background: transparent; color: var(--muted); border: 1px solid var(--border);
    padding: 9px 20px; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; cursor: pointer; transition: all 0.15s;
  }
  .cm-btn-ghost:hover { color: var(--text); border-color: rgba(0,0,0,0.2); }

  .cm-doc-modal {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    width: 900px; max-width: 95vw; max-height: 92vh;
    display: flex; flex-direction: column; animation: cmSlideUp 0.25s ease;
  }
  .cm-doc-modal-header {
    padding: 18px 26px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
  }
  .cm-doc-info { display: flex; align-items: center; gap: 12px; }
  .cm-doc-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(45,110,240,0.1); border: 1px solid rgba(45,110,240,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 18px;
  }
  .cm-doc-title { font-size: 15px; font-weight: 600; }
  .cm-doc-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .cm-doc-body { display: flex; flex: 1; overflow: hidden; }
  .cm-doc-content { flex: 1; overflow-y: auto; padding: 28px 32px; line-height: 1.8; font-size: 13.5px; }
  .cm-doc-sidebar { width: 260px; flex-shrink: 0; border-left: 1px solid var(--border); overflow-y: auto; padding: 20px; }
  .cm-doc-sidebar h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 14px; }
  .cm-risk-item {
    background: var(--surface2); border-radius: 8px; padding: 12px;
    margin-bottom: 10px; border-left: 3px solid transparent;
    cursor: pointer; transition: all 0.15s;
  }
  .cm-risk-item:hover { background: rgba(0,0,0,0.03); }
  .cm-risk-item.green { border-color: var(--green); }
  .cm-risk-item.red { border-color: var(--red); }
  .cm-risk-item.yellow { border-color: var(--yellow); }
  .cm-risk-item-title { font-size: 12.5px; font-weight: 600; margin-bottom: 3px; }
  .cm-risk-item-desc { font-size: 11.5px; color: var(--muted); line-height: 1.4; }
  .cm-risk-item-badge { font-size: 10px; margin-top: 6px; display: inline-block; padding: 2px 8px; border-radius: 20px; font-weight: 600; }
  .cm-risk-item.green .cm-risk-item-badge { background: rgba(22,166,96,0.1); color: var(--green); }
  .cm-risk-item.red .cm-risk-item-badge { background: rgba(220,38,38,0.1); color: var(--red); }
  .cm-risk-item.yellow .cm-risk-item-badge { background: rgba(217,119,6,0.1); color: var(--yellow); }
  .cm-risk-summary-bar {
    padding: 14px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 14px;
    background: var(--surface2); flex-shrink: 0;
  }
  .cm-rsum-label { font-size: 12px; color: var(--muted); }
  .cm-rsum-val { font-size: 13px; font-weight: 600; }
  .cm-rsum-item { display: flex; align-items: center; gap: 6px; }
  .cm-rsum-dot { width: 8px; height: 8px; border-radius: 50%; }
  .cm-clause-tag {
    display: inline-block; font-size: 10px; font-weight: 600;
    padding: 1px 6px; border-radius: 4px; margin-left: 4px; vertical-align: middle;
  }
  .cm-clause-tag.ok { background: rgba(22,166,96,0.12); color: var(--green); border: 1px solid rgba(22,166,96,0.3); }
  .cm-clause-tag.flag { background: rgba(220,38,38,0.12); color: var(--red); border: 1px solid rgba(220,38,38,0.3); }
  .cm-clause-tag.warn { background: rgba(217,119,6,0.12); color: var(--yellow); border: 1px solid rgba(217,119,6,0.3); }
  .cm-hl-green { background: rgba(22,166,96,0.1); border-bottom: 2px solid var(--green); border-radius: 2px; padding: 1px 2px; }
  .cm-hl-red { background: rgba(220,38,38,0.1); border-bottom: 2px solid var(--red); border-radius: 2px; padding: 1px 2px; }
  .cm-hl-yellow { background: rgba(217,119,6,0.1); border-bottom: 2px solid var(--yellow); border-radius: 2px; padding: 1px 2px; }
  .cm-doc-section { margin-bottom: 22px; }
  .cm-doc-section h3 { font-size: 14px; font-weight: 700; margin-bottom: 8px; color: var(--text); padding-bottom: 6px; border-bottom: 1px solid var(--border); }
  .cm-doc-section p { font-size: 13px; color: #374151; line-height: 1.8; margin-bottom: 8px; }
  .cm-summary-box { margin-top: 20px; padding: 14px 16px; border-radius: 10px; }
  .cm-summary-box.green { background: rgba(22,166,96,0.07); border: 1px solid rgba(22,166,96,0.2); }
  .cm-summary-box.red { background: rgba(220,38,38,0.07); border: 1px solid rgba(220,38,38,0.2); }
  .cm-summary-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
  .cm-score-box { margin-top: 16px; padding: 12px; border-radius: 8px; }
  .cm-score-box.green { background: rgba(22,166,96,0.07); border: 1px solid rgba(22,166,96,0.2); }
  .cm-score-box.red { background: rgba(220,38,38,0.07); border: 1px solid rgba(220,38,38,0.2); }
`;

const ClauseTag = ({ type, children }) => (
  <span className={`cm-clause-tag ${type}`}>{children}</span>
);

const RiskItem = ({ color, title, desc, badge }) => (
  <div className={`cm-risk-item ${color}`}>
    <div className="cm-risk-item-title">{title}</div>
    <div className="cm-risk-item-desc">{desc}</div>
    <span className="cm-risk-item-badge">{badge}</span>
  </div>
);

const ComplianceModal = ({ onClose, onOpenDpa }) => (
  <div className="cm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="cm-modal">
      <div className="cm-modal-header">
        <div>
          <div className="cm-modal-title">⚠ Compliance Review Required</div>
          <div className="cm-modal-sub">3 contracts flagged by AI — data protection clause misalignment detected</div>
        </div>
        <button className="cm-close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="cm-modal-body">
        <div className="cm-compliance-item">
          <div className="cm-compliance-icon red">🔴</div>
          <div style={{ flex: 1 }}>
            <div className="cm-compliance-name">DataTech Solutions — Data Processing Agreement</div>
            <div className="cm-compliance-desc">GDPR Article 28 conflict: Sub-processor clause lacks adequate safeguards. Data transfer provisions reference outdated Standard Contractual Clauses (SCCs) pre-2021 revision. Liability cap of 1× annual fees may be insufficient under GDPR enforcement standards.</div>
            <div className="cm-compliance-meta">
              <span className="cm-chip red">GDPR Conflict</span>
              <span className="cm-chip red">High Risk</span>
              <span className="cm-chip">Clause 7.3, 12.1</span>
            </div>
          </div>
          <button className="cm-action-btn" onClick={() => { onClose(); onOpenDpa(); }} style={{ flexShrink: 0, marginLeft: 8 }}>View →</button>
        </div>
        <div className="cm-compliance-item">
          <div className="cm-compliance-icon yellow">🟡</div>
          <div style={{ flex: 1 }}>
            <div className="cm-compliance-name">GlobeTech Systems — Service Agreement</div>
            <div className="cm-compliance-desc">Data retention clause specifies 7-year retention which exceeds GDPR minimization requirements. Incident notification window of 96 hours exceeds the mandated 72-hour breach notification requirement.</div>
            <div className="cm-compliance-meta">
              <span className="cm-chip yellow">GDPR Warning</span>
              <span className="cm-chip yellow">Medium Risk</span>
              <span className="cm-chip">Clause 9.2</span>
            </div>
          </div>
          <button className="cm-action-btn" style={{ flexShrink: 0, marginLeft: 8, opacity: 0.4 }} disabled>View →</button>
        </div>
        <div className="cm-compliance-item">
          <div className="cm-compliance-icon yellow">🟡</div>
          <div style={{ flex: 1 }}>
            <div className="cm-compliance-name">FirstData Inc. — Master Services Agreement</div>
            <div className="cm-compliance-desc">Intellectual property assignment clause is ambiguous regarding AI-generated deliverables. Does not explicitly address data sovereignty requirements for cross-border processing.</div>
            <div className="cm-compliance-meta">
              <span className="cm-chip yellow">IP Risk</span>
              <span className="cm-chip">Medium Risk</span>
              <span className="cm-chip">Clause 14.5</span>
            </div>
          </div>
          <button className="cm-action-btn" style={{ flexShrink: 0, marginLeft: 8, opacity: 0.4 }} disabled>View →</button>
        </div>
      </div>
      <div className="cm-modal-footer">
        <button className="cm-btn-ghost" onClick={onClose}>Close</button>
        <button className="cm-btn-primary" onClick={() => { onClose(); onOpenDpa(); }}>Review DataTech DPA →</button>
      </div>
    </div>
  </div>
);

const SaasModal = ({ onClose }) => (
  <div className="cm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="cm-doc-modal">
      <div className="cm-doc-modal-header">
        <div className="cm-doc-info">
          <div className="cm-doc-icon">📋</div>
          <div>
            <div className="cm-doc-title">Enterprise SaaS Agreement — Microsoft Corporation</div>
            <div className="cm-doc-meta">DocuSign · $245,000 · Jan 15 2025 – Jan 14 2026 · Executed</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="cm-status-badge cm-status-active">Active</span>
          <span className="cm-risk-badge cm-risk-low" style={{ fontSize: 12 }}>● Low Risk</span>
          <button className="cm-close-btn" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="cm-risk-summary-bar">
        <span className="cm-rsum-label">AI Risk Analysis:</span>
        <div className="cm-rsum-item"><span className="cm-rsum-dot" style={{ background: 'var(--green)' }} /><span className="cm-rsum-val" style={{ color: 'var(--green)' }}>8 Compliant</span></div>
        <div className="cm-rsum-item"><span className="cm-rsum-dot" style={{ background: 'var(--yellow)' }} /><span className="cm-rsum-val" style={{ color: 'var(--yellow)' }}>1 Note</span></div>
        <div className="cm-rsum-item"><span className="cm-rsum-dot" style={{ background: 'var(--red)' }} /><span className="cm-rsum-val" style={{ color: 'var(--red)' }}>0 Flags</span></div>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>Overall: <strong style={{ color: 'var(--green)' }}>Low Risk — Approved</strong></span>
      </div>
      <div className="cm-doc-body">
        <div className="cm-doc-content">
          <div className="cm-doc-section">
            <h3>ENTERPRISE SOFTWARE AS A SERVICE AGREEMENT</h3>
            <p><strong>Agreement Date:</strong> January 15, 2025<br /><strong>Parties:</strong> Vista Smart Technologies Inc. ("Customer") and Microsoft Corporation ("Provider")<br /><strong>Agreement Number:</strong> MS-VST-2025-0115</p>
          </div>
          <div className="cm-doc-section">
            <h3>1. Definitions and Scope <ClauseTag type="ok">✓ Aligned</ClauseTag></h3>
            <p>"<span className="cm-hl-green">Services</span>" means the cloud-based software services described in Exhibit A, including Microsoft 365, Azure Active Directory, and associated enterprise productivity tools made available by Provider to Customer on a subscription basis.</p>
            <p>"<span className="cm-hl-green">Authorized Users</span>" means Customer's employees, contractors, and agents who are permitted to access the Services under this Agreement, not to exceed the licensed seat count specified in the applicable Order Form.</p>
            <p>The scope of this Agreement covers <span className="cm-hl-green">enterprise-wide deployment across all Customer subsidiaries and affiliates</span>, subject to the geographic restrictions outlined in Section 6.2.</p>
          </div>
          <div className="cm-doc-section">
            <h3>2. Subscription Terms &amp; Licensing <ClauseTag type="ok">✓ Aligned</ClauseTag></h3>
            <p>Provider grants Customer a <span className="cm-hl-green">non-exclusive, non-transferable, limited license</span> to access and use the Services during the Subscription Term solely for Customer's internal business operations. The subscription includes 500 E3 enterprise licenses.</p>
            <p><span className="cm-hl-green">Subscription fees are fixed for the initial term and shall not increase by more than 5% upon renewal</span>, consistent with our vendor contract guidelines requiring price stability clauses for multi-year agreements.</p>
          </div>
          <div className="cm-doc-section">
            <h3>3. Service Level Agreement <ClauseTag type="ok">✓ Aligned</ClauseTag></h3>
            <p>Provider guarantees a <span className="cm-hl-green">monthly uptime of 99.9%</span> for all core Services, excluding scheduled maintenance windows communicated at least 48 hours in advance. This meets our internal threshold of 99.5% minimum SLA for business-critical applications.</p>
            <p>In the event of SLA breach, Customer is entitled to <span className="cm-hl-green">service credits of 10% of monthly fees per 0.1% below the SLA threshold</span>, up to a maximum of 30% of monthly fees in any calendar month.</p>
          </div>
          <div className="cm-doc-section">
            <h3>4. Data Privacy &amp; Security <ClauseTag type="ok">✓ Compliant</ClauseTag></h3>
            <p>Provider shall process Customer Data solely in accordance with <span className="cm-hl-green">Customer's documented instructions and applicable data protection laws</span>, including GDPR, CCPA, and all applicable regional privacy regulations.</p>
            <p><span className="cm-hl-green">Customer Data shall be stored exclusively within EU data centers</span>, with no unauthorized cross-border transfers. This is fully compliant with our data sovereignty policy.</p>
            <p>Provider maintains <span className="cm-hl-green">ISO 27001, SOC 2 Type II, and FedRAMP certifications</span>, meeting our minimum security certification requirements for Tier-1 vendors handling PII.</p>
          </div>
          <div className="cm-doc-section">
            <h3>5. Intellectual Property <ClauseTag type="ok">✓ Aligned</ClauseTag></h3>
            <p>All <span className="cm-hl-green">Customer Data and derived outputs remain the exclusive intellectual property of Customer</span>. Provider acquires no rights to Customer Data except as necessary to provide the Services. This clause explicitly covers AI-generated content and model outputs produced using Customer Data.</p>
          </div>
          <div className="cm-doc-section">
            <h3>6. Liability &amp; Indemnification <ClauseTag type="warn">⚠ Note</ClauseTag></h3>
            <p>Each party's total liability under this Agreement is limited to <span className="cm-hl-yellow">the greater of $500,000 or the fees paid in the 12 months preceding the claim</span>. Our legal team notes this should be reviewed at renewal to ensure alignment with the contract's expanded scope.</p>
            <p>Provider shall indemnify Customer against third-party IP infringement claims arising from Customer's authorized use of the Services, with standard carve-outs for Customer modifications.</p>
          </div>
          <div className="cm-doc-section">
            <h3>7. Term &amp; Termination <ClauseTag type="ok">✓ Aligned</ClauseTag></h3>
            <p>This Agreement commences January 15, 2025 and continues for a <span className="cm-hl-green">12-month initial term</span>, automatically renewing for successive 12-month periods unless either party provides 90 days' written notice of non-renewal.</p>
            <p>Either party may terminate for material breach with <span className="cm-hl-green">30 days' written notice and opportunity to cure</span>. Upon termination, Provider shall return or destroy all Customer Data within 30 days.</p>
          </div>
          <div className="cm-doc-section">
            <h3>8. Governing Law <ClauseTag type="ok">✓ Aligned</ClauseTag></h3>
            <p>This Agreement shall be governed by the <span className="cm-hl-green">laws of the State of Washington, USA</span>, with disputes subject to binding arbitration in Seattle, WA. The governing law clause is consistent with our approved vendor contract template.</p>
          </div>
          <div className="cm-summary-box green">
            <div className="cm-summary-title" style={{ color: 'var(--green)' }}>✓ AI Compliance Summary — Low Risk</div>
            <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.6 }}>This agreement is broadly compliant with Vista Smart's vendor contract policy. 8 of 9 reviewed clauses meet or exceed internal standards. One note on the liability cap is flagged for review at renewal. No GDPR, IP, or security conflicts detected. <strong>Recommendation: Maintain Active status.</strong></div>
          </div>
        </div>
        <div className="cm-doc-sidebar">
          <h4>Clause Analysis</h4>
          <RiskItem color="green" title="§1 Scope & Definitions" desc="Clear enterprise scope, aligned with procurement policy" badge="Compliant" />
          <RiskItem color="green" title="§2 Subscription Licensing" desc="Price cap clause included — meets vendor guidelines" badge="Compliant" />
          <RiskItem color="green" title="§3 SLA (99.9% Uptime)" desc="Exceeds our 99.5% minimum SLA threshold" badge="Compliant" />
          <RiskItem color="green" title="§4 Data Privacy" desc="GDPR-compliant DPA, EU data residency confirmed" badge="Compliant" />
          <RiskItem color="green" title="§4 Security Certifications" desc="ISO 27001, SOC 2 Type II, FedRAMP — all met" badge="Compliant" />
          <RiskItem color="green" title="§5 Intellectual Property" desc="Customer retains full IP including AI outputs" badge="Compliant" />
          <RiskItem color="yellow" title="§6 Liability Cap" desc="$500K cap — review at renewal given expanded scope" badge="Note" />
          <RiskItem color="green" title="§7 Termination Rights" desc="90-day auto-renewal notice — exceeds 60-day minimum policy" badge="Compliant" />
          <RiskItem color="green" title="§8 Governing Law" desc="Consistent with approved vendor contract template" badge="Compliant" />
          <div className="cm-score-box green">
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>OVERALL RISK SCORE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green)' }}>LOW</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>8 compliant · 1 advisory</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DpaModal = ({ onClose }) => (
  <div className="cm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="cm-doc-modal">
      <div className="cm-doc-modal-header">
        <div className="cm-doc-info">
          <div className="cm-doc-icon" style={{ background: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.2)' }}>⚠️</div>
          <div>
            <div className="cm-doc-title">Data Processing Agreement — DataTech Solutions</div>
            <div className="cm-doc-meta">Salesforce · $87,500 · Mar 05 2025 – Mar 04 2026 · Active</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="cm-status-badge cm-status-risk">Compliance Risk</span>
          <span className="cm-risk-badge cm-risk-high" style={{ fontSize: 12 }}>● High Risk</span>
          <button className="cm-close-btn" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="cm-risk-summary-bar" style={{ background: 'rgba(220,38,38,0.04)' }}>
        <span className="cm-rsum-label">AI Risk Analysis:</span>
        <div className="cm-rsum-item"><span className="cm-rsum-dot" style={{ background: 'var(--green)' }} /><span className="cm-rsum-val" style={{ color: 'var(--green)' }}>2 Compliant</span></div>
        <div className="cm-rsum-item"><span className="cm-rsum-dot" style={{ background: 'var(--yellow)' }} /><span className="cm-rsum-val" style={{ color: 'var(--yellow)' }}>3 Warnings</span></div>
        <div className="cm-rsum-item"><span className="cm-rsum-dot" style={{ background: 'var(--red)' }} /><span className="cm-rsum-val" style={{ color: 'var(--red)' }}>4 Critical Flags</span></div>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>Overall: <strong style={{ color: 'var(--red)' }}>High Risk — Immediate Review Required</strong></span>
      </div>
      <div className="cm-doc-body">
        <div className="cm-doc-content">
          <div className="cm-doc-section">
            <h3>DATA PROCESSING AGREEMENT</h3>
            <p><strong>Agreement Date:</strong> March 5, 2025<br /><strong>Parties:</strong> Vista Smart Technologies Inc. ("Controller") and DataTech Solutions Ltd. ("Processor")<br /><strong>Agreement Number:</strong> DT-VST-2025-0305</p>
          </div>
          <div className="cm-doc-section">
            <h3>1. Scope of Processing <ClauseTag type="ok">✓ Compliant</ClauseTag></h3>
            <p>Processor shall process personal data on behalf of Controller for the purposes of <span className="cm-hl-green">providing analytics, reporting, and data enrichment services</span> as specified in Annex I. Processing activities are limited to those described herein and Controller's documented instructions.</p>
            <p><span className="cm-hl-green">Categories of data subjects include Controller's customers, employees, and prospective clients.</span> Personal data categories covered include contact information, behavioral analytics, and transactional data.</p>
          </div>
          <div className="cm-doc-section">
            <h3>2. Sub-Processors <ClauseTag type="flag">✗ GDPR Conflict</ClauseTag></h3>
            <p>Processor may engage sub-processors to assist in delivering the Services. <span className="cm-hl-red">Processor shall maintain a list of authorized sub-processors and may update this list at any time without prior written notice to Controller.</span></p>
            <p><span className="cm-hl-red">Controller's continued use of the Services for 30 days following any sub-processor change shall constitute implicit consent to such engagement.</span></p>
            <p>⚠ <em style={{ color: 'var(--red)' }}>Critical: GDPR Article 28(2) requires explicit prior written authorization from the Controller before engaging new sub-processors. Implicit consent via continued service use is non-compliant and would not withstand regulatory scrutiny.</em></p>
          </div>
          <div className="cm-doc-section">
            <h3>3. International Data Transfers <ClauseTag type="flag">✗ GDPR Conflict</ClauseTag></h3>
            <p>Personal data may be transferred to Processor's facilities located globally, including the United States, India, and Singapore. <span className="cm-hl-red">Such transfers shall be governed by Standard Contractual Clauses adopted by the European Commission in 2010 (Decision 2010/87/EU).</span></p>
            <p><span className="cm-hl-red">Processor does not currently participate in the EU-U.S. Data Privacy Framework or any equivalent adequacy mechanism for transfers to non-EEA countries.</span></p>
            <p>⚠ <em style={{ color: 'var(--red)' }}>Critical: The 2010 SCCs were invalidated by the CJEU in Schrems II (2020) and replaced by new SCCs effective June 2021. This clause exposes Controller to regulatory enforcement and potential data transfer injunctions.</em></p>
          </div>
          <div className="cm-doc-section">
            <h3>4. Data Retention <ClauseTag type="warn">⚠ Warning</ClauseTag></h3>
            <p>Processor shall retain personal data for a period of <span className="cm-hl-yellow">7 years following termination of the Agreement</span> for audit and compliance purposes, unless Controller provides specific deletion instructions.</p>
            <p>⚠ <em style={{ color: 'var(--yellow)' }}>Warning: GDPR Article 5(1)(e) requires data to be kept no longer than necessary. A blanket 7-year retention without documented legal basis likely violates the storage limitation principle. Vista Smart's own data retention policy specifies a maximum of 3 years for third-party processed data.</em></p>
          </div>
          <div className="cm-doc-section">
            <h3>5. Security Measures <ClauseTag type="ok">✓ Compliant</ClauseTag></h3>
            <p>Processor implements <span className="cm-hl-green">AES-256 encryption at rest, TLS 1.3 in transit, role-based access controls, and annual third-party penetration testing</span>. Processor holds ISO 27001 certification (Certificate No. DT-ISO-2024-0891).</p>
            <p><span className="cm-hl-green">Security measures shall be reviewed and updated annually</span>, consistent with our vendor security requirements.</p>
          </div>
          <div className="cm-doc-section">
            <h3>6. Breach Notification <ClauseTag type="warn">⚠ Warning</ClauseTag></h3>
            <p>In the event of a personal data breach, Processor shall notify Controller within <span className="cm-hl-yellow">96 hours of becoming aware of the breach</span>, providing available information about the nature, scope, and likely consequences of the breach.</p>
            <p>⚠ <em style={{ color: 'var(--yellow)' }}>Warning: GDPR Article 33 requires notification to the supervisory authority within 72 hours. A 96-hour window to notify the Controller may not provide sufficient time for Controller to meet its own regulatory obligations. Vista Smart's internal policy requires 24-hour vendor notification.</em></p>
          </div>
          <div className="cm-doc-section">
            <h3>7. Liability Cap <ClauseTag type="flag">✗ Insufficient</ClauseTag></h3>
            <p>Each party's total aggregate liability under this Agreement shall be limited to <span className="cm-hl-red">1× the annual fees paid by Controller in the 12 months preceding the claim, currently $87,500</span>.</p>
            <p><span className="cm-hl-red">This limitation applies to all claims including those arising from data breaches, regulatory fines, and third-party claims.</span></p>
            <p>⚠ <em style={{ color: 'var(--red)' }}>Critical: GDPR fines can reach €20 million or 4% of global annual turnover. A liability cap of $87,500 provides negligible protection and contradicts our vendor risk policy requiring liability caps of at least 2× annual contract value for data processors handling PII.</em></p>
          </div>
          <div className="cm-doc-section">
            <h3>8. Data Subject Rights <ClauseTag type="warn">⚠ Warning</ClauseTag></h3>
            <p>Processor shall assist Controller in responding to data subject requests. <span className="cm-hl-yellow">Processor's standard turnaround for data subject access, deletion, or portability requests is 30 business days</span>, with potential extensions for complex requests.</p>
            <p>⚠ <em style={{ color: 'var(--yellow)' }}>Warning: GDPR Article 12 requires data subject requests to be fulfilled within 1 calendar month (approx. 20–22 business days). "30 business days" may in some months exceed this obligation, creating compliance exposure for Vista Smart as Controller.</em></p>
          </div>
          <div className="cm-doc-section">
            <h3>9. Audit Rights <ClauseTag type="flag">✗ Insufficient</ClauseTag></h3>
            <p>Controller may request audit information from Processor <span className="cm-hl-red">no more than once every 24 months</span>, and <span className="cm-hl-red">only through third-party auditors approved in advance by Processor</span>. Processor may reject any proposed auditor at its sole discretion.</p>
            <p>⚠ <em style={{ color: 'var(--red)' }}>Critical: GDPR Article 28(3)(h) requires Processors to make available all information necessary to demonstrate compliance and allow for audits. Restricting audit frequency and auditor selection to Processor's discretion is non-compliant and would prevent Controller from meeting its accountability obligations.</em></p>
          </div>
          <div className="cm-summary-box red">
            <div className="cm-summary-title" style={{ color: 'var(--red)' }}>⚠ AI Compliance Summary — High Risk</div>
            <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.6 }}>This agreement contains <strong style={{ color: 'var(--red)' }}>4 critical GDPR compliance failures</strong> and 3 additional warnings. Key issues include invalid 2010 SCCs for international transfers, non-compliant sub-processor authorization, inadequate liability cap, and restricted audit rights. <strong>Recommendation: Suspend processing activities and renegotiate immediately. Escalate to DPO and Legal.</strong></div>
          </div>
        </div>
        <div className="cm-doc-sidebar">
          <h4>Clause Analysis</h4>
          <RiskItem color="green" title="§1 Scope of Processing" desc="Lawful basis documented, purpose limitation met" badge="Compliant" />
          <RiskItem color="red" title="§2 Sub-Processors" desc="No prior authorization required — GDPR Art. 28(2) violation" badge="Critical Flag" />
          <RiskItem color="red" title="§3 International Transfers" desc="References invalidated 2010 SCCs post-Schrems II" badge="Critical Flag" />
          <RiskItem color="yellow" title="§4 Data Retention (7yr)" desc="Exceeds GDPR storage limitation & internal 3yr policy" badge="Warning" />
          <RiskItem color="green" title="§5 Security Measures" desc="ISO 27001, AES-256, TLS 1.3 — meets requirements" badge="Compliant" />
          <RiskItem color="yellow" title="§6 Breach Notification (96hr)" desc="Exceeds 72hr GDPR threshold + internal 24hr policy" badge="Warning" />
          <RiskItem color="red" title="§7 Liability Cap ($87.5K)" desc="Below 2× policy minimum; GDPR fines can reach €20M" badge="Critical Flag" />
          <RiskItem color="yellow" title="§8 Data Subject Rights" desc="30 biz days may exceed 1-month GDPR calendar deadline" badge="Warning" />
          <RiskItem color="red" title="§9 Audit Rights" desc="24-month limit + processor veto — GDPR Art. 28 breach" badge="Critical Flag" />
          <div className="cm-score-box red">
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>OVERALL RISK SCORE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--red)' }}>HIGH</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>4 critical · 3 warnings</div>
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--red)', fontWeight: 600 }}>⚠ Escalate to Legal &amp; DPO</div>
          </div>
          <div style={{ marginTop: 10 }}>
            <button className="cm-btn-primary" style={{ width: '100%', fontSize: 12.5 }} onClick={() => alert('Escalation email drafted and sent to Legal & DPO')}>
              Escalate to Legal →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ContractManagement() {
  const [modal, setModal] = useState(null);
  const [activeNav, setActiveNav] = useState('Contracts');
  const [activeTab, setActiveTab] = useState('All');

  const navItems = [
    { icon: '⊞', label: 'Dashboard' },
    { icon: '📄', label: 'Contracts' },
    { icon: '🔍', label: 'Analytics' },
    { icon: '⚠️', label: 'Compliance' },
    { icon: '⚙️', label: 'Settings' },
  ];

  const contracts = [
    { name: 'Enterprise SaaS Agreement', party: 'Microsoft Corporation', source: 'DocuSign', value: '$245,000', start: 'Jan 15, 2025', end: 'Jan 14, 2026', statusClass: 'cm-status-active', statusLabel: 'Active', riskClass: 'cm-risk-low', riskLabel: '● Low', onView: () => setModal('saas') },
    { name: 'Data Processing Agreement', party: 'DataTech Solutions', source: 'Salesforce', value: '$87,500', start: 'Mar 05, 2025', end: 'Mar 04, 2026', statusClass: 'cm-status-risk', statusLabel: 'Compliance Risk', riskClass: 'cm-risk-high', riskLabel: '● High', onView: () => setModal('dpa') },
    { name: 'Office Lease Agreement', party: 'Westpark Properties', source: 'Google Drive', value: '$180,000/yr', start: 'Jun 01, 2023', end: 'May 31, 2025', statusClass: 'cm-status-renewal', statusLabel: 'Renewal Due', riskClass: 'cm-risk-med', riskLabel: '● Medium', onView: () => alert('Office Lease document viewer coming soon') },
    { name: 'Marketing Agency SOW', party: 'Creative Partners Inc.', source: 'DocuSign', value: '$125,000', start: 'May 01, 2025', end: 'Oct 31, 2025', statusClass: 'cm-status-new', statusLabel: 'New', riskClass: 'cm-risk-low', riskLabel: '● Low', onView: () => alert('SOW document viewer coming soon') },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="cm-root">
        <aside className="cm-sidebar">
          <div className="cm-logo">Vista<span>Smart</span></div>
          <nav className="cm-nav">
            {navItems.map(({ icon, label }) => (
              <button key={label} className={`cm-nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label)}>
                <span style={{ width: 16, textAlign: 'center', opacity: 0.7 }}>{icon}</span> {label}
              </button>
            ))}
          </nav>
          <div className="cm-sidebar-user">
            <div className="cm-avatar">MO</div>
            <div>
              <div className="cm-user-name">Morrie</div>
              <div className="cm-user-role">Admin</div>
            </div>
          </div>
        </aside>

        <main className="cm-main">
          <div className="cm-topbar">
            <div className="cm-page-title">Contract Management</div>
            <div className="cm-topbar-right">
              <span className="cm-badge">5 alerts</span>
              <button className="cm-tbl-btn primary" onClick={() => alert('New contract flow would open here')}>+ New Contract</button>
            </div>
          </div>

          <div className="cm-content">
            <p className="cm-section-label">✦ AI Suggestions for Today</p>
            <div className="cm-ai-cards">
              <div className="cm-ai-card">
                <div className="cm-ai-card-bar risk" />
                <div className="cm-ai-tag risk">⚠ Compliance Risk</div>
                <h3>I've found some compliance issues you might want to check</h3>
                <p>I noticed 3 contracts with data protection clauses that don't align with the latest regulatory requirements.</p>
                <div className="cm-chip-row">
                  <span className="cm-chip red">DataTech Solutions</span>
                  <span className="cm-chip red">GlobeTech Systems</span>
                  <span className="cm-chip">FirstData Inc.</span>
                </div>
                <button className="cm-ai-btn risk" onClick={() => setModal('compliance')}>Review Now →</button>
              </div>
              <div className="cm-ai-card">
                <div className="cm-ai-card-bar renewal" />
                <div className="cm-ai-tag renewal">🔄 Upcoming Renewals</div>
                <h3>Let's get ahead of these renewals coming up</h3>
                <p>You have 4 contracts expiring within the week. My analysis shows potential for cost savings if renewed early.</p>
                <div className="cm-chip-row">
                  <span className="cm-chip yellow">Office Lease</span>
                  <span className="cm-chip yellow">Microsoft SaaS</span>
                  <span className="cm-chip">2 more...</span>
                </div>
                <button className="cm-ai-btn renewal" onClick={() => alert('Renewal scheduler would open here')}>Schedule Renewals →</button>
              </div>
              <div className="cm-ai-card">
                <div className="cm-ai-card-bar revenue" />
                <div className="cm-ai-tag revenue">💰 Revenue Recognition</div>
                <h3>Time to recognize some revenue</h3>
                <p>I've identified 7 contracts with revenue triggers this month. That's $1.2M that can be recognized now.</p>
                <div className="cm-chip-row">
                  <span className="cm-chip green">CloudSys Tech</span>
                  <span className="cm-chip green">Acme Corp</span>
                  <span className="cm-chip">5 more...</span>
                </div>
                <button className="cm-ai-btn revenue" onClick={() => alert('Revenue recognition report would generate here')}>Generate Reports →</button>
              </div>
            </div>

            <div className="cm-table-card">
              <div className="cm-table-header">
                <div className="cm-table-title">Contract Database <span style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 400, marginLeft: 6 }}>368 contracts</span></div>
                <div className="cm-table-actions">
                  <button className="cm-tbl-btn">⇅ Filter</button>
                  <button className="cm-tbl-btn">↓ Export</button>
                </div>
              </div>
              <div className="cm-filter-tabs">
                {['All', 'Active', 'Needs Attention'].map(tab => (
                  <button key={tab} className={`cm-ftab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>
              <table className="cm-table">
                <thead>
                  <tr>{['Contract Name','Party','Source','Value','Start Date','End Date','Status','Risk Level','Actions'].map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {contracts.map((c) => (
                    <tr key={c.name}>
                      <td><div className="cm-contract-name">{c.name}</div></td>
                      <td><div className="cm-party">{c.party}</div></td>
                      <td><span className="cm-source-badge">{c.source}</span></td>
                      <td><span className="cm-value">{c.value}</span></td>
                      <td><span className="cm-date">{c.start}</span></td>
                      <td><span className="cm-date">{c.end}</span></td>
                      <td><span className={`cm-status-badge ${c.statusClass}`}>{c.statusLabel}</span></td>
                      <td><span className={`cm-risk-badge ${c.riskClass}`}>{c.riskLabel}</span></td>
                      <td style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <button className="cm-action-btn" onClick={c.onView}>View</button>
                        <button className="cm-action-btn edit">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>Showing 1 to 4 of 368 contracts</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="cm-tbl-btn">← Prev</button>
                  <button className="cm-tbl-btn active-page">1</button>
                  <button className="cm-tbl-btn">2</button>
                  <button className="cm-tbl-btn">3</button>
                  <button className="cm-tbl-btn">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {modal === 'compliance' && <ComplianceModal onClose={() => setModal(null)} onOpenDpa={() => setModal('dpa')} />}
        {modal === 'saas' && <SaasModal onClose={() => setModal(null)} />}
        {modal === 'dpa' && <DpaModal onClose={() => setModal(null)} />}
      </div>
    </>
  );
}
