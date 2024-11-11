"use client";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import {
  Highlight,
  AreaHighlight,
  Popup,
  PdfLoader,
} from "react-pdf-highlighter";
import "react-pdf-highlighter/dist/style.css";

type PDFViewerProps = {
  fileUrl: string;
  pageWidth: number;
};

const PDFViewer = ({ fileUrl, pageWidth }: PDFViewerProps) => {
  console.log(fileUrl);
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="w-full h-full overflow-auto no-scrollbar">
      <PdfLoader url={fileUrl} beforeLoad={<span>Loading...</span>}>
        {(pdfDocument) => (
          <div className="w-full h-full">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<span>Loading PDF...</span>}
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
