import "./App.css";
import Home from "./pages/Home";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./pages/ScrollToTop";
import About from "./pages/About";
import PatientDashboard from "./pages/PatientDashBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import HealthStaffLogin from "./pages/HealthStaffLogin";
import HealthStaffDashboard from "./pages/HealthStaffDashboard";
import Contact from "./pages/Contact";
import CenterRegister from "./pages/CenterRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/admin-login", element: <AdminLogin /> },
      { path: "/patient-dashboard", element: <PatientDashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/admin-dashboard", element: <AdminDashboard /> },
      { path: "/health-staff/login", element: <HealthStaffLogin /> },
      { path: "/health-staff/dashboard", element: <HealthStaffDashboard /> },
      { path: "/contact", element: <Contact /> },
      { path: "/register-center", element: <CenterRegister /> }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
