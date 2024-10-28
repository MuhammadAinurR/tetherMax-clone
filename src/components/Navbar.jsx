"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/GlobalContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isActive = (path) => pathname === path;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);
  const menuList = isAuthenticated
    ? [
        {
          name: "Partner Exchange",
          path: "/affiliated",
        },
        {
          name: "Benefits",
          path: "/benefit",
        },
        {
          name: "App Download",
          path: "/download",
        },
      ]
    : [
        {
          name: "Partner Exchange",
          path: "/affiliated",
        },
        {
          name: "Service Introduction",
          path: "/service-intro",
        },
        {
          name: "Calculator",
          path: "/payback",
        },
      ];
  return (
    <div className="fixed top-0 left-0 right-0 flex px-5 md:justify-center items-center w-full h-[52px] md:h-16 bg-white text-gray-500 z-50 font-bold border">
      <div className="flex gap-6 items-center">
        <button
          className="md:hidden fixed top-4 right-8"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* mobile navbar */}
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
            <div className="flex flex-col gap-4 p-4">
              {[
                {
                  name: "Home",
                  path: "/",
                },
                {
                  name: "Login",
                  path: "/login",
                },
                {
                  name: "Register",
                  path: "/signup",
                },
                ...menuList,
              ].map((menu, idx) => {
                return (
                  <Link key={idx} href={menu.path} onClick={toggleSidebar}>
                    <p
                      className={
                        isActive(menu.path)
                          ? "text-blue-500"
                          : "hover:text-blue-500 hover:scale-105"
                      }
                    >
                      {menu.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* <Link href="/">
            <Image
              src="/images/tethermax_logo.png"
              width={150}
              height={150}
              alt="Picture of the author"
            />
          </Link> */}
        <Link href="/">
          <p className="text-[#0261F2] text-2xl">degenMax</p>
        </Link>

        {/* desktop navbar */}
        <div className="gap-6 items-center hidden md:flex">
          {menuList.map((menu, idx) => {
            return (
              <Link key={idx} href={menu.path}>
                <p
                  className={
                    isActive(menu.path)
                      ? "text-blue-500"
                      : "hover:text-blue-500 hover:scale-105"
                  }
                >
                  {menu.name}
                </p>
              </Link>
            );
          })}
        </div>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="hover:cursor-pointer">User Code: {userId}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <span
                  onClick={() => {
                    localStorage.clear();
                    setIsAuthenticated(false);
                    router.push("/");
                  }}
                >
                  Log out
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden md:flex items-center gap-3 text-[15px] font-thin">
            <Link href="/login">
              <button className="bg-blue-50 text-blue-700 px-[12px] py-[8px] rounded-lg">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-blue-700 text-white px-[12px] py-[8px] rounded-lg">
                Sign up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
