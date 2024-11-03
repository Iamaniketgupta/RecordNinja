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
    <nav className={`sticky top-0 z-[100] py-3 shadow-sm border-neutral-700/80 ${mobileDrawerOpen ? "max-sm:dark:bg-stone-900 max-sm:bg-white" : ""}`}>
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="text-2xl md:pl-2 text-blue-600 font-bold">
              👋<span className="text-gray-700 ml-2 dark:text-gray-100">Record</span> <span className="text-indigo-700 ml-2 dark:text-indigo-700">Ninja</span>
            </div>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            {/* {!mode ? (
              <MdDarkMode className="text-2xl text-stone-800 dark:text-gray-100 cursor-pointer" onClick={toggleMode} />
            ) : (
              <MdLightMode className="text-2xl text-stone-800 dark:text-gray-100 cursor-pointer" onClick={toggleMode} />
            )} */}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <div className="flex space-x-4">
              {/* {!mode ? (
                <MdDarkMode className="text-2xl text-stone-800 dark:text-gray-100 cursor-pointer" onClick={toggleMode} />
              ) : (
                <MdLightMode className="text-2xl text-stone-800 dark:text-gray-100 cursor-pointer" onClick={toggleMode} />
              )} */}
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <FaCross/> : <CiMenuFries />}
              </button>
            </div>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 shadow-md z-50 dark:text-white dark:bg-stone-900 bg-white w-full p-12 flex flex-col lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            {/* Uncomment this section if you need user login/logout functionality */}
            {/* 
            <div className="flex space-x-6 z-50">
              {currUser ? (
                <>
                  <button onClick={() => {
                    logoutUser().then((res) => {
                      if (res) {
                        setCurrUser(null);
                        navigate("/login");
                      }
                    });
                  }} className="py-2 px-3 border rounded-md">
                    Log out
                  </button>
                  <button onClick={() => navigate("/dashboard")} className="py-2 px-3 border rounded-md bg-blue-700 text-white font-semibold">
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button className="py-2 px-3 border text-xs rounded-md">
                    Log in
                  </button>
                  <Link to="/signup" className="py-2 px-3 text-xs rounded-md bg-gradient-to-r from-blue-500 to-blue-800">
                    Create an account
                  </Link>
                </>
              )}
            </div> 
            */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
