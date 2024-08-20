import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerCenter, registerAdmin } from "../service/vaccinationcenter";

const MultiStepRegistration = () => {
  const [step, setStep] = useState(1);
  const [centerId, setCenterId] = useState(null); // Store the registered center ID

  // Center details state
  const [centerName, setCenterName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Admin details state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const [aadharCardNumber, setAadharCardNumber] = useState("");

  const navigate = useNavigate();

  const handleCenterSubmit = async (e) => {
    e.preventDefault();
    if (!centerName || !phoneNumber || !street || !city || !state || !zipCode) {
      toast.error("Please fill in all center details");
      return;
    }
    const formData = {
      centerName,
      phoneNumber,
      address: {
        street,
        city,
        state,
        zipCode,
      },
    };
    try {
      const response = await registerCenter(formData);
      if (response.status === 201) {
        toast.success("Center registration successful!");
        setCenterId(response.data.centerId); // Save center ID for admin registration
        setStep(2); // Move to step 2
      } else {
        toast.error("Center registration failed");
      }
    } catch (error) {
      toast.error("Error during registration");
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !adminPhoneNumber ||
      !aadharCardNumber
    ) {
      toast.error("Please fill in all admin details");
      return;
    }
    const formData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber: adminPhoneNumber,
      aadharCardNumber,
    };
    try {
      const response = await registerAdmin(formData, centerId);
      if (response.status === 201) {
        toast.success("Admin registration successful!");
        navigate("/"); // Navigate to the dashboard after success
      } else {
        toast.error("Admin registration failed");
      }
    } catch (error) {
      toast.error("Error during registration");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div
              className={`flex-1 text-center ${
                step === 1 ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {step === 1 ? "●" : "✔"} Step 1: Register Center
            </div>
            <div
              className={`flex-1 text-center ${
                step === 2 ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {step === 2 ? "●" : step > 1 ? "✔" : "○"} Step 2: Register Admin
            </div>
          </div>

          {/* Step 1: Register Center Form */}
          {step === 1 && (
            <form onSubmit={handleCenterSubmit}>
              <h2 className="text-gray-700 text-xl font-bold mb-4">
                Register Center
              </h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Center Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Phone Number"
                  maxLength={10}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Street"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                    placeholder="City"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                    placeholder="State"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Register Admin Form */}
          {step === 2 && (
            <form onSubmit={handleAdminSubmit}>
              <h2 className="text-gray-700 text-xl font-bold mb-4">
                Add Admin
              </h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Last Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={adminPhoneNumber}
                  onChange={(e) => setAdminPhoneNumber(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Phone Number"
                  maxLength={10}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={aadharCardNumber}
                  onChange={(e) => setAadharCardNumber(e.target.value)}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  placeholder="Aadhar Card Number"
                  maxLength={12}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;
