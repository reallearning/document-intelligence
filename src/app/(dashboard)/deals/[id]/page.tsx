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
              stepName: "Step1: General Contract Data",
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
                  compliance: null,
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
                  compliance: null,
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
              stepName: "Step1: General Contract Data",
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
                  compliance: null,
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
                  compliance: null,
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
        {
          id: "invoice_001",
          name: "Invoice",
          pdfUrl: "/documents/contracts/rizee-invoice.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Invoice Number",
                  title: "0000",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Invoice number verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Invoice Date",
                  title: "01/12/2023",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Vendor Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_3",
                  header: "Legal Name",
                  title: "Rise Education Group",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Address",
                  title:
                    "Room C209, Building 1, No.8 Huanhe West Road, Airport Economic Zone, Tianjin, China",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Recipient Details",
              id: "step_3",
              data: [
                {
                  id: "data_entry_5",
                  header: "Invoice To",
                  title: "Service Recipient, Beijing, China",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Services Rendered",
              id: "step_4",
              data: [
                {
                  id: "data_entry_6",
                  header: "Academic Support Services",
                  title: "£2500.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Enrollment Support Services",
                  title: "£1500.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Customer Support Services",
                  title: "£1000.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step5: Totals",
              id: "step_5",
              data: [
                {
                  id: "data_entry_9",
                  header: "Subtotal",
                  title: "£5000.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_10",
                  header: "Discount",
                  title: "£0.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_11",
                  header: "VAT",
                  title: "£0.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_12",
                  header: "Invoice Total",
                  title: "£5000.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
          ],
        },
        {
          id: "po_01",
          name: "Purchase Order",
          pdfUrl: "/documents/contracts/po-risee.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "PO-RISE-0002",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "example1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Document ID verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Issue Date",
                  title: "20-Nov-2023",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Document Name",
                  title: "Purchase Order for Educational Support Services",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Source",
                  title: "QuickBooks",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Services Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_5",
                  header: "Academic Support Services",
                  title: "Quantity: 1, Price: £2500.00, Amount: £2500.00",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_6",
                  header: "Enrollment Support Services",
                  title: "Quantity: 1, Price: £1500.00, Amount: £1500.00",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Customer Support Services",
                  title: "Quantity: 1, Price: £1000.00, Amount: £1000.00",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Financial Summary",
              id: "step_3",
              data: [
                {
                  id: "data_entry_8",
                  header: "Total Amount",
                  title: "£5000.00",
                  contractName: "Educational Support Services",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
          ],
        },
        {
          id: "so_rise_01",
          name: "Sales Order",
          pdfUrl: "/documents/contracts/so-risee.pdf",
          steps: [
            {
              stepName: "Step1: Basic Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "SO-RISE-0002",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@rise.com",
                      profileUrl: "https://profile1.url",
                      message: "Document ID verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Issued On",
                  title: "18-Nov-2023",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Document Name",
                  title: "Sales Order for Educational Support Services",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Source",
                  title: "SAP",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Service Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_5",
                  header: "Academic Support Services",
                  title: "Qty: 1, Price: £2500.00, Amount: £2500.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_6",
                  header: "Enrollment Support Services",
                  title: "Qty: 1, Price: £1500.00, Amount: £1500.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Customer Support Services",
                  title: "Qty: 1, Price: £1000.00, Amount: £1000.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Total Amount",
                  title: "£5000.00",
                  contractName: "Rise Education Group",
                  matches: null,
                  comments: [],
                  compliance: null,
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
              stepName: "Step1: General Contract Data",
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
                  compliance: null,
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
                  compliance: null,
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
        {
          id: "invoice_paxmedica",
          name: "Invoice",
          pdfUrl: "/documents/contracts/paxmedica-invoice.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Invoice Number",
                  title: "0000",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@paxmedica.com",
                      profileUrl: "https://profile1.url",
                      message: "Invoice number confirmed.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Invoice Date",
                  title: "01/12/2021",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_2",
                      senderMail: "reviewer2@paxmedica.com",
                      profileUrl: "https://profile2.url",
                      message: "Invoice date verified.",
                      date: "2024-11-12",
                      time: "10:05 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Vendor Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_3",
                  header: "Legal Name",
                  title: "Paxmedica Inc.",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_3",
                      senderMail: "reviewer3@paxmedica.com",
                      profileUrl: "https://profile3.url",
                      message: "Legal name confirmed.",
                      date: "2024-11-12",
                      time: "10:10 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Address",
                  title:
                    "1266 East Main Street, Suite 700R, Stamford, CT 06902, USA",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_4",
                      senderMail: "reviewer4@paxmedica.com",
                      profileUrl: "https://profile4.url",
                      message: "Address verified for accuracy.",
                      date: "2024-11-12",
                      time: "10:15 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Client Details",
              id: "step_3",
              data: [
                {
                  id: "data_entry_5",
                  header: "Client Name",
                  title: "CAO Consulting (Pty) Limited",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_5",
                      senderMail: "reviewer5@paxmedica.com",
                      profileUrl: "https://profile5.url",
                      message: "Client name checked and confirmed.",
                      date: "2024-11-12",
                      time: "10:20 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_6",
                  header: "Client Address",
                  title:
                    "OnQ House 250 Market Street, Fairland Johannesburg, South Africa",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_6",
                      senderMail: "reviewer6@paxmedica.com",
                      profileUrl: "https://profile6.url",
                      message: "Client address validated.",
                      date: "2024-11-12",
                      time: "10:25 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Invoice Details",
              id: "step_4",
              data: [
                {
                  id: "data_entry_7",
                  header: "Description",
                  title: "Clinical research services",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_7",
                      senderMail: "reviewer7@paxmedica.com",
                      profileUrl: "https://profile7.url",
                      message: "Description of services confirmed.",
                      date: "2024-11-12",
                      time: "10:30 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Quantity",
                  title: "1",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_8",
                      senderMail: "reviewer8@paxmedica.com",
                      profileUrl: "https://profile8.url",
                      message: "Quantity verified as correct.",
                      date: "2024-11-12",
                      time: "10:35 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_9",
                  header: "Unit Price",
                  title: "£5000.00",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_9",
                      senderMail: "reviewer9@paxmedica.com",
                      profileUrl: "https://profile9.url",
                      message: "Unit price checked.",
                      date: "2024-11-12",
                      time: "10:40 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_10",
                  header: "Description",
                  title: "Weekly reporting services",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_10",
                      senderMail: "reviewer10@paxmedica.com",
                      profileUrl: "https://profile10.url",
                      message: "Service description confirmed.",
                      date: "2024-11-12",
                      time: "10:45 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_11",
                  header: "Quantity",
                  title: "1",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_11",
                      senderMail: "reviewer11@paxmedica.com",
                      profileUrl: "https://profile11.url",
                      message: "Quantity for weekly reporting verified.",
                      date: "2024-11-12",
                      time: "10:50 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_12",
                  header: "Unit Price",
                  title: "£800.00",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_12",
                      senderMail: "reviewer12@paxmedica.com",
                      profileUrl: "https://profile12.url",
                      message: "Price for weekly reporting confirmed.",
                      date: "2024-11-12",
                      time: "10:55 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step5: Financial Summary",
              id: "step_5",
              data: [
                {
                  id: "data_entry_13",
                  header: "Subtotal",
                  title: "£5800.00",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_13",
                      senderMail: "reviewer13@paxmedica.com",
                      profileUrl: "https://profile13.url",
                      message: "Subtotal calculated correctly.",
                      date: "2024-11-12",
                      time: "11:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_14",
                  header: "Discount",
                  title: "£0.00",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_14",
                      senderMail: "reviewer14@paxmedica.com",
                      profileUrl: "https://profile14.url",
                      message: "No discount applied.",
                      date: "2024-11-12",
                      time: "11:05 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_15",
                  header: "VAT (0%)",
                  title: "£0.00",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_15",
                      senderMail: "reviewer15@paxmedica.com",
                      profileUrl: "https://profile15.url",
                      message: "VAT confirmed at 0%.",
                      date: "2024-11-12",
                      time: "11:10 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_16",
                  header: "Invoice Total",
                  title: "£5800.00",
                  contractName: "Paxmedica Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_16",
                      senderMail: "reviewer16@paxmedica.com",
                      profileUrl: "https://profile16.url",
                      message: "Invoice total confirmed.",
                      date: "2024-11-12",
                      time: "11:15 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
          ],
        },
        {
          id: "PO_Paxmedica_001",
          name: "Purchase Order",
          pdfUrl: "/documents/contracts/paxmedica-po.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "PO-PAX-0003",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Verified document ID for accuracy.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Document Name",
                  title: "Purchase Order for Clinical Research Services",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Source",
                  title: "SAP",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Issued On",
                  title: "25-Nov-2023",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Order Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_5",
                  header: "Description",
                  title: "Clinical research services",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_6",
                  header: "Quantity",
                  title: "1",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Price",
                  title: "£5000.00",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Amount",
                  title: "£5000.00",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Additional Services",
              id: "step_3",
              data: [
                {
                  id: "data_entry_9",
                  header: "Description",
                  title: "Weekly reporting services",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_10",
                  header: "Quantity",
                  title: "1",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_11",
                  header: "Price",
                  title: "£800.00",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_12",
                  header: "Amount",
                  title: "£800.00",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Total",
              id: "step_4",
              data: [
                {
                  id: "data_entry_13",
                  header: "Total Amount",
                  title: "£5800.00",
                  contractName: "Paxmedica Purchase Order",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
          ],
        },
        {
          id: "sales_order_paxmedica",
          name: "Sales order",
          pdfUrl: "/documents/contracts/so-paxmedica.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "SO-PAX-0003",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "example1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Document ID verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Issued On",
                  title: "22-Nov-2023",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [
                    {
                      id: "comment_2",
                      senderMail: "example2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Issued date confirmed.",
                      date: "2024-11-12",
                      time: "10:15 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Document Name",
                  title: "Sales Order for Clinical Research Services",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [
                    {
                      id: "comment_3",
                      senderMail: "example3@mail.com",
                      profileUrl: "https://profile3.url",
                      message: "Document name matches project details.",
                      date: "2024-11-12",
                      time: "10:30 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Source",
                  title: "QuickBooks",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_5",
                  header: "Assignee",
                  title: "sales@paxmedica.com",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Service Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_6",
                  header: "Description",
                  title: "Clinical research services",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Quantity",
                  title: "1",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Price",
                  title: "£5000.00",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_9",
                  header: "Amount",
                  title: "£5000.00",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Additional Services",
              id: "step_3",
              data: [
                {
                  id: "data_entry_10",
                  header: "Description",
                  title: "Weekly reporting services",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_11",
                  header: "Quantity",
                  title: "1",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_12",
                  header: "Price",
                  title: "£800.00",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_13",
                  header: "Amount",
                  title: "£800.00",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Total Amount",
              id: "step_4",
              data: [
                {
                  id: "data_entry_14",
                  header: "Total Amount",
                  title: "£5800.00",
                  contractName: "Paxmedica Clinical Research",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: "deal_001",
    clientName: "Bright Future Corp",
    assignedTo: "support@brightfuturecorp.com",
    l1Review: {
      reviewName: "L1 review",
      contracts: [
        {
          id: "contract_001",
          name: "Service Agreement",
          pdfUrl: "/documents/contracts/medhaj-contract.pdf",
          steps: [
            {
              stepName: "Step1: General Contract data",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Document ID",
                  title: "Not specified",
                  contractName: "Service Agreement",
                  matches: {
                    numberOfMatches: 1,
                    sourceImageUrl: "/salesforce",
                    header: "Document ID",
                    data: "BRIGHTFUTURECORP_01_15_2024-EX-10.12",
                    tag: "Important",
                  },
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
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Contract Type",
                  title: "Service Agreement",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Version Number",
                  title: "Not specified",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Effective Date",
                  title: "January 15, 2024",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_5",
                  header: "Execution Date",
                  title: "January 15, 2024",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_6",
                  header: "Page Count",
                  title: "Not specified",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Parties & Authority",
              id: "step_2",
              data: [
                {
                  id: "data_entry_7",
                  header: "Contract Parties",
                  title: "Acme Technologies, Inc. and Bright Future Corp",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Entity Types",
                  title: "Delaware Corporation and Texas LLC",
                  contractName: "Service Agreement",
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
                  id: "data_entry_9",
                  header: "Addresses Listed",
                  title:
                    "123 Innovation Way, San Francisco, CA; 789 Commerce Ave, Austin, TX",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_10",
                  header: "Signatory Authority Verified",
                  title: "CEO of Acme and COO of Bright Future",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_4",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Signatory authority is verified but lacks specific verification details.",
                  },
                },
              ],
            },
            {
              stepName: "Step3: Financial Terms",
              id: "step_3",
              data: [
                {
                  id: "data_entry_11",
                  header: "Payment Terms",
                  title: "Quarterly invoicing; $150,000 total value",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_5",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Payment terms defined but lack full variable consideration details.",
                  },
                },
                {
                  id: "data_entry_12",
                  header: "Currency Specified",
                  title: "USD",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: null,
                },
                {
                  id: "data_entry_13",
                  header: "Late Payment Terms",
                  title: "1.5% per month on overdue payments",
                  contractName: "Service Agreement",
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
                  id: "data_entry_14",
                  header: "Scope of Work",
                  title: "Consulting, IT, and digital transformation",
                  contractName: "Service Agreement",
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
                  id: "data_entry_15",
                  header: "Service Levels",
                  title: "Defined by quarterly milestones",
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
                  id: "data_entry_16",
                  header: "Termination Rights",
                  title: "30 days' notice for cause; 90 days' for convenience",
                  contractName: "Service Agreement",
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
                  id: "data_entry_17",
                  header: "IP Ownership",
                  title: "Client owns deliverables upon payment completion.",
                  contractName: "Service Agreement",
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
                  id: "data_entry_18",
                  header: "Recognition Method",
                  title: "Over time as services are rendered",
                  contractName: "Service Agreement",
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
                  id: "data_entry_19",
                  header: "Data Privacy",
                  title: "Confidentiality terms specified",
                  contractName: "Service Agreement",
                  matches: null,
                  comments: [],
                  compliance: {
                    id: "compliance_12",
                    header: "ASC 606 Check",
                    status: "Partially compliant",
                    data: "Data privacy is specified but lacks a formal data protection policy.",
                  },
                },
              ],
            },
            {
              stepName: "Step9: Allocation Methodology",
              id: "step_9",
              data: [
                {
                  id: "data_entry_20",
                  header: "Standalone Prices",
                  title: "Not specified",
                  contractName: "Service Agreement",
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
                  id: "data_entry_21",
                  header: "Regulatory",
                  title: "Compliance with industry data privacy standards",
                  contractName: "Service Agreement",
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
        {
          id: "invoice_INV-002",
          name: "Invoice 1",
          pdfUrl: "/documents/contracts/medhaj-invoice-002.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Invoice Number",
                  title: "INV-002",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Invoice number verified.",
                      date: "2024-02-15",
                      time: "09:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Invoice Date",
                  title: "2024-02-15",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_2",
                      senderMail: "reviewer2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Invoice date aligns with contract terms.",
                      date: "2024-02-15",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Due Date",
                  title: "2024-02-20",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_3",
                      senderMail: "reviewer3@mail.com",
                      profileUrl: "https://profile3.url",
                      message: "Due date noted as 5 days from invoice date.",
                      date: "2024-02-15",
                      time: "10:15 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_4",
                  header: "Service Provider",
                  title:
                    "Acme Technologies, Inc., 123 Innovation Way, San Francisco, CA 94105",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_4",
                      senderMail: "reviewer4@mail.com",
                      profileUrl: "https://profile4.url",
                      message: "Service provider details verified.",
                      date: "2024-02-15",
                      time: "10:30 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_5",
                  header: "Bill To",
                  title:
                    "Bright Future Corp, 789 Commerce Ave, Austin, TX 78701",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_5",
                      senderMail: "reviewer5@mail.com",
                      profileUrl: "https://profile5.url",
                      message: "Billing recipient confirmed.",
                      date: "2024-02-15",
                      time: "10:45 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_6",
                  header: "Description",
                  title: "Invoice for Implementation and Training Services",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_6",
                      senderMail: "reviewer6@mail.com",
                      profileUrl: "https://profile6.url",
                      message: "Service description matches contract scope.",
                      date: "2024-02-15",
                      time: "11:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Amount Due",
                  title: "$15,000",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_7",
                      senderMail: "reviewer7@mail.com",
                      profileUrl: "https://profile7.url",
                      message: "Amount due is accurate per contract.",
                      date: "2024-02-15",
                      time: "11:15 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Status",
                  title: "Due in 5 days",
                  contractName: "Acme Technologies",
                  matches: null,
                  comments: [
                    {
                      id: "comment_8",
                      senderMail: "reviewer8@mail.com",
                      profileUrl: "https://profile8.url",
                      message: "Status indicates payment is due soon.",
                      date: "2024-02-15",
                      time: "11:30 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
          ],
        },
        {
          id: "invoice_INV-001",
          name: "Invoice 2",
          pdfUrl: "/documents/contracts/medhaj-invoice-001.pdf",
          steps: [
            {
              stepName: "Step1: General Information",
              id: "step_1",
              data: [
                {
                  id: "data_entry_1",
                  header: "Invoice Number",
                  title: "INV-001",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_1",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Invoice number verified.",
                      date: "2024-11-12",
                      time: "10:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_2",
                  header: "Invoice Date",
                  title: "2024-02-10",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_2",
                      senderMail: "reviewer2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Invoice date appears correct.",
                      date: "2024-11-12",
                      time: "11:00 AM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_3",
                  header: "Due Date",
                  title: "2024-03-10",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_3",
                      senderMail: "reviewer3@mail.com",
                      profileUrl: "https://profile3.url",
                      message: "Due date aligns with terms.",
                      date: "2024-11-12",
                      time: "12:00 PM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step2: Service Provider Details",
              id: "step_2",
              data: [
                {
                  id: "data_entry_4",
                  header: "Service Provider",
                  title:
                    "Acme Technologies, Inc., 123 Innovation Way, San Francisco, CA 94105",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_4",
                      senderMail: "reviewer1@mail.com",
                      profileUrl: "https://profile1.url",
                      message: "Service provider address confirmed.",
                      date: "2024-11-12",
                      time: "10:30 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step3: Billing Information",
              id: "step_3",
              data: [
                {
                  id: "data_entry_5",
                  header: "Bill To",
                  title:
                    "Bright Future Corp, 789 Commerce Ave, Austin, TX 78701",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_5",
                      senderMail: "reviewer2@mail.com",
                      profileUrl: "https://profile2.url",
                      message: "Billing details verified.",
                      date: "2024-11-12",
                      time: "11:30 AM",
                    },
                  ],
                  compliance: null,
                },
              ],
            },
            {
              stepName: "Step4: Description and Amount",
              id: "step_4",
              data: [
                {
                  id: "data_entry_6",
                  header: "Description",
                  title:
                    "Payment received for services rendered (Implementation Services)",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_6",
                      senderMail: "reviewer3@mail.com",
                      profileUrl: "https://profile3.url",
                      message: "Description aligns with contract scope.",
                      date: "2024-11-12",
                      time: "12:30 PM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_7",
                  header: "Amount Due",
                  title: "$35,000",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_7",
                      senderMail: "reviewer4@mail.com",
                      profileUrl: "https://profile4.url",
                      message: "Amount due confirmed as paid.",
                      date: "2024-11-12",
                      time: "01:00 PM",
                    },
                  ],
                  compliance: null,
                },
                {
                  id: "data_entry_8",
                  header: "Status",
                  title: "Paid",
                  contractName: "Acme Technologies, Inc.",
                  matches: null,
                  comments: [
                    {
                      id: "comment_8",
                      senderMail: "reviewer5@mail.com",
                      profileUrl: "https://profile5.url",
                      message: "Payment status verified.",
                      date: "2024-11-12",
                      time: "01:30 PM",
                    },
                  ],
                  compliance: null,
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
