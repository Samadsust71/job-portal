import React, { useEffect, useState } from "react";
import useInfo from "../../hook/useInfo";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hook/useAxiosSecure";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useInfo();
  const axiosInstance = useAxiosSecure()
  useEffect(() => {
    // fetch(`https://job-portal-server-ten-kappa.vercel.app/job-application?email=${user?.email}`,{
    //   method:"GET",
    //   credentials:"include"
    // })
    //   .then((res) => res.json())
    //   .then((data) => setApplications(data));

    // axios.get(`https://job-portal-server-ten-kappa.vercel.app/job-application?email=${user?.email}`,{withCredentials:true})
    // .then(res=>setApplications(res.data))

    axiosInstance.get(`/job-application?email=${user?.email}`)
    .then(res=>setApplications(res.data))

  }, [user?.email]);
   
  const handleDelete = (id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          
            axios.delete(`https://job-portal-server-ten-kappa.vercel.app/applications/${id}`)
            .then(res=>{
                if (res.data?.deletedCount) {
                    const remaining = applications.filter(app=>app?._id !==id)
                    setApplications(remaining)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      }); 
                }
            })
        }
      });
}
  return (
    <div className="max-w-5xl mx-auto p-6  rounded-lg shadow-lg my-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Applied Jobs</h2>
      <div className="divider"></div>
      {
        applications.length ? <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Job Type</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {/* row 1 */}
            {applications.map((app) => (
              <tr key={app?._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={app?.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{app?.company}</div>
                      <div className="text-sm opacity-50">{app?.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {app?.position}
                  </span>
                </td>
                <td>{app?.job_type
                }</td>
                <th>
                  <button onClick={()=>handleDelete(app?._id)} className="btn btn-ghost btn-xs text-red-500">
                    Cancel
                  </button>
                </th>
                <th>
                  <Link to={`/jobs/${app?.job_id}`}  className="btn btn-ghost btn-xs text-blue-500">
                    details
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        
      </table>:<div className="flex justify-center items-center my-5"><p className="text-center">No applied job here</p></div>
      }
    </div>
  );
};

export default AppliedJobs;
