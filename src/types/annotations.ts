// Represents the main document information
export interface DocumentInformation {
  id: string;
  clientName: string;
  assignedTo: string;
  l1Review: Review;
}

// Review structure containing the review name and contracts
export interface Review {
  reviewName: string;
  contracts: Contract[];
}

// Contract structure containing the contract id, name, pdf URL, and steps
export interface Contract {
  id: string;
  name: string;
  pdfUrl: string;
  steps: Step[];
}

// Step structure contains step name and data related to the step
export interface Step {
  id: string;
  stepName: string;
  data: Data[];
}

// Data structure contains fields like header, title, contractName, matches, and comments
export interface Data {
  id: string;
  header?: string;
  title?: string;
  contractName?: string;
  matches?: MatchInfo | null;
  compliance?: Compliance | null;
  comments?: Comment[]; // Optional array of comments
}

// MatchInfo structure containing details about matches
export interface MatchInfo {
  numberOfMatches: number;
  sourceImageUrl: string;
  header: string;
  data: string;
  tag: string;
}

// Comment structure containing comment metadata and message details
export interface Comment {
  id: string; // Unique identifier for each comment
  senderMail: string;
  profileUrl: string;
  message: string;
  date: string;
  time: string;
}

export interface Compliance {
  id: string;
  header: string;
  status: "Compliant" | "Partially compliant" | "Non compliant";
  data: string;
}

// Type alias for representing timestamp as a number
export type EpochTimeStamp = number;
