import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="">
      {/* navbar */}
      <Navbar />
      <div className="w-full min-h-[calc(100vh-112px)] ">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
