export interface Comment {
  id: string;
  senderMail: string;
  profileUrl: string;
  message: string;
  date: string;
  time: string;
}

export interface DataItem {
  id: string;
  header: string;
  data: string;
  comments: Comment[];
}

export interface Step {
  id: string;
  stepName: string | null;
  data: DataItem[];
}

export interface Invoice {
  id: string;
  invoiceName: string;
  assignedTo: string;
  pdfUrl: string;
  steps: Step[] | null;
}
