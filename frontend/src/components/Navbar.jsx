import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import playstore from "../assets/playstore.png";
import AppStore from "../assets/App-Store.svg";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textVariants } from "@/styles/framerMotion";
import ProfileDialog from "./ProfileDialog";
import { Search } from "lucide-react";
import Logo from "./logo/Logo";
import SearchLocation from "@/components/jobs/SearchLocation";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

function Navbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileInputFocused, setIsMobileInputFocused] = useState(false);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const transitionTexts = [
    "Search for jobs near you...",
    "What type of work are you looking for?",
    "Enter job title, skills, or location...",
    "Find opportunities in your area today!",
    "Type a job category or city to get started...",
    "Discover your next job opportunity here!"
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchedQuery(e.target.value));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimationEnabled) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % transitionTexts.length
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnimationEnabled]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto fixed bg-white z-30 border-b-2 border-slate-200"
    >
      <div className="flex justify-between items-center px-4 md:py-5 py-3 lg:px-28">
        {/* Logo */}
        <Logo />

        {/* Search Section */}
        <div className="hidden md:flex ml-3 w-[60%] items-center justify-around lg:space-x-10 space-x-3">
          <Input
            type="text"
            placeholder="Search jobs"
            onChange={handleSearch}
            className="w-[50%] h-12 border lg:max-w-64 border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
          />
          <SearchLocation />
        </div>

        {/* Buttons Section */}
        <div className="flex items-center space-x-3 ml-3 lg:space-x-5 h-12">
          <Button className="hidden md:flex items-center border text-black hover:bg-gray-100 bg-white px-4 h-12 rounded-lg shadow-md">
            <span>Get the app:</span>
            <div className="flex items-center ml-2">
              <img src={AppStore} className="w-7 h-8" alt="App Store" />
              <img
                src={playstore}
                className="w-5 ml-2"
                alt="Google Play Store"
              />
            </div>
          </Button>
          <ProfileDialog />
        </div>
      </div>

      {/* Mobile Search Section */}
      <div className="flex md:hidden mx-4 mb-5">
        <motion.div
          className="w-full h-12 border border-gray-300 shadow-md bg-white rounded-md relative flex items-center px-4 cursor-pointer focus:border-gray-400 focus:outline-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Search className="size-6 text-gray-600" />
          </motion.div>

          <AnimatePresence>
            <motion.input
              type="text"
              key={transitionTexts[currentIndex]}
              value={query}
              onChange={handleSearch}
              placeholder={
                isMobileInputFocused ? "" : transitionTexts[currentIndex]
              }
              onFocus={() => {
                setIsMobileInputFocused(true);
                setIsAnimationEnabled(false);
              }}
              onBlur={() => {
                setIsMobileInputFocused(false);
                setIsAnimationEnabled(true);
              }}
              className="absolute left-10 w-full h-full bg-transparent text-gray-500 text-md font-medium 
              outline-none border-none focus:outline-none focus:ring-0 focus:border-transparent ml-2
              active:outline-none active:ring-0 active:border-transparent font-poppins"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Navbar;
