import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { IUploadFileRequest } from "@/types/upload-file";
import { Data, GCPExtractedData, Highlights } from "@/app/(dashboard)/demo/components/types";

export async function uploadFile(
  body: IUploadFileRequest
): Promise<AxiosResponse<Data>> {
  return axiosInstance.post("/doc-intelligence", body);
}

export async function uploadFileGCP(
  body: IUploadFileRequest
): Promise<AxiosResponse<GCPExtractedData>> {
  return axiosInstance.post("/doc-intelligence-gcp", body);
}

export async function showHighlights(
  body: IUploadFileRequest
): Promise<AxiosResponse<Highlights>> {
  return axiosInstance.post("/highlights", body);
}
