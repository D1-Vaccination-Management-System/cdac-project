import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  assignVaccineToAppointment,
  assignVaccineToAppointmentDue,
  getAllAppointmentsByStaffId,
  updateStaffProfile,
  getCenterVisitAppointments,
} from "../service/healthstaff";

import VaccineDropdown from "../components/VaccineDropdown";

function HealthStaffDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home");
  const [centerAppointments, setCenterAppointments] = useState([]); // New state for center appointments

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

  const fetchCenterVisitAppointments = async () => {
    try {
      const centerId = sessionStorage.getItem("centerId");
      const response = await getCenterVisitAppointments(centerId); // Fetch center visit appointments
      console.log(response);
      setCenterAppointments(response.data);
    } catch (error) {
      console.error("Error fetching center visit appointments:", error);
      toast.error("Failed to load center visit appointments");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointmentsByStaffId(
        storedStaffData.staffId
      );
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
    fetchCenterVisitAppointments();
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
      const response = await assignVaccineToAppointmentDue(
        appointmentId,
        vaccineName
      );
      console.log(`Mark appointment ${appointmentId} as Due`, response.data);
      toast.warning("Appointment Due!");
    } catch (error) {
      console.error("Failed to mark appointment as Due:", error);
      toast.warning("Failed to mark as Due");
    }
    fetchAppointments();
    fetchCenterVisitAppointments();
  };

  const handleDone = async (appointmentId) => {
    try {
      const response = await assignVaccineToAppointment(
        appointmentId,
        vaccineName
      );
      console.log(`Mark appointment ${appointmentId} as Done`, response.data);
      toast.success("Appointment marked as Successful!");
    } catch (error) {
      console.error("Failed to mark appointment as Done:", error);
      toast.error("Failed to mark as Done");
    }
    fetchAppointments();
    fetchCenterVisitAppointments();
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
      const nameMatch = appointment.patientName
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const dateMatch = searchDate
        ? appointment.appointmentDate.includes(searchDate)
        : true;
      return nameMatch && dateMatch;
    });
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    filterAppointments();
  }, [searchName, searchDate, appointments]);

  return (
    <>
      <ToastContainer />
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
                  onClick={() => setView("centerVisit")}
                  className="block p-2 hover:bg-gray-700 rounded w-full text-left"
                >
                  Center Visit Appointments
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
            <div className="p-6 bg-gray-50 min-h-screen">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Your Scheduled Appointments
              </h2>

              <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
                <div className="mb-4 md:mb-0 flex-1">
                  <label className="block text-gray-700 font-medium mb-2">
                    Search by Name
                  </label>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2">
                    Search by Appointment Date
                  </label>
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {loading ? (
                <p className="text-center text-gray-600 text-lg">Loading...</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg divide-y divide-gray-200 text-center">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center">
                      <tr>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Patient Name
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Patient Address
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Vaccination Center Name
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Vaccine List
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Appointment Date
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Appointment Time
                        </th>
                        <th className="py-3 px-6 text-left text-sm font-medium uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-blue-50 ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {appointment.patientName}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600 capitalize">
                            {`${appointment.patientStreet}, ${appointment.patientCity}, ${appointment.patientState} - ${appointment.patientZipCode}`}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {appointment.vaccineName}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            <VaccineDropdown setVaccineName={setVaccineName} />
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleTimeString()}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleDue(appointment.appointmentId)
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                              >
                                Due
                              </button>
                              <button
                                onClick={() =>
                                  handleDone(appointment.appointmentId)
                                }
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                              >
                                Done
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {view === "centerVisit" && (
            <div className="p-6 bg-gray-50 min-h-screen">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Center Visit Appointments
              </h2>

              {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Patient Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Patient Address
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Patient Phone Number
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Vaccine List
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Appointment Date
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Appointment Time
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {centerAppointments.map((appointment, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-blue-50 ${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          }`}
                        >
                          <td className="py-3 px-4 text-sm text-gray-900 capitalize">
                            {appointment.patient.firstName}{" "}
                            {appointment.patient.lastName}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {`${appointment.patient.address.street}, ${appointment.patient.address.city} - ${appointment.patient.address.state}`}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {appointment.patient.phoneNumber}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            <VaccineDropdown setVaccineName={setVaccineName} />
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {new Date(
                              appointment.bookedAppointmentDate
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">
                            {new Date(
                              appointment.bookedAppointmentDate
                            ).toLocaleTimeString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700 flex space-x-2">
                            <button
                              onClick={() =>
                                handleDue(appointment.appointmentId)
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow-md transition ease-in-out duration-150"
                            >
                              Due
                            </button>
                            <button
                              onClick={() =>
                                handleDone(appointment.appointmentId)
                              }
                              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-md transition ease-in-out duration-150"
                            >
                              Done
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {view === "viewProfile" && (
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto border border-gray-200 capitalize">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">
                View Profile
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">
                    First Name:
                  </span>
                  <span className="text-lg text-gray-900">
                    {staffFirstName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">
                    Last Name:
                  </span>
                  <span className="text-lg text-gray-900 ">
                    {staffLastName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">
                    Email:
                  </span>
                  <span className="text-lg text-gray-900 lowercase">
                    {staffEmail}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-700">
                    Phone Number:
                  </span>
                  <span className="text-lg text-gray-900">{staffPhone}</span>
                </div>
              </div>
            </div>
          )}

          {view === "updateProfile" && (
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">
                Update Profile
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateProfile();
                }}
                className="space-y-4"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={staffFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={staffLastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={staffEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={staffPhone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={staffPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update Profile
                </button>
                {error && (
                  <p className="text-red-500 mt-4 text-center">{error}</p>
                )}
              </form>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default HealthStaffDashboard;
