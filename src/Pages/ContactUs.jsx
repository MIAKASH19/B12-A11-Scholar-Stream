import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="relative w-full overflow-hidden py-28 px-5 md:px-12 bg-white dark:bg-gray-900 transition-colors">
      {/* Background gradients */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#64c7f1] opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#ff78e2] opacity-30 rounded-full blur-3xl" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
          Let’s Talk About Your Future
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
          Questions about scholarships, applications, or guidance?  
          Reach out and our team will respond shortly.
        </p>
      </motion.div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Contact Information
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-md">
            We’re here to help students explore the right opportunities.  
            Feel free to contact us through any of the following channels.
          </p>

          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: FaEnvelope, label: "Email", value: "support@scholarstream.com" },
              { icon: FaPhoneAlt, label: "Phone", value: "+880 1830144301" },
              { icon: FaMapMarkerAlt, label: "Location", value: "Dhaka, Bangladesh" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-zinc-300 dark:border-zinc-700 rounded-2xl p-5 shadow-sm transition-colors"
              >
                <item.icon className="text-xl text-[#0CB3FA]" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-zinc-300 dark:border-zinc-700 rounded-3xl shadow-xl p-8 md:p-10 space-y-6 transition-colors"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Send a Message
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none placeholder-gray-400 dark:placeholder-gray-300 focus:border-[#0CB3FA] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-300 transition"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none placeholder-gray-400 dark:placeholder-gray-300 focus:border-[#0CB3FA] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-300 transition"
            />
          </div>

          <textarea
            rows="5"
            placeholder="Write your message..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none resize-none placeholder-gray-400 dark:placeholder-gray-300 focus:border-[#0CB3FA] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-300 transition"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium text-white bg-linear-to-r from-[#64c7f1] to-[#ff78e2] hover:opacity-90 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
