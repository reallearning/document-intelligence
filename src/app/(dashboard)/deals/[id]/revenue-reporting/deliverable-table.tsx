// data.ts
// types.ts

"use client";
import React from "react";

export type Deliverable = {
  id: string;
  name: string;
  category: string;
  amount: string;
  dueDate: string;
  status: "Completed" | "Due" | "In progress" | "Delayed" | "Scheduled";
};

export const deliverables: Deliverable[] = [
  {
    id: "DEL-001",
    name: "Q1 2024 License",
    category: "Software License",
    amount: "$18,750",
    dueDate: "2024-01-15",
    status: "Completed",
  },
  {
    id: "DEL-002",
    name: "Planning Phase",
    category: "Implementation Services",
    amount: "$10,000",
    dueDate: "2024-01-31",
    status: "Completed",
  },
  {
    id: "DEL-003",
    name: "Setup Phase",
    category: "Implementation Services",
    amount: "$15,000",
    dueDate: "2024-02-28",
    status: "Completed",
  },
  {
    id: "DEL-004",
    name: "Q2 2024 License",
    category: "Software License",
    amount: "$18,750",
    dueDate: "2024-04-01",
    status: "Due",
  },
  {
    id: "DEL-005",
    name: "Testing Phase",
    category: "Implementation Services",
    amount: "$15,000",
    dueDate: "2024-03-31",
    status: "In progress",
  },
  {
    id: "DEL-006",
    name: "Basic Training",
    category: "Training Services",
    amount: "$10,000",
    dueDate: "2024-03-15",
    status: "Delayed",
  },
  {
    id: "DEL-007",
    name: "Go-Live Support",
    category: "Implementation Services",
    amount: "$10,000",
    dueDate: "2024-04-30",
    status: "Scheduled",
  },
];

const statusColors: { [key: string]: string } = {
  Completed: "bg-[#3C716742] text-[#3C7167]",
  Due: "bg-[#EFB18078] text-[#D07012]",
  "In progress": "bg-[#00A1E033] text-[#00A1E0]",
  Delayed: "bg-[#D0121229] text-[#D01212]",
  Scheduled: "bg-[#D9D9D9] text-[#8C8C8C]",
};

const DeliverableTable: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#F1EFE9] rounded-lg shadow-md text-black">
      <h2 className="text-[#9C9C9C] text-md font-medium mb-4">
        Deliverable & Invoice Tracking
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-[#D9D9D959] font-nunito font-bold text-md">
            <tr>
              <th className="px-4 py-3 text-left border-b">ID</th>
              <th className="px-4 py-3 text-left border-b">Deliverable</th>
              <th className="px-4 py-3 text-left border-b">Category</th>
              <th className="px-4 py-3 text-left border-b">Amount</th>
              <th className="px-4 py-3 text-left border-b">Due Date</th>
              <th className="px-4 py-3 text-left border-b">Status</th>
            </tr>
          </thead>
          <tbody className="font-nunito font-normal text-md">
            {deliverables.map((deliverable) => (
              <tr key={deliverable.id} className="">
                <td className="px-4 py-4">{deliverable.id}</td>
                <td className="px-4 py-4">{deliverable.name}</td>
                <td className="px-4 py-4">{deliverable.category}</td>
                <td className="px-4 py-4">{deliverable.amount}</td>
                <td className="px-4 py-4">{deliverable.dueDate}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[deliverable.status]
                    }`}
                  >
                    {deliverable.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliverableTable;
