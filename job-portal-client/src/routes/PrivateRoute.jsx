import React from 'react'
import useInfo from '../hook/useInfo'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {
   
    const {user,loading} = useInfo()
    const location = useLocation()
    
    if (loading) {
        return <div className='flex justify-center items-center min-h-80'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (user) {
        return children
    }

  return <Navigate state={location?.pathname} to={'/signIn'} /> 
}

export default PrivateRoute
