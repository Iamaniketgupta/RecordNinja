"use client";

import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { FaCross } from "react-icons/fa";
// Assume `userData` atom is imported here
// import { useDarkMode } from "../../../Contexts/DarkModeWrapper"; Uncomment and define if using custom context

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Features", href: "#" },
  { label: "Clinics", href: "/all/clinics" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

const Header: React.FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
   
    <header>
      <div className="bg-gradient-to-r from-indigo-500 px-2 to-pink-600 text-white text-center items-center justify-center text-sm flex gap-3">
          <p className='p-4 text-center font-medium'>Download Record Ninja Extension for your browser</p>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-full flex 
                      items-center justify-center  gap-4 w-20 min-w-fit  bg-gradient-to-r from-stone-600 to-stone-700 px-4 py-2 text-xs  font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400"
            >

              <span>Download</span>
            </Link>

        </div>

      </div>


      <nav className="h-18 px-8 sticky top-10 mt-3  w-[90%] mx-auto z-[100] bg-gray-0 rounded-full p-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-200 shadow-md">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-gray-800 font-semibold text-lg hover:text-gray-900">
            Record Ninja
          </Link>
          <div className="flex items-center space-x-4 max-sm:hidden">
            <Link href="#features" className="text-gray-700 hover:text-gray-900">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>

  );
};

export default Header;
