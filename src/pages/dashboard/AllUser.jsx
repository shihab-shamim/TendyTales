import React, { useState } from 'react';
import { User, Shield, ShieldCheck, Search, Filter } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../axios/useAxiosSecure';
import axios from 'axios';

const AllUser = () => {
    const axiosSecure=useAxiosSecure()

  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     name: 'Sarah Johnson',
  //     email: 'sarah.johnson@email.com',
  //     role: 'user',
  //     image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
  //   },
  //   {
  //     id: 2,
  //     name: 'Michael Chen',
  //     email: 'michael.chen@email.com',
  //     role: 'admin',
  //     image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  //   },
  //   {
  //     id: 3,
  //     name: 'Emily Davis',
  //     email: 'emily.davis@email.com',
  //     role: 'user',
  //     image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
  //   },
  //   {
  //     id: 4,
  //     name: 'David Wilson',
  //     email: 'david.wilson@email.com',
  //     role: 'user',
  //     image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
  //   }
  // ]);
   const {data:users=[],refetch,isLoading} = useQuery({ 
        queryKey: ['users'], 
        queryFn: async()=>{
            const {data}=await axiosSecure.get("/users")
          return data;


        } 
    })

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');


  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleMakeRole = async(user)=>{
 
    if(user?.role ==="admin"){
      const {data}=await axiosSecure.patch(`/users/${user?._id}`,{status:"user"})
       
      if(data?.matchedCount >0){
        refetch()
      }
      
    }
    else{
      // console.log("user",user?.role);
      const {data}=await axiosSecure.patch(`/users/${user?._id}`,{status:"admin"})
      
     if(data?.matchedCount >0){
        refetch()
      }
      

    }

  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
        <h2 className="text-xl font-semibold flex items-center text-blue-700">
          <User className="w-5 h-5 mr-2" />
          User Management
        </h2>
      </div>

      {/* Search and Filter */}
      <div className="p-4 flex flex-col md:flex-row gap-4 border-b border-gray-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-10 pr-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                {/* Image + Name */}
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>

                {/* Role */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role === 'admin' ? <ShieldCheck className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                    {user.role}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleMakeRole(user)}
                    className={`text-xs px-3 py-1 rounded-md font-medium transition ${
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center p-8 text-gray-500 text-sm">No users found</div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
