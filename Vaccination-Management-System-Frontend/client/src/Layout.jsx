import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const navbarPaths = ["/", "/about", "/login", "/register", "/contact", "/register-center"];
  return (
    <>
      {navbarPaths.includes(location.pathname) && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
