import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJob, setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const categories = useSelector((state) => state.category?.categories);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Fetch job details when component mounts
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  useEffect(() => {
    // Update isApplied when singleJob updates
    if (singleJob) {
      const isJobApplied = singleJob?.applications?.some(
        (app) => app.applicant === user?._id
      );
      setIsApplied(isJobApplied);
    }
  }, [singleJob, user]);

  const applyJobHandle = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);

        // Ensure immutability when updating Redux state
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...(singleJob.applications || []),
              { applicant: user?._id }
            ]
          })
        );

        dispatch(setAppliedJob(singleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!singleJob) {
    return (
      <div className="text-center text-lg font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 space-y-6"
    >
      <Card className="p-6 shadow-md border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {singleJob.title || "N/A"}
            </h1>
            <p className="text-gray-500">{singleJob.location || "N/A"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {singleJob.jobType}
              </Badge>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1">
                <IndianRupee size={13} /> {singleJob.wage}
              </Badge>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                {Array.isArray(categories)
                  ? categories.find((cat) => cat._id === singleJob.category)
                      ?.name || "N/A"
                  : "N/A"}
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandle}
            disabled={isApplied}
            className={`rounded-lg px-6 py-3 transition-all font-poppins font-semibold ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-blue-400 text-white"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </Card>

      <Card className="p-6 shadow-md border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold border-b pb-2">Job Details</h2>
        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
          <p>
            <strong>Role:</strong> {singleJob.title || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {singleJob.location || "N/A"}
          </p>
          <p>
            <strong>Salary:</strong> ${singleJob.wage.toLocaleString()}
          </p>
          <p>
            <strong>Total Applicants:</strong>{" "}
            {singleJob.applications?.length || 0}
          </p>
          <p>
            <strong>Posted Date:</strong> {singleJob.createdAt?.split("T")[0]}
          </p>
          <p>
            <strong>Posted By:</strong> {singleJob.userFullname || "Unknown"}
          </p>
          <p className="col-span-2">
            <strong>Description:</strong>{" "}
            {singleJob.description || "No description available"}
          </p>
          <p className="col-span-2">
            <strong>Requirements:</strong>{" "}
            {singleJob.requirements?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Active:</strong>
            <span
              className={`font-bold ${
                singleJob.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {singleJob.isActive ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobDescription;
