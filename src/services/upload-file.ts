import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { IUploadFileRequest } from "@/types/upload-file";
import { Data } from "@/app/(dashboard)/demo/components/types";

export async function uploadFile(
  body: IUploadFileRequest
): Promise<AxiosResponse<Data>> {
  return axiosInstance.post("/doc-intelligence", body);
}

export async function showHighlights(
  body: IUploadFileRequest
): Promise<AxiosResponse<Data>> {
  return axiosInstance.post("/highlights", body);
}
