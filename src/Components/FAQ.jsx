import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is ScholarStream?",
    answer:
      "ScholarStream is a scholarship management platform that helps students discover, compare, and apply for verified local and international scholarships from one place.",
  },
  {
    question: "Are the scholarships on ScholarStream verified?",
    answer:
      "Yes. Every scholarship listed on ScholarStream goes through a verification process to ensure authenticity and reliability for students.",
  },
  {
    question: "Is ScholarStream free to use?",
    answer:
      "Yes, ScholarStream is completely free for students. There are no hidden charges for searching or applying for scholarships.",
  },
  {
    question: "Can I apply for international scholarships from Bangladesh?",
    answer:
      "Absolutely. ScholarStream includes both local and international scholarships that Bangladeshi students can apply for, depending on eligibility criteria.",
  },
  {
    question: "How do I know if I am eligible for a scholarship?",
    answer:
      "Each scholarship includes detailed eligibility requirements. You can easily compare them with your profile before applying.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="md:text-6xl text-4xl md:font-medium font-semibold">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-sm">
            Everything you need to know about using ScholarStream and finding
            the right scholarship for you.
          </p>
        </div>

        <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white w-full rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
// 