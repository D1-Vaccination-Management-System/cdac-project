import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register2 } from "../service/patient";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [aadharCardNumber, setAadharCardNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !aadharCardNumber ||
      !street ||
      !city ||
      !state ||
      !zipCode
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address: {
        street,
        city,
        state,
        zipCode,
      },
      aadharCardNumber,
    };
    const register = await register2(formData);
    console.log(register);
    if (register.status === 201) {
      toast.success("Registration successful!");
      navigate("/login");
    } else {
      toast.error("Rgistration Failed");
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
            Register
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="First Name"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Phone Number"
                  maxLength={10}
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={aadharCardNumber}
                  onChange={(e) => setAadharCardNumber(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Aadhar Card Number"
                  maxLength={12}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Street"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="State"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Zip Code"
                  maxLength={6}
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                onClick={handleSubmit}
              >
                Register
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <Link to={"/login"}>Login</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
