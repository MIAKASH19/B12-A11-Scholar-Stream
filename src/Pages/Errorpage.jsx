import React from "react";

const ErrorPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">দুঃখিত! কিছু ভুল হয়েছে।</h1>
      {/* <p className="text-gray-700 mb-4">
        {error?.statusText || error?.message || "অপ্রত্যাশিত এরর ঘটেছে।"}
      </p> */}
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        Please Reload the Page
      </button>
    </div>
  );
};

export default ErrorPage;
