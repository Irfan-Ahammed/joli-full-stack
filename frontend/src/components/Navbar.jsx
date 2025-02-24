import JobSearch from "@/components/jobs/Jobsearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import playstore from "../assets/playstore.png";
import AppStore from "../assets/App-Store.svg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { textVariants } from "@/styles/framerMotion";
import ProfileDialog from "./ProfileDialog";
import { Search } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionTexts = [
    "Search for jobs near you...",
    "What type of work are you looking for?",
    "Enter job title, skills, or location...",
    "Find opportunities in your area today!",
    "Type a job category or city to get started...",
    "Discover your next job opportunity here!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % transitionTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="container mx-auto">
      <div className="flex justify-between items-center px- md:py-5 py-3 lg:px-28">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-3xl text-primary">
          JOLI
        </Link>

        {/* Search Section */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <Input type="text" placeholder="Search jobs" className="w-64 h-12 border border-gray-300 shadow-md rounded-md" />
          <JobSearch />
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="bg-primary text-white font-semibold px-6 py-2 rounded-lg shadow-lg">
            Find
          </motion.button>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center space-x-3 lg:space-x-5 h-12">
          <Button className="hidden md:flex items-center border text-black hover:bg-gray-100 bg-white px-4 h-12 rounded-lg shadow-md">
            <span>Get the app:</span>
            <div className="flex items-center ml-2">
              <img src={AppStore} className="w-7 h-8" alt="App Store" />
              <img src={playstore} className="w-5 ml-2" alt="Google Play Store" />
            </div>
          </Button>
          <ProfileDialog />
        </div>
      </div>

      {/* Mobile Search Section */}
      <div className="flex md:hidden mx-4 mb-5">
        <div className="w-full h-12 border border-gray-300 shadow-md bg-white rounded-md relative flex items-center px-4 cursor-pointer" onClick={() => navigate("/search")}>  
          <Search className="size-6 text-gray-600" />
          <AnimatePresence>
            <motion.p
              key={transitionTexts[currentIndex]}
              className="absolute left-12 text-gray-500 text-sm font-medium"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {transitionTexts[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
