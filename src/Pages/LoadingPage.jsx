import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

      <h1 className="text-white text-2xl md:text-4xl font-bold mb-2 animate-pulse">
        Loading, please wait...
      </h1>

      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-450"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
