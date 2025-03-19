import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import JobCard from "./jobs/JobCard";

function SaveJobs() {
  const { saveJobs } = useSelector((state) => state.saveJobs);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="fixed z-40 bottom-6 right-6 bg-black text-white rounded-full shadow-lg hover:bg-slate-600 transition-all"
          size="icon"
        >
          <Bookmark size={23} />
          {saveJobs.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 text-sm flex items-center justify-center font-bold rounded-full bg-red-500 text-white">
              {saveJobs.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Saved Jobs</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 grid md:grid-cols-3 gap-4 justify-center max-h-[60vh] overflow-y-auto">
          {saveJobs.length > 0 ? (
            saveJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No saved jobs yet.
            </p>
          )}
        </div>

        <div className="p-4 mr-4 flex justify-end">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SaveJobs;
