import { ComplianceItem, ComplianceSection } from "@/types/review-contract";

export const complianceData: ComplianceSection[] = [
  {
    sectionTitle: "Contract Formation (ASC 606-10-25-1)",
    items: [
      {
        title: "Approved contract with commercial substance exists",
        evidence: "MSA signed by both parties",
        impact: "Contract qualifies for revenue recognition",
        status: "Compliant",
      },
      {
        title: "Payment terms identified",
        evidence: "Payment schedule pending in Order Form",
        impact: "Cannot determine collection probability",
        status: "Needs review",
      },
    ],
  },
  {
    sectionTitle: "Performance Obligations (ASC 606-10-25-14)",
    items: [
      {
        title: "Distinct goods/services identified",
        evidence: "Three distinct obligations identified",
        impact: "Can allocate transaction price",
        status: "Compliant",
      },
      {
        title: "Transfer pattern determined",
        evidence: "Recognition pattern defined for each obligation",
        impact: "Recognition schedule can be created",
        status: "Compliant",
      },
    ],
  },
];

const StatusBadge: React.FC<{ status: ComplianceItem["status"] }> = ({
  status,
}) => {
  const statusStyles =
    status === "Compliant"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`px-4 py-1 rounded-full text-[10px] font-medium font-nunito leading-[18px] ${statusStyles}`}
    >
      {status}
    </span>
  );
};

export default function ComplianceReview() {
  return (
    <div className="my-8 grid gap-0 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-[85%]">
      {complianceData.map((section: ComplianceSection) => (
        <div
          key={section.sectionTitle}
          className="bg-morrie-background p-4 rounded-lg mb-3 mr-5 max-w-[560px]"
        >
          <h3 className="font-nunito font-medium text-base leading-[18px] text-morrie-text mb-4">
            {section.sectionTitle}
          </h3>
          {section.items.map((item: ComplianceItem) => (
            <div
              key={item.title}
              className="bg-white p-4 rounded-lg shadow-sm mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-nunito font-medium text-base leading-[18px] text-black opacity-65">
                  {item.title}
                </h4>
                <StatusBadge status={item.status} />
              </div>
              <p className="font-nunito font-medium text-sm leading-[18px] text-morrie-text">
                <span className="font-semibold">Evidence:</span> {item.evidence}
              </p>
              <p className="font-nunito font-medium text-sm leading-[18px] text-morrie-text">
                <span className="font-semibold">Impact:</span> {item.impact}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
