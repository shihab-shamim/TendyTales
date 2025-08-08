import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../axios/useAxiosPublic";
import ProductCard from "./ProductCard";
import useAxiosSecure from "../../axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";


const AllProduct = () => {
    const axiosPublic=useAxiosPublic();
    const axiosSecure=useAxiosSecure();
      const queryClient = useQueryClient();
       const [total,setTotal]=useState({});
       const [page, setPage] = useState(1);
       const [search, setSearch] = useState("");
      const limit = 6;

      const totalPages = Math.ceil(total / limit);

     const {data=[],refetch,isLoading} = useQuery({ 
        queryKey: ['products',page,search], 
        queryFn: async()=>{
            const {data}=await axiosPublic.get(`/products?page=${page}&limit=${limit}&search=${search}`)
          return data;


        } 
    })
    const deleteProduct = useMutation({
    mutationFn: async(id)=>{
        const {data}=await axiosSecure.delete(`/product/${id}`)
        console.log(data);
        return data

    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
 
     Swal.fire({
      title: "Deleted!",
      text: "Product deleted.",
      icon: "success"
    });
    },
    onError: (error) => {
      alert(`Error deleting users: ${error.message}`);
    },
  })


   const handleDelete= async(id)=>{
 
Swal.fire({
  title: "Are you sure?",
  text: "Delete This Product",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  cancelButtonText: "No",
  confirmButtonText: "Yes,"
}).then(async(result) => {
  if (result.isConfirmed) {
    deleteProduct.mutate(id)
   
  }
});
   
   }
    useEffect(() => {
     const dataCountFetch = async () => {
       try {
         const { data } = await axiosSecure.get(`/productCount?search=${search}`);
         setTotal(data?.count);
         
       } catch (error) {
         console.error("Error fetching data count:", error);
       }
     };
   
     dataCountFetch();
   }, [search]);
   
 
  //  if(isLoading){
  //   return (<div>
  //     <MoonLoader />
  //   </div>)
  //  }
   

 

    return (
         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our premium collection of products with smooth animations and intuitive interactions
          </p>
        </div>
        <label className="input border-1 border-black w-full mb-8">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" className="grow" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
 
</label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
          {data.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onDelete={() => handleDelete(product?._id)}
            />
          ))}
        </div>
        
        {isLoading && <div className="flex justify-center"> <MoonLoader color="blue" /></div>}

 <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
    ); 
};

export default AllProduct;