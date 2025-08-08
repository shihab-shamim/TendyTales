import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";


const useUserPost = () => {
    const queryClient = useQueryClient()
    const axiosPublic=useAxiosPublic()
    

  // Mutations
  const userPost = useMutation({
    mutationFn: async(userInfo)=>{
        const {data}=await axiosPublic.post('/users',userInfo)
        return data

    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
      alert("Selected users deleted successfully!");
    },
    onError: (error) => {
      alert(`Error deleting users: ${error.message}`);
    },
  })
    return userPost;
};

export default useUserPost;