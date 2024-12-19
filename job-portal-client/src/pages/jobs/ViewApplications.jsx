import React from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const ViewApplications = () => {
  const applications = useLoaderData();
  const handleStatus= (e,id)=>{
    const data={
        status : e.target.value 
    }
    fetch(`https://job-portal-server-ten-kappa.vercel.app/job-applications/${id}`,{
        method: "PATCH",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        if (data.modifiedCount) {
            toast.success("Status Updated Succesfully!!!")
        }
    })
    .catch(err=>toast.error(err.message || "Something went wrong!!!"))
  }
  return (
    <div className="max-w-5xl mx-auto p-6  rounded-lg shadow-lg my-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Posted Jobs</h2>
      <div className="divider"></div>
      {applications.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Marital Status</th>
                <th>Resume Link</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app?._id}>
                  <th>{idx + 1}</th>
                  <td>{app?.fullName}</td>
                  <td>{app?.email}</td>
                  <td>{app?.gender}</td>
                  <td>{app?.maritalStatus}</td>
                  <td className="link text-green-600">
                    <a href={app?.resume} target="_blank">
                      Resume
                    </a>
                  </td>
                  <td>
                    <select onChange={(e)=>handleStatus(e,app?._id)} defaultValue={app?.status || "Under Review"} className="select select-bordered select-xs w-full max-w-xs">
                      <option>Under Review</option>
                      <option>Pending</option>
                      <option>Accepted</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No one applied yet</p>
      )}
    </div>
  );
};

export default ViewApplications;
