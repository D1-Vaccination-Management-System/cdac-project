import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect } from "react";
import { updatePatientAddress } from "../service/patient";

const UpdateAddress = ({ setSelectedComponent }) => {
    const [address, setAddress] = useState({
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
  
    const patientId = sessionStorage.getItem("patientId"); // Fetch patient ID from session storage
  
    useEffect(() => {
      // Fetch address details from session storage
      const storedAddress = {
        street: sessionStorage.getItem("street") || "",
        city: sessionStorage.getItem("city") || "",
        state: sessionStorage.getItem("state") || "",
        zipCode: sessionStorage.getItem("zipCode") || "",
      };
      setAddress(storedAddress);
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddress({ ...address, [name]: value });
    };
  
    const handleUpdate = async () => {
      if (!patientId) {
        toast.error("Patient ID is missing.");
        return;
      }
  
      const formattedAddress = {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      };
  
      try {
        const response = await updatePatientAddress(patientId, formattedAddress);
        if (response) {
          // Update session storage with new data
          sessionStorage.setItem("street", address.street);
          sessionStorage.setItem("city", address.city);
          sessionStorage.setItem("state", address.state);
          sessionStorage.setItem("zipCode", address.zipCode);
          toast.success("Address updated successfully!");
          setSelectedComponent(null);
        } else {
          toast.error("Failed to update address.");
        }
      } catch (error) {
        toast.error("An error occurred while updating address.");
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-center text-gray-700 text-xl font-bold mb-6">
              Update Address
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4 text-center">
                Street
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                  placeholder="Street"
                />
              </div>
              <div className="mb-4 text-center">
                City
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                  placeholder="City"
                />
              </div>
              <div className="mb-4 text-center">
                State
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                  placeholder="State"
                />
              </div>
              <div className="mb-4 text-center">
                Zip Code
                <input
                  type="text"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto block"
                  placeholder="Zip Code"
                />
              </div>
  
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update Address
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default UpdateAddress;