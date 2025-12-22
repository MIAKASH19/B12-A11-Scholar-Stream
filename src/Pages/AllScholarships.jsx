import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScholarCard from "../Components/ScholarCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { GoSearch } from "react-icons/go";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [countries, setCountries] = useState([]);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");

  const limit = 6;

  useEffect(() => {
    axiosSecure
      .get(
        `http://localhost:3000/scholarships?limit=${limit}&skip=${
          currentPage * limit
        }&category=${category}&location=${location}&search=${encodeURIComponent(
          searchText
        )}
`
      )
      .then((res) => {
        setScholarships(res.data.result);
        setTotalScholarships(res.data.total);
        const pages = Math.ceil(res.data.total / limit);
        setTotalPages(pages);
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, [currentPage, category, location, searchText]);

  useEffect(() => {
    axiosSecure
      .get("/scholarship-countries")
      .then((res) => setCountries(res.data));
  }, []);

  return (
    <div className="w-full relative mx-auto md:px-10 px-5 py-20 pt-30 overflow-hidden">
      <div className="bg-blue-200 w-100 h-70 absolute top-80 left-0 blur-2xl scale-200 rounded-full -z-1" />
      <div className="bg-pink-100 w-100 h-70 absolute top-80 right-0 blur-2xl scale-200 rounded-full -z-1" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-medium mb-4 text-gray-800">
          Explore All Scholarships
        </h1>
        <p className="text-gray-600 max-w-5xl mx-auto text-sm">
          Discover verified local and international scholarships to fund your
          education. Browse through our curated collection and find
          opportunities that match your degree, subject, and career goals. Apply
          directly from here and never miss a deadline!
        </p>
      </motion.div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl ">Total ({totalScholarships})</h1>
          <div className="relative w-full md:w-[50%]">
            <input
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
              value={searchText} 
              type="text"
              placeholder="Search by scholarship, university or degree..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-lg">
              <GoSearch />
            </span>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              onChange={(e) => {
                setCurrentPage(0);
                setCategory(e.target.value);
              }}
              className="w-full md:w-50 rounded-xl border border-zinc-300 bg-white px-2 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">Scholarship Category</option>
              <option value="Full Fund">Full Fund</option>
              <option value="Partial Fund">Partial Fund</option>
              <option value="Self Fund">Self Fund</option>
            </select>

            <select
              onChange={(e) => {
                setCurrentPage(0);
                setLocation(e.target.value);
              }}
              className="w-full md:w-50 rounded-xl border border-zinc-300 bg-white px-2 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="">Location</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {scholarships.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          No scholarships found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship, index) => (
            <ScholarCard
              key={scholarship._id?.$oid || scholarship._id}
              scholarship={scholarship}
              index={index}
            />
          ))}
        </div>
      )}

      <div className="mt-10  flex items-center justify-center gap-3">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn border border-zinc-300 bg-white   hover:bg-blue-600 hover:border-blue-600"
          >
            Prev
          </button>
        )}
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`btn border border-zinc-300  hover:bg-blue-600 hover:border-blue-600 ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {pageNumber + 1}
          </button>
        ))}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn border border-zinc-300 bg-white   hover:bg-blue-600 hover:border-blue-600"
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
