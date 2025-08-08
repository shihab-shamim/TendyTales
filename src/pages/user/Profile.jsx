import { ClipLoader } from "react-spinners";
import useUserInfo from "../../hooks/useUserInfo";
import { useState } from "react";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
// import { getAuth, updatePassword } from "firebase/auth";
// import { app } from "../../firebase/firebase.config";

// const auth = getAuth(app);




const Profile = () => {
    const {handleUpdatedPass}=useAuth()
 const { data: user, refetch,isLoading } = useUserInfo();
 const [isOpen, setIsOpen] = useState(false);
 const [isOpenPass, setIsOpenPass] = useState(false);
 const [type,setType] =useState(false)
 const axiosSecure=useAxiosSecure()
  const queryClient = useQueryClient()
   const userPost = useMutation({
    mutationFn: async(userInfo)=>{
        const {data}=await axiosSecure.patch(`/user/${user?._id}`,userInfo)
        return data

    },
    onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['user'] });
  refetch(); // optional, if you want both
  setIsOpen(false);
  alert("User updated successfully");
},
    onError: (error) => {
      alert(`Error update user: ${error.message}`);
    },
  })

 const handleSubmite=async(e)=>{
    
    e.preventDefault()
    const image=e.target.image.value;
    const name=e.target.name.value;
    const userInfo={image,name}
    
   
   await userPost.mutate(userInfo);

    

 }


const handleSubmitePass =async(e)=>{
    e.preventDefault()
    const newPassword=e.target?.password?.value;

 handleUpdatedPass(newPassword)
.then(() => {
    alert("updated password")
    setIsOpenPass(false)
  
}).catch((error) => {
    console.log(error);
     setIsOpenPass(false)
 
});
}


if(isLoading) return <div className="max-w-[200px] mx-auto mt-8"><ClipLoader /></div>

    return (
     <>
 <div className="max-w-md mx-auto bg-white shadow-md hover:shadow-lg rounded-2xl overflow-hidden p-6 flex items-start gap-5 transition duration-300">
  <img
    src={user?.image}
    alt="Mitu"
    className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500"
  />

  <div className="flex-1 min-w-0">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition duration-200"
        >
          Edit
        </button>

        <button
          onClick={() => setIsOpenPass(true)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-md shadow-sm transition duration-200"
        >
          Change Password
        </button>
      </div>
    </div>

    <p className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
      {user?.role}
    </p>

    <p className="text-xs text-gray-400 break-all">
      ID: {user?._id}
    </p>
  </div>
</div>


<div className="relative flex justify-center">
     

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto transition duration-300 ease-out"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              

              <form onSubmit={handleSubmite} className="mt-4" action="#">
                <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200">
                  Image URL
                </label>

                {/* {[...Array(3)].map((_, index) => ( */}
                  <label  className="block mt-3" >
                    <input
                      type="text"
                      name="image"
                    //   id={`email-${index}`}
                      placeholder="image url..."
                      defaultValue={user?.image}
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>
                  <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200">
                 Name
                </label>
                <label  className="block mt-3" >
                    <input
                      type="text"
                      name="name"
                    //   id={`email-${index}`}
                      placeholder="type your name..."
                      defaultValue={user?.name}
                      className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </label>
                {/* ))} */}


                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full cursor-pointer px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Updated Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="relative flex justify-center">
     

      {isOpenPass && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto transition duration-300 ease-out"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              

              <form onSubmit={handleSubmitePass} className="mt-4" action="#">
                <label htmlFor="emails-list" className="text-sm text-gray-700 dark:text-gray-200">
                  New PassWord
                </label>

                {/* {[...Array(3)].map((_, index) => ( */}
                  <div>
  

  <div className="relative flex items-center mt-2">
    <button onMouseEnter={() => setType(true)}
onMouseLeave={() => setType(false)}   className="absolute cursor-pointer right-0 focus:outline-none rtl:left-0 rtl:right-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
      >
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path
          fillRule="evenodd"
          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    <input
    name="password"
      type={type?"text":"password"}
      placeholder="********"
      className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
    />
  </div>
</div>

                


                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={() => setIsOpenPass(false)}
                    className="w-full cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full cursor-pointer px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Updated Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
     </>




    );
};

export default Profile;