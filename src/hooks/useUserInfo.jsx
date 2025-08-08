import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from '../axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserInfo = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const {data,refetch,isLoading} = useQuery({ 
        queryKey: ['user'], 
        queryFn: async()=>{
            const {data}=await axiosSecure.get(`/user?email=${user?.email}`)
          return data;


        } 
    })
    return {data,refetch,isLoading}
};

export default useUserInfo;