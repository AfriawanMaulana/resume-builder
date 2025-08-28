"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ikon hamburger
import { ToggleTheme } from "./ToggleTheme";

const Navbar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Features", url: "/features" },
    { name: "Blog", url: "/blog" },
    { name: "FAQ", url: "/faq" },
  ];

  return (
    <nav className="py-4 px-6 md:px-10 sticky w-full top-0 z-50 bg-transparent backdrop-blur-md flex items-center justify-between">
      {/* Logo */}
      <Link href={'/'} className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 64 64"
        >
          <path
            fill="url(#grad)"
            d="M49,10h-2c0-1.103-0.897-2-2-2h-8c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2h-8
            c-1.103,0-2,0.897-2,2h-2c-1.103,0-2,0.897-2,2v44c0,1.103,0.897,2,2,2h34c1.103,0,2-0.897,2-2V12C51,10.897,50.103,10,49,10z"
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6dc7ff" />
              <stop offset="100%" stopColor="#c822ff" />
            </linearGradient>
          </defs>
        </svg>
        <h1 className="font-bold text-xl md:text-2xl">GoApply</h1>
      </Link>

      {/* Menu desktop */}
      <ul className="hidden md:flex gap-6">
        {navLinks.map((item, index) => (
          <li key={index}>
            <Link
              href={item.url}
              className={`${
                pathName === item.url ? "text-violet-500 opacity-100" : "opacity-60"
              } text-sm font-semibold hover:opacity-100`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Toggle Theme & Button */}
        <div className="hidden md:flex items-center justify-center gap-4">
            <ToggleTheme />
            <Link
                href={"/build-resume"}
                onClick={() => setIsOpen(false)}
                className="block text-center py-2 px-4 text-white font-semibold rounded-md bg-violet-500 hover:bg-violet-600"
            >
                Create Resume
            </Link>
        </div>

      {/* Hamburger Mobile */}
      <div className="md:hidden flex items-center justify-center gap-4">
        <ToggleTheme />
        <button
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full backdrop-blur-2xl shadow-md rounded-b-lg p-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    pathName === item.url ? "text-violet-500 opacity-100" : "opacity-60"
                  } block text-sm font-semibold hover:opacity-100 text-center`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

            {/* Toggle Theme & Button */}
            <Link
                href={"/build-resume"}
                onClick={() => setIsOpen(false)}
                className="mt-4 block text-center py-2 px-4 text-white font-semibold rounded-md bg-violet-500 hover:bg-violet-600"
            >
                Create Resume
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
