import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../axios/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';
import useUserRole from '../../hooks/useUserRole';
import useAxiosSecure from '../../axios/useAxiosSecure';
import useCarts from '../../hooks/useCarts';

const NewRevealProduct = () => {
  const axiosPublic=useAxiosPublic();
  const {user}=useAuth();
  const axiosSecure=useAxiosSecure()
  const {role,refetch}=useUserRole();
 const {carts,cartsRefetch}=useCarts() 
const navigate=useNavigate();
useEffect(()=>{
  refetch()
},[refetch,user])

const {data:products=[]}=useQuery({
  queryKey:["isNewArrival"],
  queryFn:async()=>{
    const {data}=await axiosPublic.get(`/isNewArrival`)
  
    return data
  }
})


const handleAddToCart =async(product)=>{
  // console.log(product);
  const isExist=carts?.find(cart=>cart?.productId === product?._id)
 if(isExist){
   Swal.fire({
  position: "top-end",
  icon: "error",
  title: "Already Added Carts ",
  showConfirmButton: false,
  timer: 1500
});
return
 }
  if(!user){
    Swal.fire({
  position: "top-end",
  icon: "error",
  title: "Please Log in ",
  showConfirmButton: false,
  timer: 1500
});
return  navigate('/signin')
}

if(role){
  
  return   Swal.fire({
  position: "top-end",
  icon: "error",
  title: "You are Admin ",
  showConfirmButton: false,
  timer: 1500
});


}
else{
  
  // console.log(product);
  const{name,price,image,category,description,isNewArrival ,stock,ratings,discount,persent,_id}=product
  const addCard={name,price,image,category,description,isNewArrival,stock,ratings,discount,persent,email:user?.email,productId:_id}

  const  {data}=await axiosSecure.post("/addCarts",addCard);
  if(data?.insertedId){
    cartsRefetch()
     Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Cart Add SuccessFully ",
  showConfirmButton: false,
  timer: 1500
});
  }

}

}



    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800" id='newArrive'>
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 dark:text-gray-400">
              Fashion Store
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto  dark:text-gray-400">
              Discover the latest trends and timeless classics in our curated collection
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      {/* <ProductSection
        title="NEW ARRIVALS"
        products={sampleProducts}
        onAddToCart={handleAddToCart}
      /> */}

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 p-10">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}

       </div>
      {/* Additional Sections */}
      <div className="bg-white py-16  dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2  dark:text-gray-400">Free Shipping</h3>
              <p className="text-gray-600  dark:text-gray-400">Free shipping on orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-gray-400">Quality Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">100% satisfaction guaranteed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-gray-400">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default NewRevealProduct;