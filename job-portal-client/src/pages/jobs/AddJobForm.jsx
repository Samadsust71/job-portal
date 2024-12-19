import React, { useState } from "react";
import Select from "react-select";
import {
  FaBuilding,
  FaBriefcase,
  FaEnvelope,
  FaDollarSign,
  FaTools,
  FaUserTie,
  FaRegCalendarAlt,
  FaClipboardCheck,
  FaClock,
  FaPen,
} from "react-icons/fa";
import { IoLocationSharp, IoLogoSlack } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import useInfo from "../../hook/useInfo";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
    const {user} = useInfo()
    const navigate = useNavigate()
  const [jobData, setJobData] = useState({
    company: "",
    company_logo: "",
    location: "",
    position: "",
    job_type: "", // Added job type state
    posted_time: "",
    description: "",
    skills: [],
    rate_per_hour: "",
    hr_email: user?.email,
    hr_name: user?.displayName,
    status: "Active",
    deadline: "",
  });

  const skillsOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Django", label: "Django" },
    { value: "SQL", label: "SQL" },
    { value: "AWS", label: "AWS" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
  ];

  const jobTypeOptions = [
    { value: "Fulltime", label: "Fulltime" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSkillsChange = (selectedOptions) => {
    setJobData({ ...jobData, skills: selectedOptions.map((option) => option.value) });
  };

  const handleJobTypeChange = (selectedOption) => {
    setJobData({ ...jobData, job_type: selectedOption.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://job-portal-server-ten-kappa.vercel.app/jobs',jobData)
    .then(res=>{
        toast.success("job added successfully!!!")
        navigate('/my-posted-job')
    })
    .catch(err=>toast.error(err.message || "something went wrong!!"))
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaBuilding className="mr-2" /> Company
            </span>
          </label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            className="input input-bordered"
            required
          />
        </div>

        {/* Company Logo */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <IoLogoSlack className="mr-2" /> Company Logo
            </span>
          </label>
          <input
            type="url"
            name="company_logo"
            value={jobData.company_logo}
            onChange={handleChange}
            placeholder="Enter company logo URL"
            className="input input-bordered"
            required
          />
        </div>
        {/* Company Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <IoLocationSharp className="mr-2" /> Location
            </span>
          </label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="Enter company location"
            className="input input-bordered"
            required
          />
        </div>

        {/* HR Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaUserTie className="mr-2" /> HR Name
            </span>
          </label>
          <input
            type="text"
            name="hr_name"
            value={jobData.hr_name}
            onChange={handleChange}
            placeholder="Enter HR name"
            className="input input-bordered"
            required
          />
        </div>

        {/* HR Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaEnvelope className="mr-2" /> HR Email
            </span>
          </label>
          <input
            type="email"
            name="hr_email"
            value={jobData.hr_email}
            readOnly
            onChange={handleChange}
            placeholder="Enter HR email"
            className="input input-bordered"
            required
          />
        </div>
        {/*position */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaRankingStar className="mr-2" /> Position
            </span>
          </label>
          <input
            type="text"
            name="position"
            value={jobData.position}
            onChange={handleChange}
            placeholder="Enter position"
            className="input input-bordered"
            required
          />
        </div>

        {/* Skills Multi-Select */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaTools className="mr-2" /> Skills
            </span>
          </label>
          <Select
            isMulti
            options={skillsOptions}
            onChange={handleSkillsChange}
            placeholder="Select skills..."
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#f3f4f6",
                borderColor: "#d1d5db",
                boxShadow: "none",
                "&:hover": { borderColor: "#9ca3af" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#f3f4f6",
                borderRadius: "0.375rem",
              }),
            }}
          />
        </div>

        {/* Rate Per Hour */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaDollarSign className="mr-2" /> Rate Per Hour
            </span>
          </label>
          <input
            type="number"
            name="rate_per_hour"
            value={jobData.rate_per_hour}
            onChange={handleChange}
            placeholder="Enter rate per hour"
            className="input input-bordered"
            required
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaBriefcase className="mr-2" /> Job Type
            </span>
          </label>
          <Select
            options={jobTypeOptions}
            onChange={handleJobTypeChange}
            placeholder="Select job type..."
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#f3f4f6",
                borderColor: "#d1d5db",
                boxShadow: "none",
                "&:hover": { borderColor: "#9ca3af" },
              }),
            }}
          />
        </div>

        {/* Status Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaClipboardCheck className="mr-2" /> Status
            </span>
          </label>
          <select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Posted Time */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaClock className="mr-2" /> Posted Time (hours ago)
            </span>
          </label>
          <input
            type="number"
            name="posted_time"
            value={jobData.posted_time}
            onChange={handleChange}
            placeholder="Enter hours since posting"
            className="input input-bordered"
            required
          />
        </div>

        

        {/* Deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaRegCalendarAlt className="mr-2" /> Deadline
            </span>
          </label>
          <input
            type="date"
            name="deadline"
            value={jobData.deadline}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center">
              <FaPen className="mr-2" /> Description
            </span>
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            className="textarea textarea-bordered h-24"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
