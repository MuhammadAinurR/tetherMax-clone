"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="w-full pt-6 px-6">
      <div className="relative w-16 h-16">
        <Image
          src="https://tethermax.io/static/images/Bmeal.png"
          alt="Bitcoin logo"
          width={70}
          height={70}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <p className="font-bold mb-2 pt-7 text-[22px]">
        Welcome to{" "}
        <span className="text-blue-600">
          Crypto Trading Cashback Platform, degenMax
        </span>
      </p>
      <p className="text-gray-400 pt-3 text-[13px] font-bold">
        degenMax is a cashback platform that directly rebates the fees incurred
        by crypto traders
      </p>

      <form className="space-y-8 py-8">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowInviteCode(!showInviteCode)}
            className="flex items-center text-sm font-medium text-gray-700"
          >
            Friend invitation code (optional)
            <ChevronDownIcon
              className={`ml-1 h-4 w-4 transform ${
                showInviteCode ? "rotate-180" : ""
              }`}
            />
          </button>
          {showInviteCode && (
            <input
              type="text"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I have read and agree to the{" "}
            <Link href="#" className="text-blue-600 underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 underline">
              Privacy Policy
            </Link>{" "}
            of degenMax.
          </label>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>

        <Button
          type="submit"
          className="w-full bg-blue-200 text-white hover:bg-blue-600 py-6 rounded-xl text-lg"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
