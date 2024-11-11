import { AxiosResponse } from "axios";
import axiosInstance from "./axios-instance";
import { IUploadFileRequest, IUploadFileResponse } from "@/types/upload-file";

export async function uploadFile(
  body: IUploadFileRequest
): Promise<AxiosResponse<IUploadFileResponse>> {
  return axiosInstance.post("/doc-highlights", body);
}
