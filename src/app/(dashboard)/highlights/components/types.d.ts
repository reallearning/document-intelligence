export interface HighlightsContentData {
  doc_url: string;
  format: string;
  data: HighlightsContent;
}

export interface Highlight {
  id: string;
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
    rects: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      width: number;
      height: number;
    }>;
    pageNumber: number;
  };
  comment: {
    text: string;
    emoji: string;
  };
}

export interface Flag {
  title?: string;
  description?: string | null;
  type?: "positive" | "negative" | "neutral";
}

export interface FieldWithHighlight {
  value?: string | number | boolean | null; //TODO:
  flag: Flag | null;
  highlight?: Highlight |null;
}

export interface InvoiceDetails {
  number?: FieldWithHighlight;
  date?: FieldWithHighlight;
  due_date?: FieldWithHighlight;
  place_of_supply?: FieldWithHighlight;
  reverse_charge_applicable?: FieldWithHighlight;
  order_number?: FieldWithHighlight;
  terms_of_delivery?: FieldWithHighlight;
  flag: Flag | null;
}

export interface SezDetails {
  declaration?: FieldWithHighlight;
  lut_number?: FieldWithHighlight;
  lut_validity?: FieldWithHighlight;
  flag: Flag | null;
}

export interface TdsDetails {
  lower_deduction_applicable?: FieldWithHighlight;
  flag: Flag | null;
}

export interface LineItem {
  item_number?: FieldWithHighlight;
  hsn_code?: FieldWithHighlight;
  quantity?: FieldWithHighlight;
  description?: FieldWithHighlight;
  value?: FieldWithHighlight;
  unit?: FieldWithHighlight;
  discount?: FieldWithHighlight;
  unit_price?: FieldWithHighlight;
  taxable_value?: FieldWithHighlight;
  tax_rate?: FieldWithHighlight;
  tax_amount?: FieldWithHighlight;
  total_value?: FieldWithHighlight;
  flag: Flag | null;
}

export interface Totals {
  sub_total?: FieldWithHighlight;
  taxable_value?: FieldWithHighlight;
  tax_amount?: FieldWithHighlight;
  rounding?: FieldWithHighlight;
  invoice_total?: FieldWithHighlight;
  amount_in_words?: FieldWithHighlight;
  flag: Flag | null;
}

export interface Signature {
  authorized_signatory?: FieldWithHighlight;
  flag: Flag | null;
}

export interface Remarks {
  remarks?: FieldWithHighlight;
  flag: Flag | null;
}

export interface AdditionalFields {
  shipment_tracking_number?: FieldWithHighlight;
  delivery_date?: FieldWithHighlight;
  delivery_terms?: FieldWithHighlight;
  payment_terms?: FieldWithHighlight;
  flag: Flag | null;
}

export interface GstDetails {
  cgst?: FieldWithHighlight;
  sgst?: FieldWithHighlight;
  igst?: FieldWithHighlight;
  utgst?: FieldWithHighlight;
  cess?: FieldWithHighlight;
  round_off?: FieldWithHighlight;
  flag: Flag | null;
}

export interface PartyDetails {
  name?: FieldWithHighlight;
  address?: FieldWithHighlight;
  gstin?: FieldWithHighlight;
  state?: FieldWithHighlight;
  stateCode?: FieldWithHighlight;
  panNumber?: FieldWithHighlight;
  contactDetails?: FieldWithHighlight;
  bankAccountNumber?: FieldWithHighlight;
  bankName?: FieldWithHighlight;
  branch?: FieldWithHighlight;
  ifscCode?: FieldWithHighlight;
  flag: Flag | null;
}

export interface HighlightsContent {
  supplier: PartyDetails;
  buyer: PartyDetails;
  consignee: PartyDetails;
  invoice_details: InvoiceDetails;
  sez_details: SezDetails;
  tds_details: TdsDetails;
  // gst_details: GstDetails; //TODO:
  line_items: LineItem[];
  totals: Totals;
  remarks: Remarks;
  signature: Signature;
  additional_fields: AdditionalFields;
}

export interface IDataProps {
  data: Data; // Main data prop passed to the sidebar
}

export interface IDataProps {
  data: Data; // Main data prop passed to the sidebar
}
