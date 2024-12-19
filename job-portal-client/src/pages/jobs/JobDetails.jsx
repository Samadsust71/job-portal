import React from "react";
import { FaIndustry } from "react-icons/fa";
import { FiBriefcase, FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const loadedJob = useLoaderData();
  const {
    _id,
    company,
    company_logo,
    location,
    position,
    job_type,
    posted_time,
    description,
    skills,
    rate_per_hour,
    status,
    deadline,
  } = loadedJob || {};
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="my-10">
      <div className="space-y-6">
        <div>
          <img
            src="https://jobbox-html-frontend.vercel.app/assets/imgs/page/job-single/thumb.png"
            alt=""
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{position}</h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <span className="flex items-center">
              <FiCalendar className="mr-1" /> {job_type}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-1" /> {posted_time} minutes ago
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="max-w-2xl mx-auto  rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            Employment Information
          </h2>
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {/* Industry */}
            <div className="flex items-start">
              <FaIndustry className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold">Company</p>
                <p className="">{company}</p>
              </div>
            </div>
            {/* Job Level */}
            <div className="flex items-start">
              <FiBriefcase className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold ">Job Level</p>
                <p className="">{position}</p>
              </div>
            </div>
            {/* Salary */}
            <div className="flex items-start">
              <FiDollarSign className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold ">Salary</p>
                <p className="">${rate_per_hour}/hour</p>
              </div>
            </div>
            {/* Experience */}
            <div className="flex items-start">
              <FiClock className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold">
                  Skills
                </p>
                <p className="">{skills.join(",")}</p>
              </div>
            </div>
            {/* Job Type */}
            <div className="flex items-start">
              <FiBriefcase className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold">Job Type</p>
                <p className="">{job_type}</p>
              </div>
            </div>
            {/* Deadline */}
            <div className="flex items-start">
              <FiCalendar className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold">Deadline</p>
                <p className="">{deadline}</p>
              </div>
            </div>
            {/* Updated */}
            <div className="flex items-start">
              <FiCalendar className="text-blue-500 mt-1 mr-2" size={18} />
              <div>
                <p className="text-sm font-semibold ">Updated</p>
                <p className="">{formatDate(new Date())}</p>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-start">
              <MdOutlineLocationOn
                className="text-blue-500 mt-1 mr-2"
                size={18}
              />
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="">{location}</p>
              </div>
            </div>
            {/* description */}
            <div className="col-span-2">
              <h1 className="font-bold">Description:</h1>
              <p>{description}</p>
            </div>
           
          </div>
           {/* apply button */}
           <div className="mt-6">
                <Link to={`/job-apply/${_id}`} className="btn bg-base-300 btn-sm text-PrimaryBlue hover:bg-PrimaryBlue hover:text-white">Apply</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
