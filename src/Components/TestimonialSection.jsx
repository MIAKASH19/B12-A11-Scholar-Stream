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
    <section className="w-full py-24 bg-linear-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="md:text-6xl text-4xl font-semibold md:font-medium ">
            What Students <span className="text-blue-600">Say</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm">
            Real experiences from students who found and applied for
            scholarships using ScholarStream.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-8 transition-all duration-300 cursor-pointer ${
                activeIndex === index ? "scale-[1.02] shadow-md" : "opacity-90"
              }`}
            >
              <Quote className="w-8 h-8 text-blue-600 mb-4 opacity-80" />

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                “{item.feedback}”
              </p>

              <div className="mt-auto">
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
