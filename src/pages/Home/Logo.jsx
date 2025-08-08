import brand1 from "../../assets/brand1.png"
import brand2 from "../../assets/brand2.png"
import brand3 from "../../assets/brand3.png"
import brand4 from "../../assets/brand4.png"
import brand5 from "../../assets/brand5.png"

const Logo = () => {
    return (
        <div className="bg-black py-12 -mt-[1px]">
            <div className="flex flex-wrap justify-center gap-5 md:gap-[60px]">
            <img src={brand1} alt="" />
            <img src={brand2} alt="" />
            <img src={brand3} alt="" />
            <img src={brand4} alt="" />
            <img src={brand5} alt="" /></div>
            
        </div>
    );
};

export default Logo;