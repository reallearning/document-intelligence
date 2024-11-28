"use client";
import { useDocumentData } from "@/context/document-data-context";
import { showHighlights } from "@/services/upload-file";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the type for fileState to ensure consistency
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
  const { saveHighlights } = useDocumentData();
  const router = useRouter();

  const loadingMessages = [
    "Hold tight, magic in progress!",
    "Cooking up your insights...",
    "Sprinkling some AI dust...",
    "Almost there, smarty pants!",
    "Crunching numbers and thoughts!",
    "Your document’s having a glow-up!",
    "AI is flexing its brain muscles...",
    "Loading... smarter than ever!",
    "We’re decoding the mysteries!",
    "Sit back, we’ve got this!",
  ];

  // Set the initial state with correct types
  const [fileState, setFileState] = useState<FileState>({
    selectedFile: null,
    fileType: "",
    isFileSelected: false,
    isUploading: false,
    uploadSuccess: null,
    uploadError: null,
    fileUploadingText: "Uploading...",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileState((prevState) => ({
      ...prevState,
      selectedFile: file,
      isFileSelected: Boolean(file && file.type === "application/pdf"),
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

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "File upload failed.");
      }

      const pdfUrl = data.url.split("?")[0];
      const { data: highlightsData } = await showHighlights({
        pdf_url: pdfUrl,
        type: fileState.fileType.toLowerCase(),
      });

      if (!highlightsData) {
        throw new Error("File upload failed.");
      }

      saveHighlights(highlightsData);
      setFileState((prevState) => ({
        ...prevState,
        uploadSuccess: "File uploaded successfully!",
        isUploading: false,
      }));

      router.push("/highlights/highlight-pdf");
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
          Upload PDF file
        </h2>

        {/* File Upload Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-6 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-morrie-primary file:opacity-80 file:text-white hover:file:opacity-100"
        />

        {/* File Type Selection */}
        <div className="text-left mb-6 font-poly">
          <p className="text-black mb-2">Select file type:</p>
          <label className="block mb-2 text-black font-nunito">
            <input
              type="radio"
              name="fileType"
              value="tax_proof"
              onChange={handleTypeChange}
              className="mr-2 accent-morrie-primary"
            />
            Tax Proof
          </label>
          <label className="block mb-2 text-black font-nunito">
            <input
              type="radio"
              name="fileType"
              value="Invoice"
              onChange={handleTypeChange}
              className="mr-2 accent-morrie-primary"
            />
            Invoice
          </label>
        </div>

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
