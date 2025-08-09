import React, { useEffect, useState } from "react";
import { Link, Search, ShoppingCart, User } from "lucide-react";
import { Link as Links } from "react-router";
import useAuth from "../hooks/useAuth";
import useCarts from "../hooks/useCarts";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("mode") || "light");
  const { user,logOut} = useAuth();
  const {carts=[]}=useCarts() 
  const handleLogOut=()=>{
    logOut()
    .then(res =>{
      // console.log(res);
    })
  }

  const shopCategories = [
    {
      name: "Men's Fashion",
      subcategories: ["T-Shirts", "Shirts", "Pants", "Jackets"],
    },
    {
      name: "Women's Fashion",
      subcategories: ["Dresses", "Tops", "Skirts", "Accessories"],
    },
    {
      name: "Accessories",
      subcategories: ["Watches", "Bags", "Jewelry", "Sunglasses"],
    },
  ];

  const handleAutoClose=()=>{
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("mode", theme);
  }, [theme]);

  const handleThemeChange = () => {
    if (theme !== "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 py-4 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold tracking-tighter">
            TendyTales
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative">
              <button
                className="flex items-center space-x-1 hover:text-gray-600"
                onClick={() => setIsShopOpen(!isShopOpen)}
              >
                <span>Shop</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Shop Drawer (right-side, width-limited) */}
              <div
                className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50
                ${
                  isShopOpen ? "translate-x-0" : "translate-x-full"
                } w-[340px] max-w-full `}
              >
                <div className="p-6 h-full overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Shop Categories</h3>
                    <button
                      onClick={() => setIsShopOpen(false)}
                      className="text-gray-500 hover:text-black"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {shopCategories.map((category, index) => (
                    <div key={index} className="mb-6 ">
                      <h4 className="font-medium mb-2">{category.name}</h4>
                      <div className="space-y-2">
                        {category.subcategories.map((sub, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block text-gray-600 dark:text-white hover:text-black pl-2"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overlay */}
            </div>
           
            <a href='#newArrive' className="hover:text-gray-600">
              New Arrivals
            </a>

          </div>
          <div>
            {/* <button className='btn' onClick={handleThemeChange}>Theme Change</button> */}

            {/* sun icon */}
            {theme === "light" && (
              <svg
                onClick={handleThemeChange}
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            )}

            {/* moon icon */}
            {theme === "dark" && (
              <svg
                onClick={handleThemeChange}
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </div>

          {/* Search and Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-[300px] pl-10 pr-4 py-2 bg-gray-100 outline-1 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button className="hover:text-gray-600 relative group">
               <Links to='/dashboard/cart'> <ShoppingCart className="w-6 h-6 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {carts?.length || 0}
                </span>
                </Links> 
                <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-gray-500 rounded-xl shadow-lg overflow-hidden">
    
     

      {/* Mobile Card View */}
      <div className="">
        <div className="bg-gradient-to-r  from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Products</h3>
        </div>
        <Links to='/dashboard/cart' className="divide-y divide-gray-100 ">
          {carts.map((product) => (
            <div 
              key={product._id} 
              className="p-4 hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 transition-all duration-200 "
            >
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-lg object-cover shadow-sm"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm font-bold text-gray-900 ml-2">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Links>
      </div>
    </div>
                </div>
              </button>

              {/* User */}
              <button className="hover:text-gray-600 relative group">
                <User className="w-6 h-6 cursor-pointer" />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-500 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {/* <div className="py-2"> */}

                  {user ?  <div className="py-2">
                      <Links onClick={()=>handleLogOut()} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-white ">
                        LogOut
                      </Links>
                      <Links to='/dashboard' className="block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-white ">
                        Dashboard
                      </Links>
                    </div>
                  : 
                    <div className="py-2">
                      <Links
                        to="/signin"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white "
                      >
                        Sign In
                      </Links>
                      <Links
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-white "
                      >
                        Create Account
                      </Links>
                    </div>
                  }

                  {/* </div> */}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-gray-500 transition-transform duration-200 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black transition-opacity duration-200 dark:bg-gray-500 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black transition-transform duration-200 dark:bg-gray-500 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-y-0 right-0 w-[300px] max-w-sm bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <button
                    className="flex items-center justify-between w-full py-2"
                    onClick={() => setIsShopOpen(!isShopOpen)}
                  >
                    <span className="text-lg">Shop</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isShopOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`pl-4 space-y-4 mt-2 ${
                      isShopOpen ? "block" : "hidden"
                    }`}
                  >
                    {shopCategories.map((category, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-2">{category.name}</h4>
                        <div className="space-y-2 pl-2">
                          {category.subcategories.map((sub, subIndex) => (
                            <a
                            onClick={handleAutoClose}
                              key={subIndex}
                              href="#"
                              className="block text-gray-600 dark:text-white hover:text-black"
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                
                <a href="#newArrive" className="block text-lg py-2" onClick={handleAutoClose}>
                  New Arrivals
                </a>
                <Links to="dashboard/cart" onClick={handleAutoClose}>
                My Carts
                </Links>

                <div className="pt-6 space-y-4 flex flex-col">
                  {user?<><button
                  onClick={()=>handleLogOut()}
                    
                    className="w-full py-3 text-center bg-black dark:bg-amber-50 text-white dark:text-black rounded-full transition-colors"
                  >
                    Log Out
                  </button>
                  <Links to="/dashboard"
                    
                   className="w-full text-center py-3 border border-black rounded-full transition-colors"
                  >
                    DashBoard
                  </Links>
                  </>:<><Links
                    to="/signin"
                    className="w-full py-3 text-center bg-black dark:bg-amber-50 text-white dark:text-black rounded-full transition-colors"
                  >
                    Sign In
                  </Links>
                  <Links
                    to="/signup"
                    className="w-full text-center py-3 border border-black rounded-full transition-colors"
                  >
                    Create Account
                  </Links></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
