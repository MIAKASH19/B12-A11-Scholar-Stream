import React, { useEffect, useState } from "react";
import ScholarCard from "./ScholarCard";

const RecentScholarships = () => {
  const [recentScholarships, setRecentScholarships] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/recent-scholarships")
      .then((res) => res.json())
      .then((data) => {
        setRecentScholarships(data);
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-6xl font-medium border-b border-zinc-300 pb-4">
        Recent Scholarships
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {recentScholarships.map((scholarship, index) => (
          <div className="w-full">
            <ScholarCard
              key={index  }
              scholarship={scholarship}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentScholarships;
