import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router";
import Button from "./Button";
import BgLeft from "../../public/bg-hero-left.png";
import BgRight from "../../public/bg-hero-right.png";
import { BookOpen } from "lucide-react";

const cardData = [
  {
    name: "Vice Chancellor Scholarship",
    universityCity: "Cambridge",
    universityName: "University of Harvard",
    image:
      "https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Chevening Scholarship",
    universityCity: "London",
    universityName: "University of London",
    image:
      "https://images.unsplash.com/photo-1617297296495-4af2290c2b84?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Asian Future Leaders Scholarship",
    universityCity: "California",
    universityName: "Stanford University",
    image:
      "https://images.unsplash.com/photo-1685410613011-23d2794971a7?w=500&auto=format&fit=crop&q=60",
  },
];

const Banner = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col gap-5 items-center justify-center pt-26 pb-20 overflow-hidden
      bg-white dark:bg-[#0b0f19] transition-colors">

      {/* Glow */}
      <div className="bg-pink-200/40 dark:bg-purple-500/20 w-100 h-70 absolute top-1/3 right-1/3 blur-2xl scale-200 rounded-full"></div>

      {/* Background Images */}
      <img src={BgLeft} className="absolute top-0 left-0 opacity-70 dark:opacity-30" />
      <img src={BgRight} className="absolute top-0 right-0 opacity-70 dark:opacity-30" />

      {/* Badge */}
      <div className="flex items-center gap-3 border px-5 py-2 rounded-full md:text-sm text-xs font-semibold
        border-[#0CB3FA] bg-[#0CB3FA]/10 text-[#0CB3FA]
        dark:bg-[#0CB3FA]/15">
        <BookOpen size={18} />
        Smart Scholarship Solutions for Modern Students
      </div>

      {/* Heading */}
      <h1 className="md:text-7xl relative text-zinc-800 text-5xl tracking-tight md:w-[80%] w-[90%] text-center font-medium
         dark:text-white">
        Unlock the Best{" "}
        <span className="bg-linear-to-r from-[#0CB3FA] to-[#fd95e7] bg-clip-text text-transparent">
          Scholarships
        </span>{" "}
        for Your Future
      </h1>

      {/* Description */}
      <p className="text-sm  md:text-lg md:w-1/2 w-[90%] text-center
        text-gray-600 dark:text-gray-400">
        Find verified global scholarships, clear guidance, and step-by-step support — so you never miss an opportunity.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Link to="/all-scholarships">
          <Button text="Explore Scholarships" />
        </Link>

        <Link
          to="/all-scholarships"
          className="border rounded-full px-8 py-3 text-sm font-semibold
            border-[#0CB3FA] text-[#0CB3FA]
            hover:bg-[#0CB3FA] hover:text-white transition
            dark:hover:bg-[#0CB3FA]">
          How It Works
        </Link>
      </div>

      {/* Marquee */}
      <div className="w-full mt-10">
        <Marquee speed={80} gradient={false} pauseOnHover className="h-[50vh]">
          {cardData.map((item, i) => (
            <div
              key={i}
              className="mx-3 h-[40vh] w-107.5 rounded-2xl overflow-hidden shadow-lg relative
                dark:shadow-black/50"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                <div>
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="text-sm opacity-80">{item.universityCity}</p>
                </div>

                <p className="px-4 py-1 bg-white text-black rounded-full text-xs font-medium self-end
                  dark:bg-gray-900 dark:text-white">
                  {item.universityName}
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Banner;
