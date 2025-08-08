import { createBrowserRouter } from "react-router";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/signIn/SignIn";
import LogIn from "../pages/logIn/LogIn";
import ErrorPage from "../pages/error/ErrorPage ";
import TestPrivate from "../pages/TestPrivate";
import Private from "../private/Private";
import Dashboard from "../layout/Dashboard";
import MyCart from "../pages/dashboard/MyCart";
import Profile from "../pages/user/Profile";
import AllUser from "../pages/dashboard/AllUser";
import AdminCheck from "../private/AdminCheck";
import WelcomePage from "../pages/dashboard/WelcomePage";
import AddProduct from "../pages/dashboard/AddProduct";
import AllProduct from "../pages/dashboard/AllProduct";
import EditProduct from "../pages/dashboard/EditProduct";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement:<ErrorPage/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
          path:"/signin",
          element:<LogIn/>
        },
        {
          path:"/signup",
          element:<SignIn/>
        },
        {
          path:"/private",
          element:<Private><TestPrivate/></Private>
        }
      ]
    },{
      path:"/dashboard",
      element:<Private><Dashboard/></Private>,
      children:[
        {
          path:"cart",
          element:<Private><MyCart/></Private>
        },
        {
          path:'profile',
          element:<Private><Profile/></Private>
        },
        {
          path:"allUser",
          element:<AdminCheck><AllUser/></AdminCheck>
        },
    {
      index: true, 
      element: <WelcomePage/>
    },
    {
      path:"addProduct",
      element:<AdminCheck><AddProduct/></AdminCheck>
    },
    {
      path:"allProducts",
      element:<AdminCheck><AllProduct/></AdminCheck>
    },
    {
      path:"editProduct/:id",
      element:<AdminCheck><EditProduct/></AdminCheck>

    }
      ]

    }
  ]);


  export default router;