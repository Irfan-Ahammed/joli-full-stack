import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "../ui/command";
import { motion } from "framer-motion";
import axios from "axios";
import { setLocation } from "@/redux/locationSlice";

function SearchLocation() {
  const [query, setQuery] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.locations); // Get locations from Redux

  useEffect(() => {
    const fetchLocationAPI = async () => {
      if (query.length > 2) {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
          );
          dispatch(setLocation(res.data));
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(setLocation([]));
      }
    };

    fetchLocationAPI();
  }, [query, dispatch]);

  return (
    <div className="relative flex items-center">
      {/* Search Box with Icon */}
      <motion.div
        className="flex items-center border w-48 lg:w-80 border-gray-300 rounded-lg text-sm text-slate-400 h-12 relative cursor-pointer hover:border-primary focus-within:border-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icon */}
        <MapPin className="size-4 bottom-4 left-2 absolute text-slate-400" />
        {/* Input */}
        <input
          type="text"
          placeholder="Location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpenLocation(true)}
          onBlur={() => setTimeout(() => setOpenLocation(false), 200)}
          className="flex-1 bg-transparent border-none ml-7 focus:outline-none focus:ring-0"
        />
      </motion.div>

      {/* Dropdown List */}
      {openLocation && locations.length > 0 && (
        <Command className="rounded-lg border shadow-md md:max-w-80 absolute h-auto top-12 bg-white z-10">
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.place_id}
                  onSelect={() => {
                    setQuery(location.display_name);
                    setOpenLocation(false);
                  }}
                  className="cursor-pointer px-3 text-sm py-2 hover:bg-gray-100"
                >
                  {location.display_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-primary text-white font-semibold md:px-6 md:py-2 mx-2 rounded-lg shadow-lg"
      >
        Find
      </motion.button>
    </div>
  );
}

export default SearchLocation;
