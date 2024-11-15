import React from "react";

const MarqueeSlider = () => {
  const brands = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Facebook", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg" },
  ];

  return (
    <div className="relative overflow-hidden w-full  py-6">
      {/* Left and right shadows */}
      <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>


      {/* First Layer */}
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white p-4 shadow-md rounded-md mx-3 hover:scale-110 transition-transform duration-300"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-12 w-60 object-contain"
            />
          </div>
        ))}
        {brands.map((brand, index) => (
          <div
            key={`duplicate-${index}`}
            className="flex items-center justify-center bg-white p-4 shadow-md rounded-md mx-3 hover:scale-110 transition-transform duration-300"
          > 
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-12 w-40 object-contain"
            />
          </div>
        ))}
        
      </div>
    

      {/* Tailwind Keyframe Animations */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee2 {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee2 {
            animation: marquee2 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default MarqueeSlider;
