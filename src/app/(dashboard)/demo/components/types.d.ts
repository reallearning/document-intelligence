export interface DataItem {
  key: string; // Example: "Tel:", "Invoice No."
  value: string; // For complex sections in `additional_data`, like objects
}

export interface AdditionalData {
  key: string; // e.g., "line_items", "totals"
  value: any; // Dynamic value that can be an array, object, or any other type
}

export interface LineItem {
  cpt_code: string; // Procedure CPT code
  description: string; // Procedure description
  quantity: number; // Quantity of the service/procedure
  fee: string; // Fee charged for the procedure
  allowed: string; // Allowed amount by insurance
  amount: string; // Final amount charged
}

export interface Totals {
  subtotal_imaging: string; // Total for imaging services
  subtotal_professional: string; // Total for professional services
  subtotal_additional: string; // Additional charges
  total_charges: string; // Total invoice charges
  insurance_contractual_adjustment: string; // Insurance adjustments
  insurance_payment: string; // Payment from insurance
  patient_coinsurance: string; // Patient coinsurance
  patient_deductible: string; // Deductible owed by patient
  previous_patient_payments: string; // Previous payments by patient
  patient_responsibility: string; // Amount the patient owes
}

export interface Data {
  pdf_key_value_pairs: DataItem[]; // Array of key-value pairs for PDF metadata
  additional_data: AdditionalData[]; // Sections like line items, totals, party info
  file_url: string; // URL of the PDF file
  document_type: string; // Document type, e.g., "invoice"
}

export interface Highlights {
  pdf_url: string;
  highlights: Highlight[];
}

export interface Highlight {
  content: {
    text: string;
  };
  position: {
    boundingRect: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      width: number;
      height: number;
    };
    rects: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      width: number;
      height: number;
    }[];
    pageNumber: number;
  };
  comment: {
    text: string;
    emoji: string;
  };
}

export interface IDataProps {
  data: Data; // Main data prop passed to the sidebar
}
