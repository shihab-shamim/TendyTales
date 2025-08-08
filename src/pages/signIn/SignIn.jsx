import { Link, Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useUserPost from "../../hooks/useUserPost";

const SignIn = () => {
  const navigate = useNavigate();
  const { createUser, user } = useAuth();
  const userPost = useUserPost();
  
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photo = data.photo;
    const userInfo = {
      name,
      email,
      password,
      role: "user",
      image: photo,
    };
    try {
      const user = await createUser(email, password);
      console.log(user);
      if (user) {
        await userPost.mutate(userInfo);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (user) {
    return <Navigate to="/" replace />;
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800  px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 my-12 p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center dark:text-white text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block dark:text-white text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              name="name"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && <span>This field is required</span>}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block dark:text-white text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && <span>This field is required</span>}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block dark:text-white text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Password must contain at least one uppercase and one lowercase letter",
                },
              })}
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
    placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {errors.password && <span>{errors.password.message}</span>}
          </div>

          {/* Profile Photo */}
          <div>
            <label
              htmlFor="photo"
              className="block dark:text-white text-sm font-medium text-gray-700"
            >
              Profile Photo
            </label>
            <input
              {...register("photo", { required: true })}
              id="photo"
              name="photo"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.photo && <span>This field is required</span>}
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* OR Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 dark:text-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign-Up Button */}
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
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
