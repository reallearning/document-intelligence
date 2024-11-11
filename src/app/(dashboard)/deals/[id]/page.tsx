"use client";
import { AnnotationsSidebar } from "@/components/annotations-sidebar";
import React, { useEffect, useState } from "react";
import DealsTabs from "./deals-tabs";
import { Button } from "@/components/button";
import { usePathname, useSearchParams } from "next/navigation";
import { DocumentInformation } from "@/types/annotations";

// Example data structure based on your JSON format
const reviewData: DocumentInformation[] = [
  {
    id: "deal_003",
    clientName: "PaxMedica Inc.",
    assignedTo: "support@paxmedica.com",
    l1Review: {
      reviewName: "L1 review",
      contracts: [
        {
          id: "contract_001",
          name: "Contract Name 1",
          pdfUrl: "/documents/contracts/paxmedica.pdf",
          steps: [
            {
              stepName: "Step1: General Contract Metadata",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "PAXMEDICA_INC_07_02_2020-EX-10.12",
                  contractName: "Master Service Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "PAXMEDICA_INC_07_02_2020-EX-10.12",
                    tag: "Important",
                  },
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "example1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "This is a comment message.",
                      date: "2024-11-11",
                      time: "10:00 AM",
                    },
                    {
                      id: "comment_2",
                      senderMail: "example2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Another comment message.",
                      date: "2024-11-11",
                      time: "11:00 AM",
                    },
                  ],
                },
                {
                  id: "data_entry_2",
                  header: "Document Type",
                  title: "Master Service Agreement",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_3",
                  header: "Effective Date",
                  title: "May 25, 2018",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_4",
                  header: "Execution Date",
                  title: "May 25, 2018",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_5",
                  header: "Document Language",
                  title: "English",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_6",
                  header: "Total Page Count",
                  title: "7",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_7",
                  header: "Document Status",
                  title: "Executed",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_8",
                  header: "Governing Law",
                  title: "Connecticut, USA",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step2: Financial Terms and Payment Conditions",
              id: "step_2",
              data: [
                {
                  id: "data_entry_9",
                  header: "Payment Terms",
                  title:
                    "Payment required within 30 days of receipt of invoice.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_10",
                  header: "Currency Specification",
                  title: "USD",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_11",
                  header: "Payment Schedule",
                  title:
                    "Payments are tied to completion of specific project milestones.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_12",
                  header: "Advance Payment Requirements",
                  title: "20% advance payment required upon contract signing.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_13",
                  header: "Reimbursable Expenses",
                  title:
                    "Routine communication expenses are included; additional reimbursable expenses must be pre-approved and are detailed in addenda.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_14",
                  header: "Taxes and Duties",
                  title:
                    "Contractor is responsible for paying its own income taxes.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step3: Term and Termination",
              id: "step_3",
              data: [
                {
                  id: "data_entry_15",
                  header: "Initial Term Duration",
                  title: "Effective immediately upon signing.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_16",
                  header: "Termination for Cause",
                  title:
                    "Either party may terminate with 30-day notice if the other party fails to correct a material breach.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_17",
                  header: "Termination for Convenience",
                  title:
                    "The client may terminate at its convenience with 30 days’ notice.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_18",
                  header: "Termination Notice Period",
                  title: "30 days",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_19",
                  header: "Termination for Insolvency",
                  title:
                    "Immediate termination if a party is declared insolvent or undergoes liquidation.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_20",
                  header: "Post-Termination Payment",
                  title:
                    "All outstanding fees for completed work and necessary termination-related expenses are due upon termination.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step4: Intellectual Property and Confidentiality",
              id: "step_4",
              data: [
                {
                  id: "data_entry_21",
                  header: "IP Assignment",
                  title:
                    "All intellectual property, inventions, and work products developed are assigned exclusively to the client.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_22",
                  header: "IP Ownership",
                  title:
                    "The client retains ownership of all deliverables produced under this agreement.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_23",
                  header: "Work for Hire Clause",
                  title:
                    "All deliverables are considered work-for-hire for the client.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step5: Confidentiality and Data Protection",
              id: "step_5",
              data: [
                {
                  id: "data_entry_24",
                  header: "Confidential Information Definition",
                  title:
                    "Confidential information includes all data, documents, and materials shared in the course of the contract.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_25",
                  header: "Non-Disclosure Requirements",
                  title:
                    "Contractor must not disclose any confidential information without the client’s written consent.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step6: Warranties and Representations",
              id: "step_6",
              data: [
                {
                  id: "data_entry_26",
                  header: "Warranty of Services",
                  title:
                    "The contractor warrants that services provided will meet industry and professional standards.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step7: Liabilities, Indemnities, and Insurance",
              id: "step_7",
              data: [
                {
                  id: "data_entry_27",
                  header: "Limitation of Liability",
                  title:
                    "The contractor’s liability is capped at the total amount paid under the agreement.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_28",
                  header: "Indemnification Obligations",
                  title:
                    "Mutual indemnification for claims resulting from each party’s negligence.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step8: Service Levels and Performance Standards",
              id: "step_8",
              data: [
                {
                  id: "data_entry_29",
                  header: "Key Performance Indicators (KPIs)",
                  title: "Weekly progress reports on project activity.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_30",
                  header: "Incident Reporting",
                  title:
                    "Immediate notification of any suspected fraudulent activities.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step9: Rights and Obligations",
              id: "step_9",
              data: [
                {
                  id: "data_entry_31",
                  header: "Scope of Work",
                  title:
                    "The scope is outlined in project-specific addenda, detailing tasks, timelines, and deliverables.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_32",
                  header: "Right to Audit",
                  title:
                    "Client has the right to audit documents and information related to the project.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step10: Dispute Resolution and Legal Proceedings",
              id: "step_10",
              data: [
                {
                  id: "data_entry_33",
                  header: "Choice of Law",
                  title: "Connecticut, USA",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_34",
                  header: "Limitation on Action Period",
                  title:
                    "Any legal action related to the agreement must be initiated within five years.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step11: Operational Requirements",
              id: "step_11",
              data: [
                {
                  id: "data_entry_35",
                  header: "Staffing Requirements",
                  title:
                    "Contractor must provide project management details and qualifications for proposed staff.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step12: Compliance and Regulatory",
              id: "step_12",
              data: [
                {
                  id: "data_entry_36",
                  header: "Compliance with Laws and Regulations",
                  title:
                    "Contractor must comply with applicable laws, regulatory guidelines, and industry standards.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_37",
                  header: "Conflict of Interest Disclosure",
                  title:
                    "Contractor states that there are no conflicts with existing engagements.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step13: Miscellaneous Clauses",
              id: "step_13",
              data: [
                {
                  id: "data_entry_38",
                  header: "Entire Agreement",
                  title:
                    "This agreement, along with any NDAs and addenda, constitutes the full and complete agreement between the parties.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step14: Specific Project and Engagement Terms",
              id: "step_14",
              data: [
                {
                  id: "data_entry_39",
                  header: "Statement of Work (SOW)",
                  title:
                    "The projects under this agreement aim to conduct clinical trials and manage research studies focusing on treatments for Autism Spectrum Disorder and neurological conditions.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_40",
                  header: "Project Milestones",
                  title: "Contract Signature: 20% payment upon signing.",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
          ],
        },
      ],
    },
    l2Review: {
      reviewName: "L2 review",
      contracts: [
        {
          id: "contract_002",
          name: "Contract Name 1",
          pdfUrl: "/document/contract/PAXMEDICA_INC_07_02_2020-EX-10.12.pdf",
          steps: [],
        },
      ],
    },
  },

  {
    id: "deal_004",
    clientName: "Rise Education Group",
    assignedTo: "support@riseeducation.com",
    l1Review: {
      reviewName: "L1 review",
      contracts: [
        {
          id: "contract_002",
          name: "Service Agreement",
          pdfUrl: "/documents/contracts/risee-education.pdf",
          steps: [
            {
              stepName: "Step1: General Contract Metadata",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "RISEEDUCATIONCAYMANLTD_04_17_2020-EX-4.23",
                  contractName: "Service Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "RISEEDUCATIONCAYMANLTD_04_17_2020-EX-4.23",
                    tag: "Important",
                  },
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "example1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "This is a comment message.",
                      date: "2024-11-11",
                      time: "10:00 AM",
                    },
                    {
                      id: "comment_2",
                      senderMail: "example2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Another comment message.",
                      date: "2024-11-11",
                      time: "11:00 AM",
                    },
                  ],
                },
                {
                  id: "data_entry_2",
                  header: "Document Type",
                  title: "Service Agreement",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_3",
                  header: "Effective Date",
                  title: "Date of execution (not specified)",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_4",
                  header: "Execution Date",
                  title: "Date of execution (not specified)",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_5",
                  header: "Document Language",
                  title: "English",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_6",
                  header: "Total Page Count",
                  title: "9",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_7",
                  header: "Document Status",
                  title: "Executed",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_8",
                  header: "Governing Law",
                  title: "China (with dispute resolution in Beijing)",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step2: Financial Terms and Payment Conditions",
              id: "step_2",
              data: [
                {
                  id: "data_entry_9",
                  header: "Payment Terms",
                  title:
                    "Service Fee to be paid quarterly, calculated based on actual costs incurred by Service Provider plus a percentage markup.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_10",
                  header: "Currency Specification",
                  title: "RMB",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_11",
                  header: "Payment Schedule",
                  title:
                    "Quarterly, based on Service Provider’s written payment instructions.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_12",
                  header: "Interest on Late Payments",
                  title: "0.5% daily for late payments.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_13",
                  header: "Payment Method",
                  title: "Bank remittance or other specified methods.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step3: Term and Termination",
              id: "step_3",
              data: [
                {
                  id: "data_entry_14",
                  header: "Initial Term Duration",
                  title: "Five years.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_15",
                  header: "Renewal Terms",
                  title:
                    "Automatically renews for another five years unless terminated in writing.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_16",
                  header: "Termination for Cause",
                  title:
                    "Service Provider may terminate for default in Service Fee payment exceeding 15 days.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step4: Intellectual Property and Confidentiality",
              id: "step_4",
              data: [
                {
                  id: "data_entry_17",
                  header: "IP Ownership",
                  title:
                    "All intellectual property rights belong exclusively to the Service Provider.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_18",
                  header: "Ownership of Deliverables",
                  title: "Service Provider retains IP rights to deliverables.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step5: Confidentiality and Data Protection",
              id: "step_5",
              data: [
                {
                  id: "data_entry_19",
                  header: "Confidential Information Definition",
                  title:
                    "Includes any information exchanged as part of the agreement, including software codes.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_20",
                  header: "Confidentiality Period",
                  title: "Survives beyond agreement termination.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_21",
                  header: "Non-Disclosure Requirements",
                  title: "Confidentiality required except as legally mandated.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step6: Warranties and Representations",
              id: "step_6",
              data: [],
            },
            {
              stepName: "Step7: Liabilities, Indemnities, and Insurance",
              id: "step_7",
              data: [
                {
                  id: "data_entry_22",
                  header: "Indemnification Obligations",
                  title:
                    "The defaulting party must indemnify for losses resulting from non-compliance.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step8: Service Levels and Performance Standards",
              id: "step_8",
              data: [],
            },
            {
              stepName: "Step9: Rights and Obligations",
              id: "step_9",
              data: [
                {
                  id: "data_entry_23",
                  header: "Scope of Work",
                  title:
                    "Service Provider offers academic, enrollment, HR, financial, legal, customer, IT, and administrative support.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_24",
                  header: "Assignment and Delegation",
                  title:
                    "Service Recipient cannot assign or transfer its rights without written consent; Service Provider can assign rights in restructuring scenarios.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step10: Dispute Resolution and Legal Proceedings",
              id: "step_10",
              data: [
                {
                  id: "data_entry_25",
                  header: "Arbitration Clause",
                  title:
                    "Disputes are subject to arbitration by the Beijing Arbitration Commission.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_26",
                  header: "Choice of Law",
                  title: "Governed by the laws of China.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step11: Operational Requirements",
              id: "step_11",
              data: [],
            },
            {
              stepName: "Step12: Compliance and Regulatory",
              id: "step_12",
              data: [
                {
                  id: "data_entry_27",
                  header: "Compliance with Laws and Regulations",
                  title:
                    "Both parties are required to comply with the relevant Chinese laws.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step13: Miscellaneous Clauses",
              id: "step_13",
              data: [
                {
                  id: "data_entry_28",
                  header: "Entire Agreement",
                  title:
                    "This document constitutes the entire agreement between the parties, superseding prior agreements.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_29",
                  header: "Amendments and Modifications",
                  title:
                    "Modifications require a written agreement between the parties.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step14: Specific Project and Engagement Terms",
              id: "step_14",
              data: [
                {
                  id: "data_entry_30",
                  header: "Statement of Work (SOW)",
                  title:
                    "Service Provider provides a comprehensive suite of services, including academic, enrollment, HR, financial, legal, customer support, IT, and administrative support.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_31",
                  header: "Project Milestones",
                  title:
                    "Quarterly Service Fee assessments, based on the actual costs plus a percentage markup.",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
          ],
        },
      ],
    },
    l2Review: {
      reviewName: "L2 review",
      contracts: [
        {
          id: "contract_003",
          name: "Service Agreement",
          pdfUrl:
            "/document/contract/RISEEDUCATIONCAYMANLTD_04_17_2020-EX-4.23-SERVICE_AGREEMENT.pdf",
          steps: [],
        },
      ],
    },
  },

  {
    id: "deal_005",
    clientName: "Oaktree Capital Management",
    assignedTo: "support@oaktreecapital.com",
    l1Review: {
      reviewName: "L1 review",
      contracts: [
        {
          id: "contract_003",
          name: "Services Agreement",
          pdfUrl: "/documents/contracts/oaktree-capital.pdf",
          steps: [
            {
              stepName: "Step1: General Contract Metadata",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "OAKTREECAPITALGROUP,LLC_03_02_2020-EX-10.8",
                  contractName: "Services Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "OAKTREECAPITALGROUP,LLC_03_02_2020-EX-10.8",
                    tag: "Important",
                  },
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "example1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "This is a comment message.",
                      date: "2024-11-11",
                      time: "10:00 AM",
                    },
                    {
                      id: "comment_2",
                      senderMail: "example2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Another comment message.",
                      date: "2024-11-11",
                      time: "11:00 AM",
                    },
                  ],
                },
                {
                  id: "data_entry_2",
                  header: "Document Type",
                  title: "Services Agreement",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_3",
                  header: "Effective Date",
                  title: "September 25, 2018",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_4",
                  header: "Execution Date",
                  title: "September 25, 2018",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_5",
                  header: "Document Language",
                  title: "English",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_6",
                  header: "Total Page Count",
                  title: "8",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_7",
                  header: "Document Status",
                  title: "Executed",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_8",
                  header: "Governing Law",
                  title: "England and Wales",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step2: Financial Terms and Payment Conditions",
              id: "step_2",
              data: [
                {
                  id: "data_entry_9",
                  header: "Payment Terms",
                  title:
                    "Payment for services rendered by the Sub-Advisor, as agreed periodically.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_10",
                  header: "Fixed Fee",
                  title:
                    "Service Fee based on the agreement between the parties.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_11",
                  header: "Allowable Deductions",
                  title:
                    "Management fees received by the Sub-Advisor directly for certain services may reduce the Service Fee.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step3: Term and Termination",
              id: "step_3",
              data: [
                {
                  id: "data_entry_12",
                  header: "Initial Term Duration",
                  title:
                    "Until the expiration of the Fund’s term or specific termination events.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_13",
                  header: "Termination for Cause",
                  title: "Agreement may be terminated for non-compliance.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_14",
                  header: "Termination for Convenience",
                  title: "30 days' notice by either party.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_15",
                  header: "Termination Notice Period",
                  title: "30 days",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step4: Intellectual Property and Confidentiality",
              id: "step_4",
              data: [],
            },
            {
              stepName: "Step5: Confidentiality and Data Protection",
              id: "step_5",
              data: [
                {
                  id: "data_entry_16",
                  header: "Confidential Information Definition",
                  title:
                    "Confidential information includes records and data on services provided.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_17",
                  header: "Return of Confidential Information",
                  title: "Required upon termination of the agreement.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_18",
                  header: "Data Protection Obligations",
                  title:
                    "Compliance with FCA Rules and confidentiality standards.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_19",
                  header: "Non-Disclosure Requirements",
                  title:
                    "Sub-Advisor required to maintain confidentiality, except as required by law.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step6: Warranties and Representations",
              id: "step_6",
              data: [],
            },
            {
              stepName: "Step7: Liabilities, Indemnities, and Insurance",
              id: "step_7",
              data: [
                {
                  id: "data_entry_20",
                  header: "Indemnification Obligations",
                  title:
                    "Sub-Advisor indemnifies Oaktree US for any negligence or willful misconduct.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step8: Service Levels and Performance Standards",
              id: "step_8",
              data: [],
            },
            {
              stepName: "Step9: Rights and Obligations",
              id: "step_9",
              data: [
                {
                  id: "data_entry_21",
                  header: "Scope of Work",
                  title:
                    "Provide sub-advisory, marketing, and promotional services for Oaktree US and its Funds.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_22",
                  header: "Customer Obligations",
                  title:
                    "Oaktree US oversees fund and investor accounting, reporting, and custodial services.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_23",
                  header: "Contractor Obligations",
                  title:
                    "Sub-Advisor manages marketing efforts, portfolio management, and investment decisions.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_24",
                  header: "Assignment and Delegation",
                  title:
                    "Sub-Advisor may not assign its rights and obligations without prior written consent from Oaktree US.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step10: Dispute Resolution and Legal Proceedings",
              id: "step_10",
              data: [
                {
                  id: "data_entry_25",
                  header: "Choice of Law",
                  title: "England and Wales",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_26",
                  header: "Governing Law",
                  title: "England and Wales",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step11: Operational Requirements",
              id: "step_11",
              data: [
                {
                  id: "data_entry_27",
                  header: "Record Keeping",
                  title:
                    "Sub-Advisor is required to maintain records of all services provided to the Funds and ensure secure storage and confidentiality.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step12: Compliance and Regulatory",
              id: "step_12",
              data: [
                {
                  id: "data_entry_28",
                  header: "Compliance with Laws and Regulations",
                  title:
                    "Compliance with FCA Rules and FSMA regulations is mandatory for Sub-Advisor.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_29",
                  header: "Regulatory Approvals",
                  title: "Sub-Advisor must maintain FCA authorization.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step13: Miscellaneous Clauses",
              id: "step_13",
              data: [
                {
                  id: "data_entry_30",
                  header: "Entire Agreement",
                  title:
                    "The agreement supersedes all prior agreements between Oaktree US and Sub-Advisor.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_31",
                  header: "Amendments and Modifications",
                  title:
                    "Modifications require written agreement from both parties.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
            {
              stepName: "Step14: Specific Project and Engagement Terms",
              id: "step_14",
              data: [
                {
                  id: "data_entry_32",
                  header: "Statement of Work (SOW)",
                  title:
                    "Sub-Advisor’s duties include sub-advisory and marketing services for Oaktree US-managed Funds.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_33",
                  header: "Project Milestones",
                  title:
                    "Specific project deliverables are completed based on ongoing advisory needs and investor interest in Oaktree’s Funds.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
                {
                  id: "data_entry_34",
                  header: "Acceptance Criteria",
                  title:
                    "Deliverables are subject to Oaktree US’s review for quality and adherence to compliance.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                },
              ],
            },
          ],
        },
      ],
    },
    l2Review: {
      reviewName: "L2 review",
      contracts: [
        {
          id: "contract_004",
          name: "Services Agreement",
          pdfUrl:
            "/document/contract/OAKTREECAPITALGROUP,LLC_03_02_2020-EX-10.8-Services_Agreement.pdf",
          steps: [],
        },
      ],
    },
  },
];

const DealsDetails = () => {
  const pathname = usePathname();

  const id = pathname?.split("/").pop();

  const [selectedDeal, setSelectedDeal] = useState<DocumentInformation | null>(
    null
  );

  useEffect(() => {
    if (id) {
      const deal = reviewData.find((deal) => deal.id === id);
      if (deal) {
        setSelectedDeal(deal);
      } else {
        setSelectedDeal(null);
      }
    }
  }, [id]);

  const [isReviewMarked, setIsReviewMarked] = useState(0);

  const handleMarkReview = () => {
    setIsReviewMarked((prevIndex) => prevIndex + 1);
  };

  if (!selectedDeal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-row">
      <AnnotationsSidebar documentInformation={selectedDeal} />
      <div className="flex flex-col px-6 w-full">
        <div className="flex justify-end p-4 w-full">
          {isReviewMarked === 0 ? (
            <Button
              color="primary-default"
              size="md"
              onClick={handleMarkReview}
            >
              Mark Review
            </Button>
          ) : (
            <h2 className="text-morrie-primary font-nunito text-md leading-6 font-medium p-4">
              Moved to L2 Review
            </h2>
          )}
        </div>
        <div className="w-full">
          <DealsTabs reviewData={[selectedDeal.l1Review]} />{" "}
          {/* Passing L1 review data */}
        </div>
      </div>
    </div>
  );
};

export default DealsDetails;
