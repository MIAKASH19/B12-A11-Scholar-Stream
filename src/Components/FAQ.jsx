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
    <section className="w-full py-24 bg-linear-to-b from-white to-slate-50
        dark:from-[#0E1423] dark:to-[#0e1424]
        transition-colors">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="md:text-6xl text-4xl md:font-medium font-semibold text-gray-900 dark:text-white">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-[#0CB3FA] to-[#fd95e7] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm">
            Everything you need to know about using ScholarStream and finding
            the right scholarship for you.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 bg-white dark:bg-[#0b0f19]
                ${
                  isActive
                    ? "border-sky-200 dark:border-sky-500/40 shadow-md"
                    : "border-gray-100 dark:border-zinc-800 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {faq.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300
                    ${
                      isActive
                        ? "bg-linear-to-r from-[#0CB3FA] to-[#fd95e7] text-white"
                        : "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
