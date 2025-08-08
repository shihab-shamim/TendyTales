import React, { useEffect, useState } from "react";
import {
  Package,
  Save,
  RotateCcw,
  Eye,
  Star,
  DollarSign,
  Tag,
  Image,
  FileText,
  Settings,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../axios/useAxiosSecure";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const axiosSecure=useAxiosSecure();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    isNewArrival: false,
    stock: "",
    ratings: "",
    discount: false,
    persent: "",
  });

  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



   const addProduct = useMutation({
    mutationFn: async(productData)=>{
        const {data}= await axiosSecure.post("/product",productData)
        console.log(data);
        return data

    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] })
      handleReset()
      alert("Product Added successfully!");
    },
    onError: (error) => {
      alert(`Error deleting users: ${error.message}`);
    },
  })

  const handleSubmit =async (e) => {
    e.preventDefault();
  
    addProduct.mutate(productData)
  };

  const handleReset = () => {
    setProductData({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
      isNewArrival: false,
      stock: "",
      ratings: "",
      discount: false,
      persent: "",
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      );
    }
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-8 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Product Management
          </h1>
          <p className="text-xl text-blue-600 mb-6">
            Create and manage your product information with style
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100 animate-slide-in-left hover:shadow-3xl transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6 animate-fade-in-up animation-delay-200">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900">
                      Basic Information
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-semibold text-blue-800 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={productData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField("")}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                            focusedField === "name"
                              ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                              : "border-blue-200 hover:border-blue-300"
                          }`}
                          required
                          placeholder="Enter product name"
                        />
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 -z-10 transition-opacity duration-300 ${
                            focusedField === "name" ? "opacity-20" : ""
                          }`}
                        ></div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-semibold text-blue-800 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("category")}
                        onBlur={() => setFocusedField("")}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                          focusedField === "category"
                            ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                            : "border-blue-200 hover:border-blue-300"
                        }`}
                        required
                      >
                        <option value="">Select category</option>
                        <option value="t-shirt">👕 T-Shirt</option>
                        <option value="shirt">👔 Shirt</option>
                        <option value="pant">👖 Pant</option>
                        <option value="jeans">👖 Jeans</option>
                        <option value="hoodie">🧥 Hoodie</option>
                        <option value="jacket">🧥 Jacket</option>
                        <option value="saree">🥻 Saree</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-semibold text-blue-800 mb-2">
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                        <input
                          type="number"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("price")}
                          onBlur={() => setFocusedField("")}
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                            focusedField === "price"
                              ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                              : "border-blue-200 hover:border-blue-300"
                          }`}
                          min="0"
                          step="0.01"
                          required
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-semibold text-blue-800 mb-2">
                        Stock <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("stock")}
                        onBlur={() => setFocusedField("")}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                          focusedField === "stock"
                            ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                            : "border-blue-200 hover:border-blue-300"
                        }`}
                        min="0"
                        required
                        placeholder="0"
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-sm font-semibold text-blue-800 mb-2">
                        Rating
                      </label>
                      <select
                        required
                        name="ratings"
                        value={productData.ratings}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("ratings")}
                        onBlur={() => setFocusedField("")}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                          focusedField === "ratings"
                            ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                            : "border-blue-200 hover:border-blue-300"
                        }`}
                      >
                        <option value="">Select rating</option>
                        <option value="1">⭐ 1.0</option>
                        <option value="1.5">⭐ 1.5</option>
                        <option value="2">⭐⭐ 2.0</option>
                        <option value="2.5">⭐⭐ 2.5</option>
                        <option value="3">⭐⭐⭐ 3.0</option>
                        <option value="3.5">⭐⭐⭐ 3.5</option>
                        <option value="4">⭐⭐⭐⭐ 4.0</option>
                        <option value="4.5">⭐⭐⭐⭐ 4.5</option>
                        <option value="5">⭐⭐⭐⭐⭐ 5.0</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-blue-800 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                      <input
                        required
                        type="url"
                        name="image"
                        value={productData.image}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("image")}
                        onBlur={() => setFocusedField("")}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                          focusedField === "image"
                            ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                            : "border-blue-200 hover:border-blue-300"
                        }`}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6 animate-fade-in-up animation-delay-400">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900">
                      Product Description
                    </h2>
                  </div>

                  <div className="form-group">
                    <label className="block text-sm font-semibold text-blue-800 mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("description")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm resize-none ${
                        focusedField === "description"
                          ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                          : "border-blue-200 hover:border-blue-300"
                      }`}
                      rows="4"
                      placeholder="Enter detailed product description..."
                    />
                  </div>
                </div>

                {/* Settings */}
                <div className="space-y-6 animate-fade-in-up animation-delay-600">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900">
                      Product Settings
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-blue-900 text-lg">
                            New Arrival
                          </h3>
                          <p className="text-blue-600">Mark as new product</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="isNewArrival"
                            checked={productData.isNewArrival}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-500"></div>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-blue-900 text-lg">
                            Discount
                          </h3>
                          <p className="text-blue-600">
                            Enable discount pricing
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="discount"
                            checked={productData.discount}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {productData.discount && (
                    <div className="form-group animate-slide-down">
                      <label className="block text-sm font-semibold text-blue-800 mb-2">
                        Discount Percentage
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          name="persent"
                          value={productData.persent}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField("persent")}
                          onBlur={() => setFocusedField("")}
                          className={`w-full px-4 pr-10 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white/50 backdrop-blur-sm ${
                            focusedField === "persent"
                              ? "border-blue-500 shadow-lg shadow-blue-200 scale-105"
                              : "border-blue-200 hover:border-blue-300"
                          }`}
                          placeholder="10"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 font-bold text-lg">
                          %
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in-up animation-delay-800">
                  <button
                    type="submit"
                    className=" cursor-pointer flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="w-6 h-6" />
                    <span>Add Product</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 hover:from-gray-600 hover:to-gray-700"
                  >
                    <RotateCcw className="w-6 h-6" />
                    <span>Reset Form</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-blue-100 animate-slide-in-right sticky top-8 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900">
                  Live Preview
                </h3>
              </div>

              {/* Product Preview Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-blue-200">
                <div className="aspect-square bg-white rounded-xl mb-4 overflow-hidden">
                  {productData.image ? (
                    <img
                      src={productData.image}
                      alt={productData.name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image className="w-12 h-12" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {productData.category || "Category"}
                    </span>
                    {productData.isNewArrival && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-gray-900 text-sm">
                    {productData.name || "Product Name"}
                  </h4>

                  {productData.ratings && (
                    <div className="flex items-center space-x-1">
                      {renderStars(parseFloat(productData.ratings))}
                      <span className="text-xs text-gray-600">
                        ({productData.ratings})
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-gray-600 line-clamp-2">
                    {productData.description ||
                      "Product description will appear here..."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-blue-600">
                        ${productData.price || "0.00"}
                      </span>
                      {productData.discount &&
                        productData.persent &&
                        productData.price && (
                          <span className="text-xs text-gray-500 line-through">
                            $
                            {Math.round(
                              productData.price *
                                (1 + parseInt(productData.persent) / 100)
                            )}
                          </span>
                        )}
                    </div>
                    <span className="text-xs text-gray-600">
                      Stock: {productData.stock || "0"}
                    </span>
                  </div>
                </div>
              </div>

              {/* JSON Preview */}
              <div className="bg-gray-900 rounded-xl p-4 max-h-64 overflow-y-auto">
                <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                  {JSON.stringify(productData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
