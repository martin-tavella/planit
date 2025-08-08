"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/img/logo/planit-only.png";
import { Menu, User, LogIn, UserPlus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const navItems = [
    { route: "/", label: "Home" },
    { route: "/dashboard", label: "My Dashboard" },
    { route: "/about", label: "About" },
  ];

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="relative bg-gradient-to-r from-[#1d0c37] to-[#2a1548] shadow-lg">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#a98af7] to-[#c4b5fd] shadow-[0_0_10px_rgba(169,138,247,0.5)]" />

      <div className="container mx-auto py-3 px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src={logo.src}
                alt="Planit logo"
                width={80}
                height={80}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-[#a98af7] text-4xl font-bold tracking-tight">
              Planit
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.route}
                    className="text-[#a98af7] font-medium text-[1.5rem] hover:text-[#c4b5fd] transition-all duration-300 relative group py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#a98af7] group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 text-[#a98af7] hover:text-[#c4b5fd] hover:bg-[#2a1548] transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#a98af7] flex items-center justify-center">
                        {user?.picture ? (
                          <Image src={user.picture} alt={user.name} width={37} height={37} className="rounded-full"/>
                        ) : (
                          <User className="w-10 h-10 text-[#1d0c37]" />
                        )}
                      </div>
                      <span className="font-medium text-lg">{user?.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-[#1d0c37] border-[#a98af7] text-[#a98af7]"
                  >
                    <DropdownMenuItem className="hover:bg-[#2a1548] hover:text-[#c4b5fd]">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#2a1548] hover:text-[#c4b5fd]">
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#a98af7]/20" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-[#2a1548] hover:text-[#c4b5fd]"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => (window.location.href = "/login")}
                    variant="ghost"
                    className="text-[#a98af7] hover:text-[#c4b5fd] hover:bg-[#2a1548] transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/register")}
                    className="bg-[#a98af7] text-[#1d0c37] hover:bg-[#c4b5fd] transition-all duration-300 font-medium"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#a98af7] hover:text-[#c4b5fd] hover:bg-[#2a1548]"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#1d0c37] border-l-[#a98af7] w-80 [&>button]:text-[#a98af7] [&>button]:hover:text-[#c4b5fd] [&>button]:w-8 [&>button]:h-8"
              >
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex flex-col gap-4 ml-6">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.route}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[#a98af7] font-medium text-lg hover:text-[#c4b5fd] transition-colors duration-300 py-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[#a98af7]/20 pt-6">
                    {isLoggedIn ? (
                      <div className="flex flex-col gap-4 mx-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#2a1548]">
                          <div className="w-10 h-10 rounded-full bg-[#a98af7] flex items-center justify-center">
                            {user?.picture ? (
                          <Image src={user.picture} alt={user.name} width={37} height={37} className="rounded-full"/>
                        ) : (
                          <User className="w-10 h-10 text-[#1d0c37]" />
                        )}
                          </div>
                          <div>
                            <p className="text-[#a98af7] font-medium">
                              {user?.name}
                            </p>
                            <p className="text-[#a98af7]/70 text-sm">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="border-[#a98af7] text-[#a98af7] hover:bg-[#a98af7] hover:text-[#1d0c37] bg-transparent"
                        >
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 mx-4">
                        <Button
                          onClick={() => (window.location.href = "/login")}
                          variant="outline"
                          className="border-[#a98af7] text-[#a98af7] hover:bg-[#a98af7] hover:text-[#1d0c37] bg-transparent"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                        <Button
                          onClick={() => (window.location.href = "/register")}
                          className="bg-[#a98af7] text-[#1d0c37] hover:bg-[#c4b5fd]"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
