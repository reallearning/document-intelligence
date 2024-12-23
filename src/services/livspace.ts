import { FeedbackRequest } from "@/types/livspace";
import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";

export async function livspaceFeedback(
  body: FeedbackRequest
): Promise<AxiosResponse<any>> {
  return axiosInstance.put("livspace/feedback", body);
}
