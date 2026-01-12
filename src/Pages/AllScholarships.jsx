import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScholarCard from "../Components/ScholarCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { GoSearch } from "react-icons/go";
import ScholarshipSkeleton from "../Components/ScholarshipSkeleton";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const [countries, setCountries] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [totalScholarships, setTotalScholarships] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [loading, setLoading] = useState(true);

  const limit = 8;

  useEffect(() => {
    setLoading(true);

    axiosSecure
      .get(
        `/scholarships?limit=${limit}&skip=${currentPage * limit}&category=${category}&location=${location}&search=${encodeURIComponent(
          searchText
        )}&sort=${sortOrder}`
      )
      .then((res) => {
        setScholarships(res.data.result);
        setTotalScholarships(res.data.total);
        setTotalPages(Math.ceil(res.data.total / limit));
      })
      .catch((err) => {
        console.error("Failed to fetch scholarships", err);
      })
      .finally(() => setLoading(false));
  }, [currentPage, category, location, searchText, sortOrder]);

  useEffect(() => {
    axiosSecure
      .get("/scholarship-countries")
      .then((res) => setCountries(res.data));
  }, []);

  return (
    <section className="relative w-full px-5 md:px-10 py-20 md:py-30 overflow-hidden
      bg-linear-to-b from-white to-slate-50 dark:from-[#0b0f19] dark:to-[#0e1424] transition-colors">
      
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-700 blur-3xl rounded-full opacity-50" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-pink-200 dark:bg-pink-700 blur-3xl rounded-full opacity-50" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 dark:text-white mb-4">
          Explore Scholarships Worldwide
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-sm">
          Browse verified local & international scholarships. Filter by country,
          degree, funding type, and apply before deadlines.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-2xl shadow-sm p-6 mb-12 transition-colors">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white">
            Total Scholarships:{" "}
            <span className="text-blue-600">{totalScholarships}</span>
          </h2>

          {/* Search */}
          <div className="relative w-full lg:w-[40%]">
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
              type="text"
              placeholder="Search scholarship, university, degree..."
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 px-5 py-3 text-sm outline-none
                focus:ring-2 focus:ring-blue-200 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <GoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg" />
          </div>

          {/* Selects */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(0);
              }}
              className="rounded-xl border border-gray-300 dark:border-zinc-700 px-4 py-3 text-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
            >
              <option value="">Category</option>
              <option value="Full Fund">Full Fund</option>
              <option value="Partial Fund">Partial Fund</option>
              <option value="Self Fund">Self Fund</option>
            </select>

            <select
              onChange={(e) => {
                setLocation(e.target.value);
                setCurrentPage(0);
              }}
              className="rounded-xl border border-gray-300 dark:border-zinc-700 px-4 py-3 text-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
            >
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(0);
              }}
              className="rounded-xl border border-gray-300 dark:border-zinc-700 px-4 py-3 text-sm bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ScholarshipSkeleton key={i}/>
          ))}
        </div>
      ) : scholarships.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No scholarships found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {scholarships.map((scholarship, index) => (
            <ScholarCard
              key={scholarship._id?.$oid || scholarship._id}
              scholarship={scholarship}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
            >
              Prev
            </button>
          )}

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-colors
                ${currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
                }`}
            >
              {page + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
            >
              Next
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default AllScholarships;
