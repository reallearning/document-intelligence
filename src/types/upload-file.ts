export interface IUploadFileRequest {
  doc_url: string;
  type: string;
}

export interface IUploadFileResponse {
  message: string;
  success: boolean;
  data: any;
}
