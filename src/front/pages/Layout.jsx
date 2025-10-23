import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import BackendURL from "../components/BackendURL";

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <ScrollToTop />
            <Navbar />
            
            
            {import.meta.env.DEV && <BackendURL />}
            
            
            <main className="flex-grow-1">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default Layout;