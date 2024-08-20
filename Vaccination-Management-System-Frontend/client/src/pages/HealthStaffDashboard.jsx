import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  assignVaccineToAppointment,
  assignVaccineToAppointmentDue,
  getAllAppointmentsByStaffId,
  updateStaffProfile,
} from "../service/healthstaff";

import VaccineDropdown from "../components/VaccineDropdown";

function HealthStaffDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home");

  const [staffFirstName, setFirstName] = useState("");
  const [staffLastName, setLastName] = useState("");
  const [staffEmail, setEmail] = useState("");
  const [staffPhone, setPhone] = useState("");
  const [staffPassword, setPassword] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const navigate = useNavigate();

  const storedStaffData = {
    staffId: sessionStorage.getItem("staffId"),
    staffEmail: sessionStorage.getItem("staffEmail"),
    staffPassword: sessionStorage.getItem("staffPassword"),
    staffFirstName: sessionStorage.getItem("staffFirstName"),
    staffLastName: sessionStorage.getItem("staffLastName"),
    staffPhone: sessionStorage.getItem("staffPhone"),
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointmentsByStaffId(storedStaffData.staffId);
      console.log(response.data);
      setAppointments(response.data);
      setFilteredAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
      toast.error("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();

    if (storedStaffData.staffEmail) {
      setFirstName(storedStaffData.staffFirstName);
      setLastName(storedStaffData.staffLastName);
      setEmail(storedStaffData.staffEmail);
      setPhone(storedStaffData.staffPhone);
      setPassword(storedStaffData.staffPassword);
    }
  }, [storedStaffData.staffId, storedStaffData.staffEmail]);

  const handleDue = async (appointmentId) => {
    try {
      const response = await assignVaccineToAppointmentDue(appointmentId, vaccineName);
      console.log(`Mark appointment ${appointmentId} as Due`, response.data);
      toast.warning("Appointment Due!");
    } catch (error) {
      console.error("Failed to mark appointment as Due:", error);
      toast.warning("Failed to mark as Due");
    }
    fetchAppointments();
  };

  const handleDone = async (appointmentId) => {
    try {
      const response = await assignVaccineToAppointment(appointmentId, vaccineName);
      console.log(`Mark appointment ${appointmentId} as Done`, response.data);
      toast.success("Appointment marked as Successful!");
    } catch (error) {
      console.error("Failed to mark appointment as Done:", error);
      toast.error("Failed to mark as Done");
    }
    fetchAppointments();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/health-staff/login");
    toast.success("Logged out successfully");
  };

  const handleUpdateProfile = async () => {
    try {
      const updateStaffData = {
        firstName: staffFirstName,
        lastName: staffLastName,
        email: staffEmail,
        password: staffPassword,
        phoneNumber: staffPhone,
      };
      await updateStaffProfile(storedStaffData.staffEmail, updateStaffData);

      setFirstName(staffFirstName);
      setLastName(staffLastName);
      setEmail(staffEmail);
      setPhone(staffPhone);
      setPassword(staffPassword);

      sessionStorage.setItem("staffFirstName", staffFirstName);
      sessionStorage.setItem("staffLastName", staffLastName);
      sessionStorage.setItem("staffEmail", staffEmail);
      sessionStorage.setItem("staffPhone", staffPhone);
      sessionStorage.setItem("staffPassword", staffPassword);

      setView("viewProfile");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update staff profile:", error);
      setError("Failed to update profile!");
      toast.error("Failed to update profile");
    }
  };

  // Filter appointments based on search criteria
  const filterAppointments = () => {
    const filtered = appointments.filter((appointment) => {
      const nameMatch = appointment.patientName.toLowerCase().includes(searchName.toLowerCase());
      const dateMatch = searchDate ? appointment.appointmentDate.includes(searchDate) : true;
      return nameMatch && dateMatch;
    });
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    filterAppointments();
  }, [searchName, searchDate, appointments]);

  return (
    <div className="container mx-auto p-4 flex">
      <aside className="w-64 bg-gray-800 text-white h-screen">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-6">Staff Dashboard</h1>
          <ul>
            <li>
              <button
                onClick={() => setView("home")}
                className="block p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("viewProfile")}
                className="block p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                View Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("updateProfile")}
                className="block p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                Update Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setView("vaccines")}
                className="block p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                Available Vaccines
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block p-2 hover:bg-gray-700 rounded w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Health Staff Dashboard</h1>
        <br />
        {view === "home" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Scheduled Appointments</h2>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Search by Name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter patient name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Search by Appointment Date</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Patient Name</th>
                    <th className="py-2 px-4 border-b">Patient Address</th>
                    <th className="py-2 px-4 border-b">Vaccination Center Name</th>
                    <th className="py-2 px-4 border-b">Vaccine List</th>
                    <th className="py-2 px-4 border-b">Appointment Date</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b">{appointment.patientName}</td>
                      <td className="py-2 px-4 border-b">
                        {`${appointment.patientStreet}, ${appointment.patientCity}, ${appointment.patientState} - ${appointment.patientZipCode}`}
                      </td>
                      <td className="py-2 px-4 border-b">{appointment.vaccineName}</td>
                      <td className="py-2 px-4 border-b">
                        <VaccineDropdown setVaccineName={setVaccineName} />
                      </td>
                      <td className="py-2 px-4 border-b">{appointment.appointmentDate}</td>
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
        )}

        {view === "viewProfile" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">View Profile</h3>
            <div>
              <p><strong className="text-gray-900">First Name:</strong> {staffFirstName}</p>
              <p><strong className="text-gray-900">Last Name:</strong> {staffLastName}</p>
              <p><strong className="text-gray-900">Email:</strong> {staffEmail}</p>
              <p><strong className="text-gray-900">Phone Number:</strong> {staffPhone}</p>
            </div>
          </div>
        )}

        {view === "updateProfile" && (
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">First Name</label>
                <input
                  type="text"
                  value={staffFirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Last Name</label>
                <input
                  type="text"
                  value={staffLastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={staffEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={staffPhone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  value={staffPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default HealthStaffDashboard;
