import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateAdminProfile } from "../service/admin"; // Import the admin service
import { getVaccinationCenterDetails } from "../service/admin"; // Import the vaccination center service

const AdminDashboard = () => {
  const [vaccinationDetails, setVaccinationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home"); // Control what to display in the main area
  const [adminData, setAdminData] = useState(null); // Admin data for profile view and update
  const navigate = useNavigate();

  const appointments = [
    { id: 1, patientName: "John Doe", date: "2024-08-14", time: "10:00 AM" },
    { id: 2, patientName: "Jane Smith", date: "2024-08-14", time: "11:00 AM" },
  ];

  useEffect(() => {
    const fetchVaccinationDetails = async () => {
      const centerId = sessionStorage.getItem("vaccinationCenterId");

      if (!centerId) {
        setError("No centerId found in session storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await getVaccinationCenterDetails(centerId);
        response.data.vaccinationCenterDto.centerName =
          response.data.vaccinationCenterDto.centerName.toUpperCase();
        console.log(response.data);
        setVaccinationDetails(response.data);
      } catch (error) {
        setError("Failed to fetch vaccination details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinationDetails();

    const storedAdminData = {
      vaccinationCenterId: sessionStorage.getItem("vaccinationCenterId"),
      adminPhone: sessionStorage.getItem("adminPhone"),
      adminFirstName: sessionStorage.getItem("adminFirstName"),
      adminEmail: sessionStorage.getItem("adminEmail"),
      adminLastName: sessionStorage.getItem("adminLastName"),
      adminPassword: sessionStorage.getItem("adminPassword"),
    };

    if (storedAdminData.adminEmail) {
      setAdminData(storedAdminData);
    }
  }, []);

  const handleApprove = (id) => {
    console.log(`Approved appointment with ID: ${id}`);
    // Add logic to handle approval
  };

  const handleRevoke = (id) => {
    console.log(`Revoked appointment with ID: ${id}`);
    // Add logic to handle revocation
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const result = await updateAdminProfile(updatedData);
      setAdminData(result);
      sessionStorage.setItem("adminData", JSON.stringify(result));
      setView("viewProfile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
          <ul>
            <li>
              <a
                onClick={() => setView("home")}
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => setView("viewProfile")}
                className="block p-2 hover:bg-gray-700 rounded"
              >
                View Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => setView("updateProfile")}
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Update Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => setView("vaccines")}
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Available Vaccines
              </a>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Screen */}
      <main className="flex-1 p-6">
        {view === "home" && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {vaccinationDetails?.vaccinationCenterDto.centerName ||
                "Vaccination Center Name"}
            </h2>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Approval Request</h3>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      className="mb-4 p-4 border rounded"
                    >
                      <p className="font-semibold">
                        Patient Name: {appointment.patientName}
                      </p>
                      <p>Date: {appointment.date}</p>
                      <p>Time: {appointment.time}</p>
                      <div className="mt-2 flex space-x-4">
                        <button
                          onClick={() => handleApprove(appointment.id)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRevoke(appointment.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Revoke
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No appointment requests pending.</p>
              )}
            </div>
          </>
        )}

        {view === "viewProfile" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              View Profile
            </h3>
            {adminData ? (
              <div>
                <p>
                  <strong className="text-gray-900">First Name:</strong>{" "}
                  {adminData.adminFirstName}
                </p>
                <p>
                  <strong className="text-gray-900">Last Name:</strong>{" "}
                  {adminData.adminLastName}
                </p>
                <p>
                  <strong className="text-gray-900">Email:</strong>{" "}
                  {adminData.adminEmail}
                </p>
                <p>
                  <strong className="text-gray-900">Phone Number:</strong>{" "}
                  {adminData.adminPhone}
                </p>
              </div>
            ) : (
              <p>No admin data found.</p>
            )}
          </div>
        )}

        {view === "updateProfile" && (
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            {adminData ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedData = {
                    adminFirstName: e.target.adminFirstName.value,
                    adminLastName: e.target.adminLastName.value,
                    adminEmail: e.target.adminEmail.value,
                    adminPhone: e.target.adminPhone.value,
                    adminPassword: e.target.adminPassword.value,
                  };
                  handleUpdateProfile(updatedData);
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">First Name</label>
                  <input
                    type="text"
                    name="adminFirstName"
                    defaultValue={adminData.adminFirstName}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="adminLastName"
                    defaultValue={adminData.adminLastName}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    name="adminEmail"
                    defaultValue={adminData.adminEmail}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="adminPhone"
                    defaultValue={adminData.adminPhone}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Password</label>
                  <input
                    type="password"
                    name="adminPassword"
                    defaultValue={adminData.adminPassword}
                    className="input input-bordered w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Update Profile
                </button>
              </form>
            ) : (
              <p>No admin data available to update.</p>
            )}
          </div>
        )}

        {view === "vaccines" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Available Vaccines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaccinationDetails?.vaccineDto.map((vaccine, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-sm"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Vaccine Name: {vaccine.vaccineName}
                  </h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {vaccine.description}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Age Group:</strong> {vaccine.ageGroup}
                  </p>
                  <p className="text-gray-700">
                    <strong>Capacity:</strong> {vaccine.capacity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
