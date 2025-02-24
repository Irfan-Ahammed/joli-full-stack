import React from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-28 py-12">

     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full text-center text-gray-600 dark:text-gray-400"
          >
            No jobs available at the moment.
          </motion.div>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;