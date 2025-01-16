import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const MainLayout = () => {
  return (
    <div className="text-xs font-poppins text-secondary tracking-wide">
      <div className="sticky top-0 z-50">
        {/* load navvar here*/}
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-129px)] flex justify-center items-center">
        {/* load pages here */}
        <Outlet />
      </div>
      <div>
        {/* load footer footer*/}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;