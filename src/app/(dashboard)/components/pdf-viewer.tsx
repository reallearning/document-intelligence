"use client";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { useState } from "react";
import { Document, Page } from "react-pdf";
import { PdfLoader } from "react-pdf-highlighter";
import "react-pdf-highlighter/dist/style.css";
import { PDFLoadingSkeleton } from "@/components/pdf-loading-skeleton";

type PDFViewerProps = {
  fileUrl: string;
  pageWidth: number;
};

const PDFViewer = ({ fileUrl, pageWidth }: PDFViewerProps) => {
  console.log(fileUrl);
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full h-full overflow-auto no-scrollbar">
      <PdfLoader url={fileUrl} beforeLoad={<PDFLoadingSkeleton />}>
        {() => (
          <div className="w-full h-full">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<PDFLoadingSkeleton />}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="w-full">
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={pageWidth}
                    height={1000}
                  />
                </div>
              ))}
            </Document>
          </div>
        )}
      </PdfLoader>
    </div>
  );
};

export default PDFViewer;
