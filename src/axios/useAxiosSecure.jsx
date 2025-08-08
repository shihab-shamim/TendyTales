import axios from "axios";
import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router";
import {  useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const axiosSecure=axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
})

const useAxiosSecure = () => {
    // onno project ar code

    

const { logOut } = useAuth() ;
//    console.log(user);

   

    const navigate =useNavigate()

    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res;
        },err=>{
            console.log("error tracked in the interceptor",err.response)
            if(err.response.status === 401 ){
                console.log("log out the use");
                logOut()
                navigate('/signin')

            }
            return Promise.reject(err);
        })

    },[logOut,navigate])

    return axiosSecure;
};

export default useAxiosSecure;