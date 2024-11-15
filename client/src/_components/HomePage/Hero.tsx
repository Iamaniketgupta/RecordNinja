import Link from 'next/link';
import React from 'react';
import { BsRecordCircleFill } from 'react-icons/bs';

const Hero: React.FC = () => {
  return (
    <div className="bg-white dark:bg-stone-900">
      {/* Hero Background */}
      <div className="px-6 lg:px-8 mt-10 md:mt-20 h-full flex items-center justify-center">
        {/* Main Content */}
        <div className="mx-auto w-full text-center max-w-4xl mx-auto">
          <h1 className="md:text-5xl max-sm:text-left max-sm:text-3xl text-4xl font-bold leading-[1.2] tracking-tight text-gray-900 dark:text-white">
            Capture Your Screen with Ease Using Our 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 dark:text-blue-400"> Free Online Recorder</span>
          </h1>
          <p className="mt-6 max-sm:text-md md:text-lg max-w-3xl mx-auto text-md text-gray-700 dark:text-gray-300">
            Say goodbye to complex setups and subscriptions. 
            Record high-definition screen videos right from your browser. Quick, Easy, and 100% free.
          </p>
          <p className="mt-2  max-sm:text-md md:text-lg text-md text-gray-700 dark:text-gray-300">
            Perfect for creating tutorials, demos, gaming highlights, and more.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 max-sm:my-5 flex items-center justify-center gap-x-6">
            <Link
              href="/record"
              className="rounded-full flex 
              items-center justify-center
              hover:bg-gradient-to-r hover:to-indigo-500 hover:from-pink-600
               h-20 gap-4 w-52 min-w-fit bg-gradient-to-r to-indigo-600 from-pink-700 px-8 py-2 md:text-lg font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400"
            >
              <BsRecordCircleFill className="text-3xl animate-pulse" />
              <span>Start Recording</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
