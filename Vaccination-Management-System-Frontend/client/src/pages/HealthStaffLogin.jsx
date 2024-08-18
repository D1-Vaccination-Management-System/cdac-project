import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { healthStaffLogin } from "../service/healthstaff";

const HealthStaffLogin = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email, password);
    if (email.length === 0) {
      toast.error("Please enter Email!");
    } else if (password.length === 0) {
      toast.error("Please enter Password!");
    } else {
      try {
        const response = await healthStaffLogin(email, password);
        console.log("Response:", response);
        if (response.data) {
          sessionStorage.setItem("staffId", response.data.userId);
          sessionStorage.setItem("staffEmail", response.data.email);
          sessionStorage.setItem("staffPassword", response.data.password);
          sessionStorage.setItem("staffFirstName", response.data.firstName);
          sessionStorage.setItem("staffLastName", response.data.lastName);
          sessionStorage.setItem("staffPhone", response.data.phoneNumber);
          sessionStorage.setItem("centerId", response.data.centerId);

          toast.success("Login Successful!");
          navigate("/health-staff/dashboard");
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
              src="https://img.freepik.com/free-vector/medical-good-team-hospital-staff-doctors-nurse-illustration_1284-53038.jpg"
              alt="Vaccine illustration"
              className="w-full h-30 object-cover rounded-t-md"
            />
          </div>
          <h2 className="block text-center text-gray-700 text-xl font-bold mb-6">
            Health Staff Login
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
            {/* <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Link to={"/register"}>Register</Link>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStaffLogin;
