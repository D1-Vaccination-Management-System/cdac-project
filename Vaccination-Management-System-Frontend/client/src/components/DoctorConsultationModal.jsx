import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorConsultationModal = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Clear form data when modal is closed
    if (!isOpen) {
      setPhoneNumber("");
      setFullName("");
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber === "" || fullName === "") {
      toast.error("Please fill out all fields!");
      return;
    }

    // Simulate successful form submission
    setIsSuccess(true);
  };

  const handleOk = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <ToastContainer />
      {isSuccess ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-xl font-bold mb-4">
            Query Registered Successfully
          </h2>
          <p className="mb-4">We will call you back shortly.</p>
          <button
            onClick={handleOk}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            OK
          </button>
        </div>
      ) : (
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-80"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-4">Consult a Doctor</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2 font-semibold text-left"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm mb-2 font-semibold text-left"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DoctorConsultationModal;
