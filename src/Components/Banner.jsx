import React from "react";
import hero from "../../public/men1.jpeg"

const Banner = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-5xl w-1/2 text-center ">
        We Bring The Good Scholarships in Your Door.
      </h1>
      <p className="text-sm w-1/2 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure itaque
        tempora quia dicta hic veritatis error nobis odio enim quo? Nulla
        architecto voluptates repellat sed fugit atque molestias incidunt
        officia?
      </p>
      <button className="bg-blue-600 px-5 py-2 rounded-full text-white text-sm font-medium shadow-2xl cursor-pointer">
        Get Started
      </button>

      <div className="w-full flex justify-center gap-5 h-[50vh] mt-10">
        {[...Array(4)].map((n, i) => (
          <div className="h-full relative bg-green-400 w-70 rounded-2xl overflow-hidden">
            <img src={hero} alt="men" className="w-full h-full object-cover" />
            <div className="flex flex-col absolute w-full h-full top-0  text-white p-4">
              <h1 className="font-semibold">Justin Fonster</h1>
              <p>Frontend Developer</p>
            </div>
            <p className="px-4 py-1 bg-white absolute bottom-5 rounded-full right-5">Podcast</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
