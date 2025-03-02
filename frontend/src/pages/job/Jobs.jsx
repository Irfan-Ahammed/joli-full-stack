import CategorySection from "@/components/CategorySeaction";
import Footer from "@/components/Footer";
import JobList from "@/components/jobs/JobList";
import LatestJobs from "@/components/jobs/LatestJobs";
import Navbar from "@/components/Navbar";
import SaveJobs from "@/components/SaveJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React, { useState } from "react";

function Jobs() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useGetAllJobs();
  return (
    <div className="">
      <Navbar selectedCategory={selectedCategory} />
      <SaveJobs />
      <hr className="text-black/20" />
      <CategorySection setSelectedCategory={setSelectedCategory} />
      <LatestJobs selectedCategory={selectedCategory} />
      <JobList />
      <Footer />
    </div>
  );
}

export default Jobs;
