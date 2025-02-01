export interface IEmailAgentRequest {
  content: string;
}

export interface IEmailAgentResponse {
  sop: string;
  tools: string;
  escalate: boolean;
}
