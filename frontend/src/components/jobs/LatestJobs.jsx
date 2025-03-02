import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const LatestJobs = ({ selectedCategory }) => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const categories = useSelector((state) => state.category?.categories);

  // Filter jobs based on category and search query
  const filteredJobs = useMemo(() => {
    let jobs = allJobs;

    if (selectedCategory) {
      jobs = jobs.filter(
        (job) =>
          categories.find((cat) => cat.name === selectedCategory)?._id ===
          job.category
      );
    }

    if (searchedQuery) {
      jobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }

    return jobs;
  }, [selectedCategory, searchedQuery, allJobs, categories]);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-28 py-12">
      <h2 className="text-2xl font-bold mb-5 text-gray-800 dark:text-white">
        {selectedCategory ? `${selectedCategory} Jobs` : "Latest Jobs"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 dark:text-gray-400">
            No jobs available.
          </div>
        ) : (
          filteredJobs.slice(0, 6).map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
