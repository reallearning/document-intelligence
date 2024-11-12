import { RevenueScheduleData } from "@/types/review-contract";

const revenueScheduleData: RevenueScheduleData = {
  obligations: [
    {
      title: "Software License",
      recognition: "rateable over 36 months",
      amount: "$75,000",
    },
    {
      title: "Implementation Services",
      recognition: "milestone over 6 months",
      amount: "$50,000",
    },
    {
      title: "Training Services",
      recognition: "delivery over 12 months",
      amount: "$25,000",
    },
  ],
  revenueSchedule: [
    {
      period: "Q1 2024",
      license: "$6250",
      implementation: "$25,000",
      training: "$0",
      total: "$31,250",
    },
    {
      period: "Q2 2024",
      license: "$6250",
      implementation: "$25,000",
      training: "$10,000",
      total: "$41,250",
    },
    {
      period: "Q3 2024",
      license: "$6250",
      implementation: "$0",
      training: "$15,000",
      total: "$21,250",
    },
    {
      period: "Q4 2024",
      license: "$6250",
      implementation: "$0",
      training: "$0",
      total: "$6,250",
    },
  ],
};

export default function RevenueSchedule() {
  return (
    <div className="my-8 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 w-[95%]">
      {/* Performance Obligations Section */}
      <div className="bg-morrie-background p-4 rounded-lg min-w-[560px]">
        <p className="font-nunito font-medium text-base text-morrie-text mb-4">
          Performance Obligations
        </p>
        {revenueScheduleData.obligations.map((obligation, index) => (
          <div
            key={index}
            className="p-4 rounded-lg mb-3 flex justify-between items-center bg-white"
          >
            <div>
              <h4 className="font-nunito font-medium text-base text-black opacity-65">
                {obligation.title}
              </h4>
              <p className="font-nunito text-sm text-morrie-text">
                Recognition: {obligation.recognition}
              </p>
            </div>
            <span className="font-nunito font-medium text-2xl text-black opacity-55">
              {obligation.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue Schedule Section */}
      <div className="bg-morrie-background p-4 rounded-lg">
        <h3 className="font-nunito font-medium text-base text-morrie-text mb-4">
          Revenue Schedule
        </h3>
        <div className="p-2 bg-white rounded-xl text-black font-nunito font-medium text-base leading-[18px] text-opacity-50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                {[
                  "Period",
                  "License",
                  "Implementation",
                  "Training",
                  "Total",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="p-2 text-black font-nunito font-medium text-base leading-[18px] text-opacity-50 border-r border-[#D9D9D9] last:border-none text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="rounded-xl border-t border-[#D9D9D9]">
              {revenueScheduleData.revenueSchedule.map((entry, index) => (
                <tr
                  key={index}
                  className="bg-white text-black font-nunito font-medium text-base leading-[18px] text-opacity-50 text-center"
                >
                  <td className="p-4 border-r border-[#D9D9D9]">
                    {entry.period}
                  </td>
                  <td className="p-4 border-r border-[#D9D9D9]">
                    {entry.license}
                  </td>
                  <td className="p-4 border-r border-[#D9D9D9]">
                    {entry.implementation}
                  </td>
                  <td className="p-4 border-r border-[#D9D9D9]">
                    {entry.training}
                  </td>
                  <td className="p-4">{entry.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
