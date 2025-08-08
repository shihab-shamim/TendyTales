import React, { useState } from 'react';
import { Trash2, Star, Package, Eye } from 'lucide-react';
import useCarts from '../../hooks/useCarts';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../axios/useAxiosSecure';

const MyCart = () => {
  const { carts = [],cartsRefetch } = useCarts();
  const axiosSecure=useAxiosSecure()
  // console.log(carts);
  const [products, setProducts] = useState(carts);
  
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map(product => product._id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length > 0) {
      const confirmed = window.confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`);
      if (confirmed) {
        setProducts(prev => prev.filter(product => !selectedProducts.includes(product._id)));
        setSelectedProducts([]);
      }
    }
  };

  const handleDeleteSingle = (productId) => {
    Swal.fire({
  title: "Are you sure?",
  text: "Delete Your Cart",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes"
}).then(async(result) => {
  if (result.isConfirmed) {
    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });
    // console.log(productId);
    const {data}=await axiosSecure.delete(`/cart/${productId}`)
    console.log(data);
    if(data?.deletedCount>0){
       Swal.fire({
      title: "Deleted!",
      text: "Your cart deleted.",
      icon: "success"
    });
         cartsRefetch()
    }
   
    

  }
});
  
  };

  const discountedPrice = (price, discount) => {
    return Math.round(price + (price * discount / 100));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Product Management</h1>
              {selectedProducts.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedProducts.length})
                </button>
              )}
            </div>
          </div>
        </div> */}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {carts.map((product) => (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-50 transition-colors ${selectedProducts.includes(product._id) ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProduct(product._id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                          <p className="text-xs text-gray-400 mt-1">ID: {product.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.discount ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-gray-900 line-through">
                              ${discountedPrice(parseInt(product.price), parseInt(product.persent))}
                            </span>
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                              -{product.persent}%
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">${product.price}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-semibold text-gray-900">৳{product.price}</span>
                      )}
                    </td>
                   
                    
                   
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                       
                        <button
                          onClick={() => handleDeleteSingle(product._id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">Total Products</div>
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">Selected</div>
            <div className="text-2xl font-bold text-blue-600">{selectedProducts.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">New Arrivals</div>
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.isNewArrival).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500">On Sale</div>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.discount).length}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyCart;
