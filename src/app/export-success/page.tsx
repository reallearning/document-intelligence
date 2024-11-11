import Image from "next/image";

export default function ExportSuccess() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center bg-morrie-background"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="bg-white w-[50%] h-[50%] rounded-lg shadow-lg flex flex-col justify-center items-center">
        <p className="font-poly font-normal text-black text-[38px] leading-[18px] mb-6">
          All data successfully exported!
        </p>
        <Image
          src="/export-success.svg"
          alt="Export Successful"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
}
