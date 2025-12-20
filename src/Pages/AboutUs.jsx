import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaGlobe,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 blur-3xl rounded-full opacity-50" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-pink-200 blur-3xl rounded-full opacity-50" />

      <section className="relative z-10 px-6 md:px-16 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold text-gray-900"
        >
          About <span className="text-blue-600">ScholarStream</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-4xl mx-auto text-gray-600 text-sm md:text-base"
        >
          ScholarStream is a modern scholarship discovery and management
          platform designed to help students find verified local and
          international scholarships effortlessly.
        </motion.p>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our mission is simple: remove confusion, scams, and complexity
              from scholarship searching. We aim to empower students with
              accurate information, transparent processes, and easy access to
              educational funding opportunities worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex gap-3 items-start">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Verified and trusted scholarship listings
              </li>
              <li className="flex gap-3 items-start">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Student-first application experience
              </li>
              <li className="flex gap-3 items-start">
                <FaCheckCircle className="text-blue-600 mt-1" />
                Transparent fees and processes
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-gray-50">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: FaGraduationCap, label: "Scholarships", value: "1,200+" },
            { icon: FaGlobe, label: "Countries", value: "40+" },
            { icon: FaUsers, label: "Students Helped", value: "10k+" },
            { icon: FaCheckCircle, label: "Verified Listings", value: "100%" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
            >
              <item.icon className="text-3xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900">
                {item.value}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-center text-gray-900 mb-12"
        >
          Why Choose ScholarStream?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Scholarships",
              desc: "Every scholarship is reviewed to ensure authenticity and accuracy.",
            },
            {
              title: "Smart Search & Filters",
              desc: "Find scholarships by degree, university, country, or category.",
            },
            {
              title: "User-Friendly Experience",
              desc: "Clean UI and smooth flow designed for students, not confusion.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-linear-to-r from-blue-600 to-indigo-600 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold text-white mb-6"
        >
          Start Your Scholarship Journey Today
        </motion.h2>

        <p className="text-white/80 text-sm max-w-2xl mx-auto mb-8">
          Join thousands of students discovering life-changing educational
          opportunities with ScholarStream.
        </p>

        <button className="px-8 py-3 rounded-xl bg-white text-blue-600 font-medium hover:bg-gray-100 transition">
          Explore Scholarships
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
