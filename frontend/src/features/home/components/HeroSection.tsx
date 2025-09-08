"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/Placed/qualcomm.jpg",
  "/images/Placed/gamingAnalytics.jpg",
  "/images/Placed/expleo.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left max-w-lg"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Earn When You Learn
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Gain skills, grow your knowledge, and get opportunities to earn while
            you study with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg transition">
              Browse Courses
            </button>
          </div>
        </motion.div>

        {/* Right Side - Changing Image */}
        <motion.div
          key={currentIndex} // Important for animation on change
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
        >
          <img
            src={images[currentIndex]}
            alt="Student"
            className="rounded-2xl w-[500px] h-[400px] object-cover"
          />
        </motion.div>
      </section>

    </>

  );
}
