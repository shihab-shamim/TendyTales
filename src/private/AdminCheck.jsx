import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";


const AdminCheck = ({children}) => {
   const {user,loading}=useAuth()
    const location=useLocation()
    const {role,isLoading}=useUserRole()

    if(loading || isLoading){
        return <p>loading</p>
    }

    if(user && role){
        return children
    }
    
    return <Navigate to='/signin' state={{ from: location }}  />

};

export default AdminCheck;