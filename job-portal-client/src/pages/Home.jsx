import React from 'react'
import Banner from '../components/banner/Banner'
import JobCategories from '../components/jobs/JobCategories'
import JobLocations from '../components/jobs/JobLocations'
import LatestJobs from '../components/jobs/LatestJobs'

const Home = () => {
  return (
    <div>
      <Banner/>
      <JobCategories/>
      <LatestJobs/>
      <JobLocations/>
    </div>
  )
}

export default Home
