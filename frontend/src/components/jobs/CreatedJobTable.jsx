import { Ellipsis, Eye, Pencil } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJob } from "@/redux/adminJobSlice";
import { timeAgo } from "@/utils/timeAgo";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
} from "../ui/table";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const popoverVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
};

const CreatedJobTable = () => {
  const dispatch = useDispatch();
  const createdJobs = useSelector((state) => state.adminJob?.createdJob);
  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs/${userId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setAllAdminJob(res.data.jobs));
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
      }
    };
    fetchJobs();
  }, [userId, dispatch]);

  if (!Array.isArray(createdJobs) || createdJobs.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        You have not created any jobs yet.
      </p>
    );
  }

  return (
    <motion.div
      className="overflow-x-auto"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-gray-200 text-gray-700 text-left uppercase text-sm">
            <TableRow className="border-0">
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium">
                Job Title
              </TableCell>
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium hidden sm:block">
                Category
              </TableCell>
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium">
                Date Created
              </TableCell>
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {createdJobs.map((job, index) => (
              <motion.tr
                key={job._id || index}
                className="border-0 hover:bg-gray-50"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <TableCell className="sm:px-6 sm:py-4 text-gray-900 font-medium">
                  {job.title}
                </TableCell>
                <TableCell className="sm:px-6 sm:py-4 text-gray-600 hidden sm:block">
                  {job.category || "N/A"}
                </TableCell>
                <TableCell className="sm:px-6 sm:py-4 text-gray-600">
                  {timeAgo(job.createdAt)}
                </TableCell>
                <TableCell className="sm:px-6 sm:py-4 text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gray-200 rounded-full"
                      >
                        <Ellipsis className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <motion.div
                      variants={popoverVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <PopoverContent className="bg-white shadow-lg border-slate-300 rounded-md p-1 w-32 mr-4">
                        <Button
                          className="flex items-center w-full px-3 py-2 border-b border-slate-200 hover:bg-gray-100 rounded bg-transparent justify-between"
                          onClick={() => navigate(`/profile/update/${job._id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() =>
                            navigate(`/profile/${job._id}/applicants`)
                          }
                          className="flex justify-between items-center w-full px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-4 w-4" />
                          Applicants
                        </Button>
                      </PopoverContent>
                    </motion.div>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default CreatedJobTable;
