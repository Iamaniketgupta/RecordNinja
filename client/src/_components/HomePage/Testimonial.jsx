"use client"
import React, { useState } from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Amit Sharma",
      profilePic: "https://via.placeholder.com/150",
      review:
        "The service was exceptional. Everything was handled professionally, and the results exceeded my expectations!",
    },
    {
      id: 2,
      name: "Priya Singh",
      profilePic: "https://via.placeholder.com/150",
      review:
        "Highly recommend this company! Their attention to detail and quality of work are amazing.",
    },
    {
      id: 3,
      name: "Rahul Verma",
      profilePic: "https://via.placeholder.com/150",
      review:
        "A truly seamless experience. I am impressed by the team's dedication and expertise.",
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      profilePic: "https://via.placeholder.com/150",
      review:
        "Absolutely loved working with them. They delivered on time and kept me informed throughout.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-center text-2xl font-semibold mb-6">What People Say</h2>
      <div className="relative">
        {/* Slider Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-full p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={review.profilePic}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h3 className="text-lg font-bold">{review.name}</h3>
                <p className="text-gray-600 mt-2">{review.review}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          &rarr;
        </button>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-4">
          {reviews.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
