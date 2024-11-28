interface IContractInfoCardProps {
  label: string;
  value: string;
}

export default function ContractInfoCard({
  label,
  value,
}: IContractInfoCardProps) {
  return (
    <div className="min-h-[82px] min-w-[160px] pt-3 px-3 pb-5 rounded-xl bg-morrie-background font-nunito font-medium leading-[18px]">
      <p className="text-xs text-[#8C8C8C] mb-3">{label}</p>
      <p className=" text-[22px] leading-[18px] text-black opacity-50">
        {value}
      </p>
    </div>
  );
}
