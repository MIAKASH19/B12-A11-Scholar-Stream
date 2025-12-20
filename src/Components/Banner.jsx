import React from "react";
import Marquee from "react-fast-marquee";
import hero from "../../public/men1.jpeg";
import { Link } from "react-router";

const cardData = [
  {
    name: "Vice Chancellor Scholarship",
    universityCity: "Cambridge",
    universityName: "University of Harvard",
    image:
      "https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFydmFyZCUyMHVuaXZlcnNpdHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Chevening Scholarship",
    universityCity: "London",
    universityName: "University of London",
    image:
      "https://images.unsplash.com/photo-1617297296495-4af2290c2b84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b3hmb3JkJTIwdW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Asian Future Leaders Scholarship",
    universityCity: "California",
    universityName: "Stanford University",
    image:
      "https://images.unsplash.com/photo-1685410613011-23d2794971a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0YW5mb3JkJTIwdW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Banner = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col gap-5 items-center justify-center pt-26 overflow-hidden pb-20">
      <div className="bg-blue-200 w-100 h-70 absolute top-80 left-0 blur-2xl scale-200 rounded-full" />
      <div className="bg-pink-100 w-100 h-70 absolute top-80 right-0 blur-2xl scale-200 rounded-full" />

      <h1 className="text-6xl w-[70%] relative text-center font-medium">
        We Bring the Best
        <span className="text-blue-600"> Scholarships </span>
        Right to Your Door
      </h1>

      <p className="text-sm w-1/2 text-center relative text-gray-600">
        Discover verified local and international scholarships in one place.
        Search, compare, and apply with confidence, all from a single platform.
      </p>

      <Link
        to="/all-scholarships"
        className="bg-blue-600 relative px-5 py-3 rounded-full text-white text-sm font-medium shadow-2xl cursor-pointer"
      >
        Search Scholarships
      </Link>

      <div className="w-full mt-10">
        <Marquee speed={80} gradient={false} pauseOnHover className="h-[50vh] ">
          {cardData.map((item, i) => (
            <div
              key={i}
              className="mx-3 h-[40vh] w-[430px] relative rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="flex flex-col absolute inset-0 text-white p-4 justify-between">
                <div>
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="text-sm opacity-80">{item.universityCity}</p>
                </div>

                <p className="px-4 py-1 bg-white text-black rounded-full text-xs self-end font-medium">
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
