"use client";
import { AnnotationsSidebar } from "@/components/annotations-sidebar";
import React, { useEffect, useState } from "react";
import DealsTabs from "./deals-tabs";
import { Button } from "@/components/button";
import { usePathname } from "next/navigation";
import { DocumentInformation } from "@/types/annotations";

// Example data structure based on your JSON format
const reviewData: DocumentInformation[] = [
  {
    id: "deal_005",
    clientName: "Oaktree Capital Management",
    assignedTo: "support@oaktreecapital.com",
    l1Review: {
      reviewName: "L1 review",
      contracts: [
        {
          id: "contract_005",
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
                  title: "Exhibit 10.8",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Document ID verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: {
                    id: "compliance_1",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Document metadata is complete and aligns with ASC 606 documentation requirements.",
                  },
                },
                {
                  id: "data_entry_2",
                  header: "Contract Type",
                  title: "Services Agreement",
                  contractName: "Services Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "OAKTREECAPITALGROUP,LLC_03_02_2020-EX-10.8",
                    tag: "Important",
                  },
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Effective Date",
                  title: "September 25, 2018",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Execution Date",
                  title: "September 25, 2018",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_5",
                  header: "Page Count",
                  title: "8",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_2",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Basic metadata complies with ASC 606.",
                  },
                },
              ],
            },
            {
              stepName: "Step2: Parties & Authority",
              id: "step_2",
              data: [
                {
                  id: "data_entry_6",
                  header: "Contract Parties",
                  title:
                    "Oaktree Capital Management, L.P. and Oaktree Capital Management (International) Limited",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Entity Types",
                  title:
                    "Limited Partnership (US) and Private Limited Company (UK)",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_3",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Entity types verified as per compliance requirements.",
                  },
                },
                {
                  id: "data_entry_8",
                  header: "Signatory Authority Verified",
                  title: "Signatures from authorized signatories present",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_4",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Signatory authority is present but lacks specific verification details.",
                  },
                },
              ],
            },
            {
              stepName: "Step3: Financial Terms",
              id: "step_3",
              data: [
                {
                  id: "data_entry_9",
                  header: "Payment Terms",
                  title:
                    "Service fees payable for management and advisory services rendered.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_5",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Payment terms are defined but lack full variable consideration details.",
                  },
                },
                {
                  id: "data_entry_10",
                  header: "Currency Specified",
                  title: "Not specified",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_6",
                    header: "ASC 606 Check",
                    status: "Non compliant",
                    data: "Currency not specified, impacting clarity of transaction price.",
                  },
                },
                {
                  id: "data_entry_11",
                  header: "Invoice Requirements",
                  title: "Not specified",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Performance Obligations",
              id: "step_4",
              data: [
                {
                  id: "data_entry_12",
                  header: "Scope of Work",
                  title:
                    "Sub-advisory services, asset management, and marketing for Oaktree US.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_7",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Scope of work identified and compliant with ASC 606.",
                  },
                },
                {
                  id: "data_entry_13",
                  header: "Service Levels",
                  title: "Management quality consistent with past practices",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_8",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Service levels defined, meets compliance standards.",
                  },
                },
              ],
            },
            {
              stepName: "Step5: Term & Termination",
              id: "step_5",
              data: [
                {
                  id: "data_entry_14",
                  header: "Termination Rights",
                  title: "Either party may terminate with 30 days' notice.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_9",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Termination rights align with ASC 606.",
                  },
                },
              ],
            },
            {
              stepName: "Step6: Intellectual Property",
              id: "step_6",
              data: [
                {
                  id: "data_entry_15",
                  header: "IP Ownership",
                  title: "Not specified",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_10",
                    header: "ASC 606 Check",
                    status: "Non compliant",
                    data: "Lack of IP ownership details impacts compliance.",
                  },
                },
              ],
            },
            {
              stepName: "Step7: Revenue Recognition Specifics",
              id: "step_7",
              data: [
                {
                  id: "data_entry_16",
                  header: "Recognition Method",
                  title: "Over time as services are rendered",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_11",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Revenue recognition method aligns with ASC 606 requirements.",
                  },
                },
              ],
            },
            {
              stepName: "Step8: Compliance Requirements",
              id: "step_8",
              data: [
                {
                  id: "data_entry_17",
                  header: "Data Privacy",
                  title: "Compliance with FCA Rules required.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_12",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Basic compliance is in place, but additional requirements on data privacy should be reviewed.",
                  },
                },
              ],
            },
            {
              stepName: "Step9: Allocation Methodology",
              id: "step_9",
              data: [
                {
                  id: "data_entry_18",
                  header: "Standalone Prices",
                  title: "Not detailed",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_13",
                    header: "ASC 606 Check",
                    status: "Non compliant",
                    data: "Standalone pricing not specified, impacting allocation requirements.",
                  },
                },
              ],
            },
            {
              stepName: "Step10: Compliance Check",
              id: "step_10",
              data: [
                {
                  id: "data_entry_19",
                  header: "Regulatory",
                  title: "FCA compliance documented for Sub-Advisor.",
                  contractName: "Services Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_14",
                    header: "ASC 606 Final Verification",
                    status: "Partially compliant",
                    data: "Regulatory compliance meets basic requirements but lacks anti-corruption and export controls.",
                  },
                },
              ],
            },
          ],
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
          id: "contract_006",
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
                  title: "Exhibit 4.23",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Document ID verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: {
                    id: "compliance_1",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Document ID and metadata meet ASC 606 documentation requirements.",
                  },
                },
                {
                  id: "data_entry_2",
                  header: "Contract Type",
                  title: "Service Agreement",
                  contractName: "Service Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "OAKTREECAPITALGROUP,LLC_03_02_2020-EX-10.8",
                    tag: "Important",
                  },
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Effective Date",
                  title: "Not specified",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_2",
                    header: "ASC 606 Check",
                    status: "Non compliant",
                    data: "Effective date not clearly specified, impacting compliance with ASC 606.",
                  },
                },
              ],
            },
            {
              stepName: "Step2: Parties & Authority",
              id: "step_2",
              data: [
                {
                  id: "data_entry_4",
                  header: "Contract Parties",
                  title:
                    "Rise (Tianjin) Education Information Consulting Co., Ltd. (Service Provider) and Service Recipient",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_5",
                  header: "Entity Types",
                  title: "Limited Liability Company in China",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_3",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Entity types identified in compliance with ASC 606 requirements.",
                  },
                },
                {
                  id: "data_entry_6",
                  header: "Signatory Authority",
                  title: "Corporate seal affixed",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Financial Terms",
              id: "step_3",
              data: [
                {
                  id: "data_entry_7",
                  header: "Payment Terms",
                  title:
                    "Quarterly payment based on incurred costs with markup or as a percentage of revenues",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_4",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Payment terms are partially compliant; revenue-based calculation needs further detail for ASC 606.",
                  },
                },
                {
                  id: "data_entry_8",
                  header: "Currency Specified",
                  title: "RMB",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_9",
                  header: "Late Payment Terms",
                  title:
                    "Liquidated damages of 0.5% per day for late payments over 15 days",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_5",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Late payment penalties defined in compliance with ASC 606 guidelines.",
                  },
                },
              ],
            },
            {
              stepName: "Step4: Performance Obligations",
              id: "step_4",
              data: [
                {
                  id: "data_entry_10",
                  header: "Scope of Work",
                  title:
                    "Academic, enrollment, HR, financial, legal, customer, IT, and administrative support services",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_6",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Scope of services outlined in alignment with performance obligations.",
                  },
                },
                {
                  id: "data_entry_11",
                  header: "Service Levels",
                  title:
                    "Customized support services provided by dedicated teams",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_12",
                  header: "Success Criteria",
                  title:
                    "Successful support for academic, enrollment, and customer needs",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step5: Term & Termination",
              id: "step_5",
              data: [
                {
                  id: "data_entry_13",
                  header: "Termination Rights",
                  title:
                    "Service Provider may terminate upon default by Service Recipient",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_14",
                  header: "Notice Periods",
                  title:
                    "Termination with notice for defaults exceeding 15 days",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_7",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Termination rights and notice periods defined as per ASC 606 requirements.",
                  },
                },
              ],
            },
            {
              stepName: "Step6: Intellectual Property",
              id: "step_6",
              data: [
                {
                  id: "data_entry_15",
                  header: "IP Ownership",
                  title:
                    "Service Provider retains all IP rights for services provided",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_8",
                    header: "ASC 606 Impact",
                    status: "Compliant",
                    data: "IP ownership fully retained by Service Provider, compliant with ASC 606.",
                  },
                },
              ],
            },
            {
              stepName: "Step7: Revenue Recognition Specifics",
              id: "step_7",
              data: [
                {
                  id: "data_entry_16",
                  header: "Recognition Method",
                  title:
                    "Revenue recognized over time as services are rendered",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_9",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Revenue recognition aligns with ASC 606 for over-time performance.",
                  },
                },
              ],
            },
            {
              stepName: "Step8: Documentation Requirements",
              id: "step_8",
              data: [
                {
                  id: "data_entry_17",
                  header: "Performance Evidence",
                  title: "Not specified",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_10",
                    header: "ASC 606 Check",
                    status: "Non compliant",
                    data: "Performance evidence lacking; compliance not met.",
                  },
                },
              ],
            },
            {
              stepName: "Step9: Allocation Methodology",
              id: "step_9",
              data: [
                {
                  id: "data_entry_18",
                  header: "Standalone Prices",
                  title: "Service fees based on actual costs plus markup",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_11",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Standalone prices based on costs, though detailed allocation methodology is not fully specified.",
                  },
                },
              ],
            },
            {
              stepName: "Step10: Compliance Check",
              id: "step_10",
              data: [
                {
                  id: "data_entry_19",
                  header: "Data Privacy",
                  title: "Confidentiality agreement in place between parties",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_12",
                    header: "ASC 606 Final Verification",
                    status: "Compliant",
                    data: "Confidentiality provisions align with regulatory compliance needs.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: "deal_003",
    clientName: "PaxMedica, Inc.",
    assignedTo: "support@paxmedica.com",
    l1Review: {
      reviewName: "L1 review",
      contracts: [
        {
          id: "contract_007",
          name: "Master Service Agreement",
          pdfUrl: "/documents/contracts/paxmedica.pdf",

          steps: [
            {
              stepName: "Step1: General Contract Metadata",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "Exhibit 10.12",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Document ID verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: {
                    id: "compliance_1",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Document ID and metadata align with ASC 606 documentation requirements.",
                  },
                },
                {
                  id: "data_entry_2",
                  header: "Contract Type",
                  title: "Master Service Agreement",
                  contractName: "Master Service Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "OAKTREECAPITALGROUP,LLC_03_02_2020-EX-10.8",
                    tag: "Important",
                  },
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Effective Date",
                  title: "May 25, 2018",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_2",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Effective date specified, meeting ASC 606 compliance.",
                  },
                },
              ],
            },
            {
              stepName: "Step2: Parties & Authority",
              id: "step_2",
              data: [
                {
                  id: "data_entry_4",
                  header: "Contract Parties",
                  title:
                    "CRO Consulting (Pty) Limited and Purinix Pharmaceuticals LLC",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_5",
                  header: "Entity Types",
                  title:
                    "Limited company in South Africa (CRO) and LLC in the USA (Client)",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_3",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Entity types defined per ASC 606 requirements.",
                  },
                },
                {
                  id: "data_entry_6",
                  header: "Signatory Authority",
                  title:
                    "Authorized signatures by CRO Managing Director and Client CEO",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Financial Terms",
              id: "step_3",
              data: [
                {
                  id: "data_entry_7",
                  header: "Payment Terms",
                  title:
                    "Payments based on project-specific Addenda milestones",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_4",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Payment structure and milestones partially detailed; further breakdown required for full compliance.",
                  },
                },
                {
                  id: "data_entry_8",
                  header: "Payment Schedule",
                  title: "Within 30 days of invoice receipt by Client",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_9",
                  header: "Variable Rate Components",
                  title: "Included as per addenda project specifics",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Performance Obligations",
              id: "step_4",
              data: [
                {
                  id: "data_entry_10",
                  header: "Scope of Work",
                  title: "Clinical Research Services in South Africa",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_5",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Scope of work aligns with performance obligation requirements.",
                  },
                },
                {
                  id: "data_entry_11",
                  header: "Deliverables",
                  title:
                    "Weekly written reports and project-specific tasks per Addenda",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step5: Term & Termination",
              id: "step_5",
              data: [
                {
                  id: "data_entry_12",
                  header: "Termination Rights",
                  title:
                    "Either party may terminate with 30 days' notice, with terms for breach specified",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_6",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Termination rights and obligations meet ASC 606 guidelines.",
                  },
                },
                {
                  id: "data_entry_13",
                  header: "Early Termination Conditions",
                  title:
                    "CRO must refund any advance if in breach, with liability limited as defined",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step6: Intellectual Property",
              id: "step_6",
              data: [
                {
                  id: "data_entry_14",
                  header: "IP Ownership",
                  title:
                    "All deliverables and work products deemed works made for hire for Client",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_7",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "IP ownership terms align with ASC 606 for Client ownership.",
                  },
                },
              ],
            },
            {
              stepName: "Step7: Revenue Recognition Specifics",
              id: "step_7",
              data: [
                {
                  id: "data_entry_15",
                  header: "Recognition Method",
                  title: "Over time, based on milestone achievements",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_8",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Revenue recognition based on milestone completion meets ASC 606 standards.",
                  },
                },
              ],
            },
            {
              stepName: "Step8: Documentation Requirements",
              id: "step_8",
              data: [
                {
                  id: "data_entry_16",
                  header: "Progress Reports",
                  title: "Weekly summary reports provided",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_17",
                  header: "Invoice Requirements",
                  title: "Detailed account of tasks against time in addenda",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_9",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Documentation requirements meet basic compliance, further specifics needed for enhanced traceability.",
                  },
                },
              ],
            },
            {
              stepName: "Step9: Allocation Methodology",
              id: "step_9",
              data: [
                {
                  id: "data_entry_18",
                  header: "Allocation Basis",
                  title: "Allocated by task and time as per Addenda agreements",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_10",
                    header: "ASC 606 Check",
                    status: "Compliant",
                    data: "Allocation basis compliant, defined by task in Addenda.",
                  },
                },
              ],
            },
            {
              stepName: "Step10: Compliance Check",
              id: "step_10",
              data: [
                {
                  id: "data_entry_19",
                  header: "Regulatory",
                  title: "Compliance with ICH GCP and relevant laws",
                  contractName: "Master Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_11",
                    header: "ASC 606 Final Verification",
                    status: "Compliant",
                    data: "Regulatory compliance aligns with ICH GCP and local regulations, meeting ASC 606 requirements.",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
];
const DealsDetails = () => {
  const pathname = usePathname();

  const id = pathname?.split("/").pop();
  const filteredId = reviewData.find((deal) => deal.id === id);
  const [activeContract, setActiveContract] = useState<string>(
    filteredId?.l1Review?.contracts[0].id || ""
  );
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
      <AnnotationsSidebar
        documentInformation={selectedDeal}
        activeContract={activeContract}
      />
      <div className="flex flex-col pl-6 w-full">
        <div className="flex justify-end p-4 w-full">
          {isReviewMarked === 0 ? (
            <Button
              color="primary-default"
              size="md"
              onClick={handleMarkReview}
              className="text-white"
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
          <DealsTabs
            reviewData={[selectedDeal.l1Review]}
            setActiveContract={setActiveContract}
          />{" "}
          {/* Passing L1 review data */}
        </div>
      </div>
    </div>
  );
};

export default DealsDetails;
