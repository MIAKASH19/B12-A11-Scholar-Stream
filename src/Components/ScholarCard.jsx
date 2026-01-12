import { motion } from "framer-motion";
import { Link } from "react-router";
import Button from "./Button";

const ScholarCard = ({ scholarship, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl overflow-hidden border shadow-sm
        bg-white dark:bg-[#121826]
        border-gray-100 dark:border-white/10
        hover:scale-102 transition-all duration-300
        dark:shadow-black/40"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={
            scholarship.universityImage ||
            "https://via.placeholder.com/400x200"
          }
          alt={scholarship.universityName}
          className="w-full h-full object-cover
            transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0
          bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full
          text-xs font-semibold text-white
          bg-[#0CB3FA] shadow">
          {scholarship.scholarshipCategory}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2
          className="text-lg font-semibold leading-snug mb-1 truncate
            text-gray-900 dark:text-white"
        >
          {scholarship.scholarshipName}
        </h2>

        <p
          className="text-sm mb-4 truncate
            text-gray-500 dark:text-gray-400"
        >
          {scholarship.universityName},{" "}
          {scholarship.universityCountry}
        </p>

        {/* Info Row */}
        <div
          className="flex justify-between text-sm mb-5
            text-gray-600 dark:text-gray-400"
        >
          <span>{scholarship.degree}</span>
          <span>{scholarship.applicationDeadline}</span>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-5
          bg-gray-100 dark:bg-white/10" />

        {/* CTA */}
        <Link to={`/scholarship-details/${scholarship._id}`}>
          <Button
            text="View Details"
            className="w-full rounded-full
              bg-linear-to-r from-[#ff78e2] to-[#64c7f1]
              text-white hover:opacity-90 transition-all"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default ScholarCard;
