"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import logo from "./logo.png"


const Header: React.FC = () => {

  return (

    <header>
      <div className="bg-gradient-to-r from-indigo-500 px-2 to-pink-600 text-white text-center items-center justify-center text-sm flex gap-3">
        <p className='p-4 text-center font-medium max-sm:text-xs'>Download Record Ninja Extension for your browser</p>
        <Link
          href="#"
          className="rounded-full
                        min-w-fit  no-wrap  bg-gradient-to-r from-stone-600 to-stone-700 px-4 py-2 text-xs  font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400"
        >
          Coming Soon
        </Link>


      </div>


      <nav className="h-18 px-8  dark:bg-stone-800 dark:text-white 
text-gray-700  sticky top-10 mt-3  w-[90%] mx-auto z-[100] bg-gray-0 rounded-full p-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10   shadow-md">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-transparent flex items-center gap-2 dark:text-white bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 font-bold  text-lg md:text-xl ">
           <Image src={logo} alt="recordninja" width={50} height={50} className="w-8 h-8" /> Record Ninja 
          </Link>
          <div className="flex items-center space-x-4 ">
            <a target="_blank" href="https://github.com/iamaniketgupta/recordninja" className="flex items-center gap-2 hover:text-gray-900">
              <FaGithub className="text-2xl" /> <span className="max-sm:hidden">Github</span>
            </a>

            <a target="_blank" href="https://www.linkedin.com/in/iamaniketgupta" className=" flex items-center gap-2 hover:text-gray-900">
              <FaLinkedin className="text-2xl" /> <span className="max-sm:hidden">Linkedin</span>
            </a>
          </div>
        </div>
      </nav>
    </header>

  );
};

export default Header;
