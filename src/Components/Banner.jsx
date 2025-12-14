import React from "react";
import Marquee from "react-fast-marquee";
import hero from "../../public/men1.jpeg";

const Banner = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col gap-5 items-center justify-center pt-26 overflow-hidden pb-20">
      
      <div className="bg-blue-200 w-100 h-70 absolute top-80 left-0 blur-2xl scale-200 rounded-full" />
      <div className="bg-pink-100 w-100 h-70 absolute top-80 right-0 blur-2xl scale-200 rounded-full" />

      <h1 className="text-6xl w-[70%] relative text-center font-medium">
        We Bring the Best
        <span className="text-[#264EA3]"> Scholarships </span>
        Right to Your Door
      </h1>

      <p className="text-sm w-1/2 text-center relative text-gray-600">
        Discover verified local and international scholarships in one place.
        Search, compare, and apply with confidence, all from a single platform.
      </p>

      <button className="bg-[#264EA3] relative px-5 py-3 rounded-full text-white text-sm font-medium shadow-2xl cursor-pointer">
        Search Scholarships
      </button>

      <div className="w-full mt-10">
        <Marquee
          speed={80}
          gradient={false}
          pauseOnHover
          className="h-[50vh]"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="mx-3 h-[50vh] w-[280px] relative rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={hero}
                alt="men"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="flex flex-col absolute inset-0 text-white p-4 justify-between">
                <div>
                  <h1 className="font-semibold">Justin Fonster</h1>
                  <p className="text-sm opacity-80">
                    Frontend Developer
                  </p>
                </div>

                <p className="px-4 py-1 bg-white text-black rounded-full text-xs self-end font-medium">
                  Podcast
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
