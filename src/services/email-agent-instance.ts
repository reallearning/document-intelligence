import { IEmailAgentRequest, IEmailAgentResponse } from "@/types/email-agent";
import axios, { AxiosResponse } from "axios";

const emailAgentInstance = axios.create({
  baseURL: "https://api.morrie.ai/api/v1/morrie-ai-service",
  timeout: 300000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export async function sendContent(
  body: IEmailAgentRequest
): Promise<AxiosResponse<IEmailAgentResponse>> {
  return emailAgentInstance.post("/mo/demo-email-agent", body);
}
