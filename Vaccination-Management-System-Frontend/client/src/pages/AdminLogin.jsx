import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin } from "../service/admin";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email.length === 0) {
      toast.error("Email Required !!!");
    } else if (password.length === 0) {
      toast.error("Password Required !!!");
    } else {
      try {
        const response = await adminLogin(email, password);
        console.log(response.data);
        if (response.data && response.data.vaccinationCenter) {
          sessionStorage.setItem("adminEmail", response.data.email);
          sessionStorage.setItem("adminPassword", response.data.password);
          sessionStorage.setItem(
            "vaccinationCenterId",
            response.data.vaccinationCenter.centerId
          );
          sessionStorage.setItem("adminFirstName", response.data.firstName);
          sessionStorage.setItem("adminLastName", response.data.lastName);
          sessionStorage.setItem("adminPhone", response.data.phoneNumber);

          toast.success("Login successful!");
          navigate("/admin-dashboard");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <img
              src="https://img.freepik.com/free-vector/man-woman-accessing-medical-website_1262-19801.jpg?w=900&t=st=1723564817~exp=1723565417~hmac=152d57bbf07fbafb2ae7c0f90b0bdeac12f72a035194ca481bbca549021f71e6"
              alt="Vaccine illustration"
              className="w-full h-40 object-cover rounded-t-md"
            />
          </div>
          <h2 className="block text-center text-gray-700 text-xl font-bold mb-6">
            Admin Login
          </h2>
          <div className="mb-4">
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
