import React from 'react'

const ScholarshipSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-40 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />
        <div className="h-3 w-2/3 rounded bg-gray-200" />

        <div className="h-px bg-gray-200 my-3" />

        <div className="h-9 w-full rounded-xl bg-gray-300" />
      </div>
    </div>
  );
};


export default ScholarshipSkeleton