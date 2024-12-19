import React from "react";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
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
  } = job || {};
  return (
    <div className="bg-base-200 shadow-lg rounded-lg p-5 border border-gray-200 flex flex-col">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          {/* Company Logo */}
          <div className="w-12 h-12  rounded-md flex items-center justify-center">
           <img src={company_logo} alt={company} />
          </div>
          <div>
            <h2 className="text-xl font-bold ">{company}</h2>
            <div className="flex items-center text-gray-500 text-sm">
              <FiMapPin className="mr-1" />
             {location}
            </div>
          </div>
        </div>
        {/* Lightning Icon */}
        {
          status === "Active" && <div className="text-green-500">
          <BsLightningCharge size={20} />
        </div>
        }
      </div>

      {/* Job Title */}
      <h3 className="mt-4 text-lg font-bold ">
       {position}
      </h3>
      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
        <span className="flex items-center">
          <FiCalendar className="mr-1" /> {job_type}
        </span>
        <span className="flex items-center">
          <FiClock className="mr-1" /> {posted_time} minutes ago
        </span>
      </div>

      {/* Description */}
      <div className="flex-grow">
      <p className=" text-sm mt-4 leading-relaxed">
       {description.slice(0,70)}...
      </p>
      </div>
      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4 flex-grow">
        {
          skills.map((skill,idx)=><span key={idx} className="badge badge-outline">{skill}</span>)
        }
        
      </div>

      {/* Bottom Section */}
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-PrimaryBlue text-2xl font-bold">${rate_per_hour}<span className="text-gray-500 text-sm">/Hour</span></h3>
       
        <Link to={`/jobs/${_id}`} className="btn bg-base-300 btn-sm text-PrimaryBlue hover:bg-PrimaryBlue hover:text-white">Job Details</Link>
      </div>
    </div>
  );
};

export default JobCard;
