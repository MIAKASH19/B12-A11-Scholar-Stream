import React, { useState } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arafat Hossain",
    role: "Undergraduate Student, Bangladesh",
    feedback:
      "ScholarStream made it incredibly easy to find verified international scholarships. The application process was smooth and transparent.",
  },
  {
    name: "Nusrat Jahan",
    role: "Master’s Applicant",
    feedback:
      "Before ScholarStream, I was confused about eligibility and fake offers. Now I feel confident applying to real opportunities.",
  },
  {
    name: "Imran Khan",
    role: "Engineering Student",
    feedback:
      "The dashboard and application tracking are super helpful. I especially love the clean interface and review system.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="w-full py-24
        bg-linear-to-b from-white to-slate-50
        dark:from-[#0b0f19]  dark:to-[#0e1424] 
        transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="md:text-6xl text-4xl font-semibold md:font-medium text-gray-900 dark:text-white">
            What Students{" "}
            <span className="bg-linear-to-r from-[#0CB3FA] to-[#fd95e7] bg-clip-text text-transparent">
              Say
            </span>
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-sm
            text-gray-600 dark:text-gray-400">
            Real experiences from students who found and applied for
            scholarships using ScholarStream.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={`rounded-2xl p-8 cursor-pointer transition-all duration-300
                border shadow-sm
                bg-white dark:bg-[#121826]
                border-gray-100 dark:border-white/10
                dark:shadow-black/40
                ${activeIndex === index
                  ? "scale-[1.03] shadow-md"
                  : "opacity-90"
                }`}
            >
              <Quote className="w-8 h-8 mb-4
                text-blue-600 dark:text-[#0CB3FA] opacity-80" />

              <p className="text-sm leading-relaxed mb-6
                text-gray-600 dark:text-gray-300">
                “{item.feedback}”
              </p>

              <div className="mt-auto">
                <h4 className="font-medium
                  text-gray-800 dark:text-white">
                  {item.name}
                </h4>
                <p className="text-xs
                  text-gray-500 dark:text-gray-400">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
