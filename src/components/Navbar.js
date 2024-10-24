"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center w-full h-16 bg-white text-gray-600 z-50 font-bold border">
      <div className="flex gap-6 items-center">
        <div className="flex items-center mb-1">
          <Link href="/">
            <Image
              src="/images/tethermax_logo.png"
              width={150}
              height={150}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/affiliated">
            <p
              className={
                isActive("/affiliated")
                  ? "text-blue-500"
                  : "hover:text-blue-500 hover:scale-105"
              }
            >
              Partner Exchange
            </p>
          </Link>
          <Link href="/service-intro">
            <p
              className={
                isActive("/service-intro")
                  ? "text-blue-500"
                  : "hover:text-blue-500 hover:scale-105"
              }
            >
              Service Introduction
            </p>
          </Link>
          <Link href="/payback">
            <p
              className={
                isActive("/payback")
                  ? "text-blue-500"
                  : "hover:text-blue-500 hover:scale-105"
              }
            >
              Calculator
            </p>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-[15px] font-thin">
          <button className="bg-blue-50 text-blue-700 px-[12px] py-[8px] rounded-lg">
            Login
          </button>
          <button className="bg-blue-700 text-white px-[12px] py-[8px] rounded-lg">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
