import { Outlet } from "react-router";
import Navbar from "../shear/Navbar";
import Footer from "../shear/Footer";



const Main = () => {
  

    return (
        <div className="max-w-[1440px] mx-auto">
            <Navbar/>
            <Outlet/>
            <Footer/>


            
        </div>
    );
};

export default Main;