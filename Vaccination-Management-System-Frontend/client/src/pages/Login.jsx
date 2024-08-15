import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { patientLogin } from "../service/patient";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.error("Email Required !!!");
    } else if (password.length === 0) {
      toast.error("Password Required !!!");
    } else {
      try {
        const response = await patientLogin(email, password);
        console.log(response.data);
        if (response.data && response.data.address) {
          sessionStorage.setItem("patientId", response.data.userId);
          sessionStorage.setItem("patientEmail", response.data.email);
          sessionStorage.setItem("patientPassword", response.data.password);
          sessionStorage.setItem("patientFirstName", response.data.firstName);
          sessionStorage.setItem("patientLastName", response.data.lastName);
          sessionStorage.setItem("patientPhone", response.data.phoneNumber);
          sessionStorage.setItem(
            "aadharNumber",
            response.data.aadharCardNumber
          );
          sessionStorage.setItem("street", response.data.address.street);
          sessionStorage.setItem("city", response.data.address.city);
          sessionStorage.setItem("state", response.data.address.state);
          sessionStorage.setItem("zipCode", response.data.address.zipCode);

          toast.success("Login successful!");
          navigate("/patient-dashboard");
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
              src="https://npr.brightspotcdn.com/45/16/45391ef44dfc9d5c2015bbdaa5e2/kids-vaccine-illustration-istock.png"
              alt="Vaccine illustration"
              className="w-full h-40 object-cover rounded-t-md"
            />
          </div>
          <h2 className="block text-center text-gray-700 text-xl font-bold mb-6">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                id="email1"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                id="pass1"
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
              >
                Login
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <Link to={"/register"}>Register</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
