import React from "react";
import {
  ShoppingBag,
  Truck,
  Shield,
  Star,
  RotateCcw,
  CreditCard,
  Users,
  Smartphone,
  Shirt,
  Home,
  Gamepad2,
  BookOpen,
  Camera,
  Quote,
} from "lucide-react";

const WelcomePage = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description:
        "Free delivery on orders over $50. Fast and reliable shipping worldwide.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description:
        "Your payment information is safe with our encrypted checkout process.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description:
        "30-day return policy. Not satisfied? Return it hassle-free.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment",
      description:
        "Accept all major credit cards, PayPal, and digital wallets.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Users,
      title: "Trusted Sellers",
      description: "All our sellers are verified and rated by our community.",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const categories = [
    {
      icon: Smartphone,
      name: "Electronics",
      count: "15,000+ Products",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Shirt,
      name: "Fashion",
      count: "25,000+ Products",
      image:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: Home,
      name: "Home & Living",
      count: "12,000+ Products",
      image:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: Gamepad2,
      name: "Gaming",
      count: "8,000+ Products",
      image:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: BookOpen,
      name: "Books & Media",
      count: "20,000+ Products",
      image:
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: Camera,
      name: "Photography",
      count: "5,000+ Products",
      image:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300",
      gradient: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="
  bg-gradient-to-br from-blue-50 via-white to-blue-50 
  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
  pt-8 pb-16
"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-400 leading-tight mb-6">
                Discover Amazing
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block">
                  Products Online
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed dark:text-gray-400 ">
                Shop from millions of products across thousands of brands and
                categories. Get the best deals with fast delivery and secure
                payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-blue-600 cursor-pointer text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all">
                  Start Shopping
                </button>
                <button className="border-2 cursor-pointer border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                  Browse Categories
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <ShoppingBag className="w-6 h-6 text-blue-600 " />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    10M+ Products
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Secure Payment
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mb-2">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    5 Star Rated
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Online Shopping"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-400 mb-4">
              Why Choose Our Marketplace?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
              We provide the best shopping experience with unmatched service
              quality and customer satisfaction.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${feature.color} mb-6`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-400">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
