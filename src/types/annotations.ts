// Represents the main document information
export interface DocumentInformation {
    id: string;
    clientName: string;
    assignedTo: string;
    l1Review: Review;
    l2Review: Review;
    pdfUrl: string;
    companyName: string;
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
    stepName: string;
    data: Data[];
  }
  
  // Data structure contains the fields like header, title, contractName, and matches
  export interface Data {
    header?: string;
    title?: string;
    contractName?: string;
    matches?: MatchInfo;
    dataName?: string; // Optional dataName if needed
    comments?: Comment[]; // Optional array of comments
  }
  
  // MatchInfo structure that contains details about matches (from your example JSON)
  export interface MatchInfo {
    numberOfMatches: number;
    sourceImageUrl: string;
    header: string;
    data: string;
    tag: string;
    sections: MatchInfoSections[];
  }
  
  // MatchInfoSections for the data related to each match
  export interface MatchInfoSections {
    label: string;
    value: string;
  }
  
  // Comment structure now includes id, senderMail, profileUrl, message, date, and time
  export interface Comment {
    id: string; // Changed to string to match your comment id in JSON
    senderMail: string;
    profileUrl: string;
    message: string;
    date: string;
    time: string;
  }
  
  // EpochTimeStamp type, assuming you have this type defined somewhere
  export type EpochTimeStamp = number; // or whatever type you are using for timestamps
  