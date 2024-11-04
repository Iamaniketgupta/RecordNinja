import Link from 'next/link';
import React from 'react';
import { FaRecordVinyl } from 'react-icons/fa';
import { BsRecordCircleFill } from "react-icons/bs";

const Hero: React.FC = () => {
  return (
    <div className="bg-white dark:bg-stone-900">
      {/* Hero Background */}
        
                <div className='my-5'>
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
      <div className=" px-6 lg:px-8 mt-20 h-full flex items-center justify-center">
    
        {/* Main Content */}
        <div className="mx-auto w-full text-center">
          <h1 className="md:text-5xl text-4xl  font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white ">
            Free Online Screen
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:text-blue-400"> Recorder</span>
          </h1>
          <p className="mt-6 md:text-lg text-md  text-gray-700 dark:text-gray-300">
            Create HD high quality video recordings of your screen for free on any device.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/record"
              className="rounded-full flex 
              items-center justify-center h-20 gap-4 w-52 min-w-fit  bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-2 md:text-lg  font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400"
            >
              <BsRecordCircleFill className='text-3xl  animate-pulse text-green '>
              </BsRecordCircleFill>
              <span>Start Recording</span>
            </Link>

          </div>
        </div>

     
     
      </div>
    </div>
  );
};

export default Hero;
