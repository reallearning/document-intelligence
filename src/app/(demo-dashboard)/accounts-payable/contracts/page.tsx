"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const invoices = [
  {
    id: "phoenix-supplies",
    name: "INV-PHSP-0002",
    source: "SAP",
    type_of_document: "Invoice",
    added_on: "01-Dec-2023",
    assignee: "accounts@phoenix.com",
    last_modified_on: "06-Dec-2023",
  },
  {
    id: "invoice-03",
    name: "INV-PAX-0003",
    source: "QuickBooks",
    type_of_document: "Invoice",
    added_on: "01-Dec-2023",
    assignee: "billing@paxmedica.com",
    last_modified_on: "07-Dec-2023",
  },
  {
    id: "invoice-01",
    name: "INV-OAK-0001",
    source: "Salesforce",
    type_of_document: "Invoice",
    added_on: "01-Dec-2023",
    assignee: "finance@oaktree.com",
    last_modified_on: "05-Dec-2023",
  },
  {
    id: "invoice-04",
    name: "INV-ALPHA-0004",
    source: "NetSuite",
    type_of_document: "Invoice",
    added_on: "02-Dec-2023",
    assignee: "finance@alphafintech.com",
    last_modified_on: "08-Dec-2023",
  },
  {
    id: "invoice-05",
    name: "INV-ZEN-0005",
    source: "Zoho Books",
    type_of_document: "Invoice",
    added_on: "02-Dec-2023",
    assignee: "accounting@zenith.com",
    last_modified_on: "09-Dec-2023",
  },
  {
    id: "invoice-06",
    name: "INV-GAM-0006",
    source: "Xero",
    type_of_document: "Invoice",
    added_on: "03-Dec-2023",
    assignee: "finance@gamma.com",
    last_modified_on: "10-Dec-2023",
  },
  {
    id: "invoice-07",
    name: "INV-BLUE-0007",
    source: "FreshBooks",
    type_of_document: "Invoice",
    added_on: "03-Dec-2023",
    assignee: "billing@blueocean.com",
    last_modified_on: "11-Dec-2023",
  },
  {
    id: "invoice-08",
    name: "INV-SIG-0008",
    source: "SAP",
    type_of_document: "Invoice",
    added_on: "04-Dec-2023",
    assignee: "accounts@sigmasolutions.com",
    last_modified_on: "12-Dec-2023",
  },
  {
    id: "invoice-09",
    name: "INV-DELTA-0009",
    source: "Oracle",
    type_of_document: "Invoice",
    added_on: "04-Dec-2023",
    assignee: "billing@deltahealth.com",
    last_modified_on: "13-Dec-2023",
  },
  {
    id: "invoice-10",
    name: "INV-BETA-0010",
    source: "SAP",
    type_of_document: "Invoice",
    added_on: "05-Dec-2023",
    assignee: "finance@beta.com",
    last_modified_on: "14-Dec-2023",
  },
];

export default function CompliancePage() {
  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">Contracts</p>
        <div className="flex items-center">
          <div className="mr-6">
            <p className="font-poly font-normal text-sm text-black">
              Ananda Faris
            </p>
            <p className="font-poly font-normal text-[10px] text-[#9CA3AF]">
              AP Accountant
            </p>
          </div>
          <Image src="/dots.svg" alt="dots" width={24} height={24} />
        </div>
      </div>
      <div className="border border-[#E2E8F0]  mt-5 p-6">
        <VendorsTable invoices={invoices} />
      </div>
    </div>
  );
}

interface Invoice {
  id: string;
  name: string;
  source: string;
  type_of_document: string;
  added_on: string;
  assignee: string;
  last_modified_on: string;
}

interface VendorsTableProps {
  invoices: Invoice[];
}

const VendorsTable: React.FC<VendorsTableProps> = ({ invoices }) => {
  const router = useRouter();

  const handleClick = (redirectTo: string, index: number) => {
    if (index === 0 && redirectTo) {
      router.push(`contracts/${redirectTo}`);
    }
  };

  const StatusContainerCSS = (status: string) => {
    if (status === "Pending")
      return "bg-[#D0121229] text-[#DC2626] px-3 py-1 rounded-lg text-xs";
    if (status === "Completed")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  const DealTypeContainerCSS = (deal: string) => {
    if (deal === "Direct Deal")
      return "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1 rounded-lg text-xs";
    if (deal === "Reseller Deal")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (deal === "Novel")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center">
        <Image
          src="/users.svg"
          alt="dots"
          width={24}
          height={24}
          className="mr-2"
        />
        <p className="font-nunito font-medium text-sm text-[#111827]">
          All Deals
        </p>
      </div>
      <div className="mt-4 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm font-medium text-[#9CA3AF] bg-[#F9FAFB]">
              <th className="rounded-tl-xl rounded-bl-xl px-4 py-2">
                Invoice Name
              </th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Assignee</th>
              <th className="px-4 py-2">Added On</th>
              <th className="px-4 py-2">Last Modified</th>
              <th className="rounded-tr-xl rounded-br-xl px-4 py-2">
                Document Type
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr
                key={invoice.id}
                className={`text-sm text-[#1E293B] font-normal border-b border-[#E2E8F0] ${
                  idx === invoices.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleClick(invoice.id, idx)}
                >
                  {invoice.name}
                </td>
                <td className="px-4 py-3">{invoice.source}</td>
                <td className="px-4 py-3">{invoice.assignee}</td>
                <td className="px-4 py-3">{invoice.added_on}</td>
                <td className="px-4 py-3">{invoice.last_modified_on}</td>
                <td className="px-4 py-3">{invoice.type_of_document}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
