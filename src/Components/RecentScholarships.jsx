import React from "react";

const RecentScholarships = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-6xl font-medium border-b border-zinc-300 pb-4">
        Recent Scholarships
      </h1>
      <div className="grid grid-cols-3 place-items-center gap-6 mt-10">
        {[...Array(6)].map(()=>(
            <div className="h-80 w-90 bg-red-500 rounded-xl">
                
            </div>
        ))}
      </div>
    </div>
  );
};

export default RecentScholarships;
