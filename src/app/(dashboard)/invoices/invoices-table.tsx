import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Invoice = {
  id: string;
  name: string;
  source: string;
  type_of_document: string;
  added_on: string;
  assignee: string;
  last_modified_on: string;
};

type InvoicesTableProps = {
  invoices: Invoice[];
};

const InvoicesTable: React.FC<InvoicesTableProps> = ({ invoices }) => {
  const router = useRouter();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const allSelected = selectedInvoices.length === invoices.length;

  // Handle individual row selection
  const toggleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(invoiceId)
        ? prevSelected.filter((id) => id !== invoiceId)
        : [...prevSelected, invoiceId]
    );
  };

  // Handle "Select All" functionality
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(invoices.map((invoice) => invoice.id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg shadow-md">
        <thead className="bg-[#F1EFE94D]">
          <tr>
            <th className="px-4 py-3 text-center w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="cursor-pointer"
              />
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Source
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Document Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Added On
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Assignee
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Last Modified On
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-100">
              <td className="px-4 py-4 text-center w-12">
                <input
                  type="checkbox"
                  checked={selectedInvoices.includes(invoice.id)}
                  onChange={() => toggleSelectInvoice(invoice.id)}
                  className="cursor-pointer"
                />
              </td>
              <td
                className="px-6 py-4 text-md font-bold font-nunito text-gray-700 underline cursor-pointer"
                onClick={() => router.push(`/invoices/${invoice.id}`)}
              >
                {invoice.name}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {invoice.source}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {invoice.type_of_document}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {invoice.added_on}
              </td>
              <td className="px-6 py-4 text-sm font-nunito font-normal text-gray-700">
                {invoice.assignee}
              </td>
              <td className="px-6 py-4 text-sm font-normal font-nunito text-gray-700">
                {invoice.last_modified_on}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
