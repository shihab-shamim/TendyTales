import { Outlet } from "react-router";
import UserNav from "../shear/UserNav";
import AdminNav from "../shear/AdminNav";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
  const {role}=useUserRole();

  return (
        <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-[30px] md:w-64 fixed top-0 left-0 h-full  shadow z-50">
        {role ? <AdminNav /> : <UserNav />}
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-[30px] md:ml-64 overflow-y-auto h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

