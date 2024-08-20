import React, { useState, useEffect } from "react";
import { updatePatientProfile } from "../service/patient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = ({ setSelectedComponent }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aadharCardNumber: "",
    phoneNumber: "",
  });

  const patientId = sessionStorage.getItem("patientId"); // Fetch patient ID from session storage

  useEffect(() => {
    // Fetch patient details from session storage
    const storedProfile = {
      firstName: sessionStorage.getItem("patientFirstName") || "",
      lastName: sessionStorage.getItem("patientLastName") || "",
      email: sessionStorage.getItem("patientEmail") || "",
      aadharCardNumber: sessionStorage.getItem("aadharNumber") || "",
      phoneNumber: sessionStorage.getItem("patientPhone") || "",
    };
    setProfile(storedProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = async () => {
    if (!patientId) {
      toast.error("Patient ID is missing.");
      return;
    }

    const formattedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      aadharCardNumber: profile.aadharCardNumber,
    };

    try {
      
      const response = await updatePatientProfile(
        patientId,
        formattedProfile,
        addressId
      );
      if (response) {
        // Update session storage with new data
        sessionStorage.setItem("patientFirstName", profile.firstName);
        sessionStorage.setItem("patientLastName", profile.lastName);
        sessionStorage.setItem("patientEmail", profile.email);
        sessionStorage.setItem("aadharNumber", profile.aadharCardNumber);
        sessionStorage.setItem("patientPhone", profile.phoneNumber);
        toast.success("Profile updated successfully!");
        setSelectedComponent(null);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="block text-center text-gray-700 text-xl font-bold mb-6">
            Update Profile
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4 text-center">
              First Name
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                placeholder="First Name"
              />
            </div>
            <div className="mb-4 text-center">
              Last Name
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                placeholder="Last Name"
              />
            </div>
            <div className="mb-4 text-center">
              Email
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                placeholder="Email"
              />
            </div>
            <div className="mb-4 text-center">
              Aadhar Number
              <input
                type="text"
                name="aadharCardNumber"
                value={profile.aadharCardNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                placeholder="Aadhar Card Number"
              />
            </div>
            <div className="mb-4 text-center">
              Phone Number
              <input
                type="text"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                placeholder="Phone Number"
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
