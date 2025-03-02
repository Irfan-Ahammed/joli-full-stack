import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

function SaveJobs() {
  return (
    <Button
      className="fixed z-40 top-4 right-20 sm:top-[90vh] sm:right-6 bg-black text-white rounded-full sm:shadow-lg hover:bg-slate-600 transition-all"
      size="icon"
    >
      <Bookmark size={23} />
      <span className="absolute -top-1 -right-1 w-5 font-bold rounded-full bg-red-500">0</span>
    </Button>
  );
}

export default SaveJobs;
