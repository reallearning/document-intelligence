"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CarouselSlider from "./copmonents/carousel-slider";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const demoEmail = "dheeraj@questt.ai";
  const demoPassword = "questt123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (email === demoEmail && password === demoPassword) {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md login-tp">
            <div className="flex flex-col gap-3 items-start">
              <Image
                src="/logo.svg"
                alt="Logo image"
                width={50}
                height={50}
                className="rounded-full"
              />
              <p className="font-poly text-lg md:text-2xl font-normal leading-8 text-neutral-800 text-left">
                Create a new Workspace
              </p>
              <p className="font-nunito text-neutral-800 text-sm">
                Please login with the email you use for work
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#3c7167] text-white py-2 rounded-3xl font-nunito text-base font-normal hover:bg-[#264841]"
              >
                Login
              </button>
            </form>

            <div className="fixed bottom-10 w-[40%] left-[50%] translate-x-[-50%] md:left-[25%] md:translate-x-[-50%]">
              <p className=" text-xs text-neutral-500 text-center mt-4">
                By continuing, you agree to our{" "}
                <Link href="/privacy-policy" className="text-[#3DBCA2]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-and-conditions" className="text-[#3DBCA2]">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-[#f1efe9] p-8 relative">
        <CarouselSlider />
      </div>
    </div>
  );
}
