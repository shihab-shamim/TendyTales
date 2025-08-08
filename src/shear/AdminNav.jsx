import { useState } from "react";
import { Menu, X, ShoppingCart, Package, User, Star, Home } from "lucide-react";
import { Link } from "react-router";

export default function AdminNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { icon: <ShoppingCart size={20} />, label: "All User", path: "/dashboard/allUser" },
    { icon: <Package size={20} />, label: "Add Product", path: "/dashboard/addProduct" },
    { icon: <User size={20} />, label: "All Product", path: "/dashboard/allProducts" },
    { icon: <Star size={20} />, label: "Notification", path: "/dashboard/review" },
    { icon: <Home size={20} />, label: "Home", path: "/" },
  ];

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <div
        className={`fixed z-40 md:relative top-0 left-0 min-h-screen w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="p-6 border-b text-xl font-bold text-blue-600"> Admin Dashboard</div>
        <ul className="p-4 space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
     <div className= " flex md:hidden z-100">
        {sidebarOpen ? <X size={28} onClick={toggleSidebar} /> : <Menu onClick={toggleSidebar} size={28} />}
     </div>
    </div>
  );
}
