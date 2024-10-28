"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/context/GlobalContext";

export default function LoginPage() {
  const { setIsAuthenticated } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("user@mail.com");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { msg } = await response.json();
        setError(msg || "Login failed");
        return;
      }

      // Handle success
      const { token, user } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userEmail", user.email);
      setIsAuthenticated(true);

      // Redirect to the home page
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="p-6">
      <p className="text-[22px] font-bold">Login</p>
      <div className="text-[13px] font-bold mt-4 text-gray-400">
        <p>
          The only platform that has{" "}
          <strong className="text-blue-600">
            official contracts with major exchanges
          </strong>{" "}
          is degenMax.
        </p>
        <p>If you join, you can earn USDT with various missions.</p>
      </div>

      <div className="w-full mt-[36px]">
        <form onSubmit={handleLogin} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex justify-end font-bold">
            <Link
              href="/forgot-password"
              className="text-[15px] text-blue-600 hover:underline"
            >
              Forget password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="text-center text-[15px] text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 underline">
              Sign Up
            </Link>
          </p>
          <Button
            type="submit"
            className="w-full bg-blue-200 text-white hover:bg-blue-600 py-6 rounded-xl text-lg"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
