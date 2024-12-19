import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const LatestJobs = () => {
    const[jobs, setJobs] = useState([])
    const location = useLocation()
    useEffect(()=>{
        fetch("https://job-portal-server-ten-kappa.vercel.app/jobs")
        .then(res=>res.json())
        .then(data=>{
            
            if (location?.pathname ==='/') {
              setJobs(data.slice(0,8))
            }else{
              setJobs(data)
            }
            
        })
        .catch(error=>toast.error(error.message))
    },[])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
     {
        jobs.map(job=><JobCard key={job._id} job={job} />)
     }
    </div>
  )
}

export default LatestJobs
