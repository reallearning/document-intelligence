"use client";
import Image from "next/image";
import Link from "next/link";
import CarouselSlider from "./components/carousel-slider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@/components/loader";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md login-tp">
            <div className="flex flex-col gap-3 items-start">
              <Image
                src="/cfo-logo.svg"
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

            <button
              className="flex items-center justify-center gap-2 px-5 py-2 w-full rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 mt-10"
              onClick={handleLogin}
            >
              {loading ? <Loader /> : (
                <div className="flex items-center">
                  <Image
                    src="/google.svg"
                    alt="Google icon"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span className="font-nunito font-medium text-base">
                    Continue with Google
                  </span>
                </div>
              )}
            </button>

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
