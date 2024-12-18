"use client";
import { useDocumentData } from "@/context/document-data-context";
import { uploadFileGCP } from "@/services/upload-file";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FileState = {
  selectedFile: File | null;
  fileType: string;
  isFileSelected: boolean;
  isUploading: boolean;
  uploadSuccess: string | null;
  uploadError: string | null;
  fileUploadingText: string;
};

const UploadPage = () => {
  const { saveGcpExtractedData } = useDocumentData();
  const router = useRouter();

  const loadingMessages = [
    "Processing...",
    "Analyzing...",
    "Generating insights...",
    "Optimizing...",
    "Reviewing...",
    "Preparing data...",
    "Compiling highlights...",
    "Finalizing...",
    "Loading...",
    "Almost ready...",
  ];
  // Set the initial state with correct types
  const [fileState, setFileState] = useState<FileState>({
    selectedFile: null,
    fileType: "Invoice",
    isFileSelected: false,
    isUploading: false,
    uploadSuccess: null,
    uploadError: null,
    fileUploadingText: "Uploading...",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    // Validate file type
    const validFileTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    const isValidFile = file && validFileTypes.includes(file.type);

    setFileState((prevState) => ({
      ...prevState,
      selectedFile: isValidFile ? file : null,
      isFileSelected: Boolean(isValidFile),
    }));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileState((prevState) => ({
      ...prevState,
      fileType: event.target.value,
    }));
  };

  const updateLoadingText = () => {
    let index = 0;

    setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setFileState((prevState) => ({
        ...prevState,
        fileUploadingText: loadingMessages[index],
      }));
    }, 5000);
  };

  const handleFileUpload = async () => {
    if (!fileState.selectedFile || !fileState.fileType) return;

    updateLoadingText();

    setFileState((prevState) => ({
      ...prevState,
      isUploading: true,
      uploadSuccess: null,
      uploadError: null,
    }));

    try {
      const formData = new FormData();
      formData.append("file", fileState.selectedFile);
      formData.append("fileType", fileState.fileType);

      // Determine the format from the MIME type
      const format = fileState.selectedFile.type.startsWith("application/pdf")
        ? "pdf"
        : "image";

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "File upload failed.");
      }

      const pdfUrl = data.url.split("?")[0];
      const { data: highlightsData } = await uploadFileGCP({
        doc_url: pdfUrl,
        type: fileState.fileType.toLowerCase(),
        format: format,
      });

      if (!highlightsData) {
        throw new Error("File upload failed.");
      }

      saveGcpExtractedData(highlightsData);
      setFileState((prevState) => ({
        ...prevState,
        uploadSuccess: "File uploaded successfully!",
        isUploading: false,
      }));

      router.push("/demo/gcp/invoice");
    } catch (error) {
      let errorMessage = "An error occurred during upload.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFileState((prevState) => ({
        ...prevState,
        uploadError: errorMessage,
        isUploading: false,
      }));
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-morrie-background"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="bg-white p-10 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-6 font-poly text-black">
          Upload Invoice
        </h2>

        {/* File Upload Input */}
        <input
          type="file"
          accept=".pdf, image/*"
          onChange={handleFileChange}
          className="mb-6 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-morrie-primary file:opacity-80 file:text-white hover:file:opacity-100"
        />

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          disabled={
            !fileState.isFileSelected ||
            !fileState.fileType ||
            fileState.isUploading
          }
          className={`w-full py-2 rounded-lg ${
            fileState.isFileSelected &&
            fileState.fileType &&
            !fileState.isUploading
              ? "bg-morrie-primary text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {fileState.isUploading ? fileState.fileUploadingText : "Upload File"}
        </button>

        {/* Display success or error messages */}
        {fileState.uploadSuccess && (
          <p className="text-green-500 mt-4">{fileState.uploadSuccess}</p>
        )}
        {fileState.uploadError && (
          <p className="text-red-500 mt-4">{fileState.uploadError}</p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
