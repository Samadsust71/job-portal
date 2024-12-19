import axios from 'axios'
import React, { useEffect } from 'react'
import useInfo from './useInfo'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const axiosInstance = axios.create({
    baseURL:'https://job-portal-server-ten-kappa.vercel.app',
    withCredentials:true
})

const useAxiosSecure = () => {
    const {signOutUser} = useInfo()
    const navigate = useNavigate()
   
    useEffect(()=>{
     axiosInstance.interceptors.response.use((response)=>{
        return response
     },(error)=>{
        
         if (error.status=== 401 || error.status=== 403) {
            signOutUser()
            .then(()=>{
                navigate("/signIn")
            })
            .catch(err=>toast.error(err.message || "Something went wrong"))
         }
        return Promise.reject(error)
     })
        
    },[])

  return axiosInstance

}

export default useAxiosSecure
