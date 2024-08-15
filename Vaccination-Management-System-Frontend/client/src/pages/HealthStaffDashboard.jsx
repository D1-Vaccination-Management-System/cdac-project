import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { healthStaffAppointments } from "../service/healthstaff";

function HealthStaffDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const staffId = sessionStorage.getItem("staffId");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch staff data along with appointments
    const fetchAppointments = async () => {
      try {
        const response = await healthStaffAppointments(staffId);
        setAppointments(response.data.listOfAppointments); // Adjust according to your API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Function to handle "Due" button click
  const handleDue = (appointmentId) => {
    // Update status logic here
    console.log(`Mark appointment ${appointmentId} as Due`);
  };

  // Function to handle "Done" button click
  const handleDone = (appointmentId) => {
    // Update status logic here
    console.log(`Mark appointment ${appointmentId} as Done`);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Navigate to login page
    navigate("/health-staff/login");
  };

  return (
    <div className="container mx-auto p-4 flex">
      {" "}
      {/* Added flex class for horizontal layout */}
      {/* Sidebar */}
      <aside></aside>
      <aside className="w-64 bg-gray-800 text-white h-screen">
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
      <div className="flex-1">
        {" "}
        {/* This div takes the remaining space */}
        <h1 className="text-3xl font-bold mb-4">Health Staff Dashboard</h1>
        <br />
        <h2 className="text-2xl font-bold mb-4">Your Scheduled Appointments</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Appointment ID</th>
                <th className="py-2 px-4 border-b">Patient ID</th>
                <th className="py-2 px-4 border-b">Vaccination Center ID</th>
                <th className="py-2 px-4 border-b">Appointment Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td className="py-2 px-4 border-b">
                    {appointment.appointmentId}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {appointment.patientId}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {appointment.vaccination_center_id}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {appointment.bookedAppointmentDate}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDue(appointment.appointmentId)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2"
                    >
                      Due
                    </button>
                    <button
                      onClick={() => handleDone(appointment.appointmentId)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default HealthStaffDashboard;
