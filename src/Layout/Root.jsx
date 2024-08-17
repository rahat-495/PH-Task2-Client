
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Nav from "../Shared/Navbar/Nav";

const Root = () => {
    return (
        <div className="overflow-x-hidden">

            <div className="sticky top-0 z-50 bg-[#D1D3D6]">
                <Nav/>
            </div>

            <div className="max-w-[1440px] mx-auto overflow-x-hidden">
                <Outlet/>
            </div>

            <div className="">
                <Footer/>
            </div>

        </div>
    );
};

export default Root;
