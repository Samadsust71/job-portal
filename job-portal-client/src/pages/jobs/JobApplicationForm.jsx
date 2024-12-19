import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhoneAlt, FaFileUpload, FaHeart, FaVenusMars } from 'react-icons/fa';
import useInfo from '../../hook/useInfo';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobApplicationForm = () => {
  const {id}= useParams()
  const {user} = useInfo()
  const [formData, setFormData] = useState({
    fullName: user?.displayName,
    email: user?.email,
    phone: '',
    gender: '',
    maritalStatus: '',
    resume: '',
  });
  const navigate = useNavigate()
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prev) => ({ ...prev, resume: file }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const applicantData = {...formData, job_id:id}
    
    // send data to server
    axios.post('https://job-portal-server-ten-kappa.vercel.app/job-applications',applicantData)
    .then(res=>{
      toast.success("Application Ssubmitted successfully!!!")
      navigate('/applied-jobs')
    })
    .catch(err=>{
      toast.error(err.message || "Something went wrong!")
    })
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Job Application</h2>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          {/* Full Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <div className="flex items-center border p-2 rounded-md">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="flex items-center border p-2 rounded-md">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                required
                readOnly
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <div className="flex items-center border p-2 rounded-md">
              <FaPhoneAlt className="text-gray-500 mr-2" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="123-456-7890"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <div className="flex items-center border p-2 rounded-md">
              <FaVenusMars className="text-gray-500 mr-2" />
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Marital Status Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Marital Status</span>
            </label>
            <div className="flex items-center border p-2 rounded-md">
              <FaHeart className="text-gray-500 mr-2" />
              <select
                name="maritalStatus"
                required
                value={formData.maritalStatus}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          {/* Resume Upload Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resume Link</span>
            </label>
            <div className="flex items-center border p-2 rounded-md">
              <FaFileUpload className="text-gray-500 mr-2" />
              <input
                type="url"
                name="resume"
                required
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder='http://example.com'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <motion.button
              type="submit"
              className="btn bg-PrimaryBlue text-white hover:bg-PrimaryBlue w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Application
            </motion.button>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default JobApplicationForm;
