"use client";
import { useDocumentData } from "@/context/document-data-context";
import { uploadFile } from "@/services/upload-file";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UploadPage = () => {
  const { saveData } = useDocumentData();

  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setIsFileSelected(true);
    } else {
      setSelectedFile(null);
      setIsFileSelected(false);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(event.target.value);
  };

  const handleFileUpload = async () => {
    if (selectedFile && fileType) {
      setIsUploading(true);
      setUploadSuccess(null);
      setUploadError(null);

      // Create FormData to send to the API route
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileType", fileType);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Data: ", data);
        const url = data["url"];
        const [baseUrl] = url.split("?");
        const pdfUrl = baseUrl;
        console.log("PDF URL: ", pdfUrl);
        if (!response.ok) {
          console.error("Error while uploading pdf: ", data);
          setUploadError(data.error || "File upload failed.");
          return;
        }

        const body = {
          doc_url: pdfUrl,
          type: fileType.toLowerCase(),
        };

        const { data: responseData } = await uploadFile(body);

        if (!responseData) {
          setUploadError("File upload failed.");
          console.error("Error while uploading pdf: ", responseData);
          return;
        }

        saveData(responseData);
        setUploadSuccess("File uploaded successfully!");
        router.push("/demo/show-data");
      } catch (error) {
        console.log("Error: ", error);
        setUploadError("An error occurred during upload.");
      } finally {
        setIsUploading(false);
      }
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
          disabled={!isFileSelected || !fileType || isUploading}
          className={`w-full py-2 rounded-lg ${
            isFileSelected && fileType && !isUploading
              ? "bg-morrie-primary text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </button>

        {/* Display success or error messages */}
        {uploadSuccess && (
          <p className="text-green-500 mt-4">{uploadSuccess}</p>
        )}
        {uploadError && <p className="text-red-500 mt-4">{uploadError}</p>}
      </div>
    </div>
  );
};

export default UploadPage;
