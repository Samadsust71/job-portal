import React, { useEffect, useState } from "react";
import useInfo from "../../hook/useInfo";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useInfo();
  useEffect(() => {
    // fetch(`https://job-portal-server-ten-kappa.vercel.app/jobs?email=${user?.email}`)
    //   .then((res) => res.json())
    //   .then((data) => setJobs(data))
    //   .catch((err) => toast.error(err?.message || "Something went wrong"));

      axios.get(`https://job-portal-server-ten-kappa.vercel.app/jobs?email=${user?.email}`)
      .then(res=>setJobs(res.data))
      .catch(err=>toast.error(err?.message || "Something went wrong"))
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://job-portal-server-ten-kappa.vercel.app/jobs/${id}`).then((res) => {
          if (res.data.deletedCount) {
            const remaining = jobs.filter((job) => job?._id !== id);
            setJobs(remaining);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6  rounded-lg shadow-lg my-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Posted Jobs</h2>
      <div className="divider"></div>
      {jobs.length ? (
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Deadline</th>
              <th>Applicant</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {jobs.map((app) => (
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
                <td>{app?.deadline}</td>
                <th>
                  <span className="badge badge-ghost badge-sm">
                    {app?.applicationCount || 0}
                  </span>
                </th>              
                <th>
                  <button
                    onClick={() => handleDelete(app?._id)}
                    className="btn btn-ghost btn-xs text-red-500"
                  >
                    delete
                  </button>
                </th>
                <th>
                  <Link to={`/view-applications/${app?._id}`} className="badge badge-ghost badge-sm">
                    View Applicants
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center my-5">
          <p className="text-center">No Posted job here</p>
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
