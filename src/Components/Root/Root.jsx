import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponents/Navbar/Navbar";
import bgImg from "../../../public/assets/Rectangle1.png"
const Root = () => {
    return (
        <div className="relative min-h-screen">
            <div className='min-h-screen bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${bgImg})` }}>
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10">

                    <div className="w-full md:w-5/6 mx-auto">
                        <Navbar></Navbar>
                        <Outlet ></Outlet>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Root;