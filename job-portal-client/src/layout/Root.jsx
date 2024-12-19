import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const Root = () => {
  return (
    <div className=''>
     <div className='container mx-auto'>
     <Navbar/>
     </div>
     <div className='min-h-[calc(100vh-200px)] container mx-auto'>
        <Outlet/>
     </div>
     <div>
        <Footer/>
     </div>
    </div>
  )
}

export default Root
