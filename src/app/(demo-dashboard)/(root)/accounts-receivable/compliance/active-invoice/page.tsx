"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const dummyData = [
  {
    id: "acme-tech",
    customerName: "ACME Technologies Inc.",
    activeInvoice: "INV-019-9126",
    invoiceAmount: "₹8,00,000",
    status: "Paid",
  },
  {
    id: "",
    customerName: "Beta Solutions",
    activeInvoice: "INV-019-1234",
    invoiceAmount: "₹356,250",
    status: "Pending",
  },
  {
    id: "",
    customerName: "Gamma Tech",
    activeInvoice: "INV-019-9126",
    invoiceAmount: "₹6,87,500",
    status: "Overdue",
  },
  {
    id: "",
    customerName: "Delta Health",
    activeInvoice: "INV-019-1234",
    invoiceAmount: "₹4,97,500",
    status: "Paid",
  },
  {
    id: "",
    customerName: "Epsilon Industries",
    activeInvoice: "INV-ANC-1434",
    invoiceAmount: "₹5,21,600",
    status: "Pending",
  },
];

export default function CompliancePage() {
  return (
    <div className="w-full p-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center ">
        <p className="font-poly text-xl font-normal text-black">
          Deal Dashboard
        </p>
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
        <InvoiceTable invoices={dummyData} />
      </div>
    </div>
  );
}

interface Invoice {
  id: string;
  customerName: string;
  activeInvoice: string;
  invoiceAmount: string;
  status: string;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  const router = useRouter();

  const handleClick = (index: number) => {
    if (index === 0) {
      router.push(`/accounts-receivable/compliance/acme-tech/reconciliation`);
    }
  };

  const StatusContainerCSS = (status: string) => {
    if (status === "Pending")
      return "bg-[#F5F3FF] text-[#7C3AED] px-3 py-1 rounded-lg text-xs";
    if (status === "Overdue")
      return "bg-[#ECFEFF] text-[#0891B2] px-3 py-1 rounded-lg text-xs";
    if (status === "Paid")
      return "bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-lg text-xs";
    return "";
  };

  return (
    <div className="p-4 border border-[#E2E8F0] rounded-2xl h-full w-full">
      <div className="flex items-center">
        <Image
          src="/book.svg"
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
                Customer Name
              </th>
              <th className="px-4 py-2">Recent Invoice</th>
              <th className="px-4 py-2">Invoice Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr
                key={idx}
                className={`text-sm text-[#1E293B] font-normal border-b border-[#E2E8F0] ${
                  idx === invoices.length - 1 ? "border-transparent" : ""
                }`}
              >
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleClick(idx)}
                >
                  {invoice.customerName}
                </td>
                <td className="px-4 py-3">{invoice.activeInvoice}</td>
                <td className="px-4 py-3">{invoice.invoiceAmount}</td>
                <td className="px-4 py-3">
                  {invoice.status && (
                    <span className={`${StatusContainerCSS(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Image
                    src="/dots.svg"
                    alt="dots"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
