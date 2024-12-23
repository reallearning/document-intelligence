export interface LivspaceData {
  doc_url: string;
  format: string;
  data: Record<string, unknown>;
}

export interface FeedbackRequest {
  doc_url: string;
  feedback: string;
}
