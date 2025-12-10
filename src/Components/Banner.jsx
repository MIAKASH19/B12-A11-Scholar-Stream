import React from "react";
import { motion } from "framer-motion";
import men from "../../public/men1.jpeg"

const Banner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#e8f0ff] to-white py-20 md:py-28 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
          >
            Learn Smarter, <span className="text-blue-600">Achieve Faster</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-600 text-lg md:text-md"
          >
            Welcome to Scholar-Stream where learning becomes simple, interactive, 
            and personalized for every student.
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
              Get Started
            </button>

            <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all">
              Explore Courses
            </button>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center rounded-full overflow-hidden bg-red-500 w-100 h-100 md:justify-end"
        >
          <img
            src={men}
            alt="Student Illustration"
            className=" h-full object-cover"
          />
        </motion.div> 

      </div>
    </section>
  );
};

export default Banner;
