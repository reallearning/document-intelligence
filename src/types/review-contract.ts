export interface PerformanceObligation {
  title: string;
  recognition: string;
  amount: string;
}

export interface RevenueEntry {
  period: string;
  license: string;
  implementation: string;
  training: string;
  total: string;
}

export interface RevenueScheduleData {
  obligations: PerformanceObligation[];
  revenueSchedule: RevenueEntry[];
}

export interface ComplianceItem {
  title: string;
  evidence: string;
  impact: string;
  status: "Compliant" | "Needs review";
}

export interface ComplianceSection {
  sectionTitle: string;
  items: ComplianceItem[];
}
