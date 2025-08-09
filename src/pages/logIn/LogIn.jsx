import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from 'react-router'; 
import useAuth from '../../hooks/useAuth';
import { useEffect } from "react";

const LogIn = () => {
    
  const {logIn,user}=useAuth()
  
  const location=useLocation()

  const navigate=useNavigate()
 const from= location.state?.from?.pathname  || "/"
  
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();


  const onSubmit =async(data)=>{
    const email=data?.email;
    const password=data?.password;
    try{
      const {user}=await logIn(email,password)
      // console.log(user);
      if(user){
        setTimeout(() => {
 navigate(from);
}, 500); // 500ms delay
        
      }
    }
    catch(error){
      console.log(error);
    }
  }
  //  if (user) {
  //   return <Navigate to="/" replace />;
  // }


  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white ">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium dark:text-white text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              {...register("email", { required: true })}
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && <span>This field is required</span>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block dark:text-white text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: true })}
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.password && <span>This field is required</span>}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 block text-sm text-gray-900 dark:text-white">Remember me</span>
            </label>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* OR Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 dark:text-white  text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 
            rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <img
              className="w-5 h-5"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
