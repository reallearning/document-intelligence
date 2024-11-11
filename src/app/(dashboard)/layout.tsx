import { Sidebar } from "../components/sidebar";

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar />
      <main className="flex flex-1 h-full">{children}</main>
    </div>
  );
}
