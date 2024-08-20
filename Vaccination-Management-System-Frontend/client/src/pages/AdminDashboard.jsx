import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVaccinationCenterDetails } from "../service/admin";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";

import {
  getHealthStaff,
  increaseAppointment,
  registerStaff,
} from "../service/healthstaff";
import { addVaccine } from "../service/vaccine";
import { getHomeVisitAppointment } from "../service/appointment";

const AdminDashboard = () => {
  const [vaccinationDetails, setVaccinationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home");
  const [adminData, setAdminData] = useState(null);
  const [StaffFirstName, setFirstName] = useState("");
  const [StaffLastName, setLastName] = useState("");
  const [StaffEmail, setEmail] = useState("");
  const [StaffPassword, setPassword] = useState("");
  const [StaffPhone, setPhoneNumber] = useState("");
  const [StaffAadhaarCard, setAadharCardNumber] = useState("");
  const [StaffDetails, setStaffDetails] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDescription, setVaccineDescription] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const navigate = useNavigate();

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

        setVaccinationDetails(response.data);
        console.log(vaccinationDetails?.vaccineDto);
      } catch (error) {
        setError("Failed to fetch vaccination details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    const fetchHealthStaff = async () => {
      try {
        const centerId = sessionStorage.getItem("vaccinationCenterId");
        const response = await getHealthStaff(centerId);
        console.log(response.data);
        setStaffDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch staff details.");
      }
    };

    fetchVaccinationDetails();
    fetchAppointments();
    if (view === "healthStaff" || view === "home") {
      fetchHealthStaff();
    }

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
  }, [view]);

  const fetchAppointments = async () => {
    if (view === "home") {
      try {
        const centerId = sessionStorage.getItem("vaccinationCenterId");
        const response = await getHomeVisitAppointment(centerId);
        setAppointments(response.data);
      } catch (error) {
        setError("Failed to fetch appointments.");
      }
    }
  };
  const handleAddVaccine = async () => {
    const centerId = sessionStorage.getItem("vaccinationCenterId");

    const vaccineData = {
      vaccineName,
      description: vaccineDescription,
      ageGroup,
      capacity: Number(capacity),
    };
    try {
      const response = await addVaccine(vaccineData, centerId);
      console.log(response.data);
      if (response.data === "Success") {
        toast.success("Vaccine added successfully!");
        setView("vaccines");
      }
    } catch (error) {
      toast.error("Failed to add vaccine.");
    }
  };

  const handleStaffChange = (appointmentId, staffId) => {
    console.log("StaffId", staffId);
    setSelectedStaff(staffId);
    setSelectedStaff((prevState) => ({
      ...prevState,
      [appointmentId]: staffId,
    }));
    console.log(selectedStaff);
  };

  const handleApprove = async (id) => {
    console.log("Appoinment ID", id);
    if (selectedStaff === null) {
      toast.error("Please select a staff member to approve the appointment.");
      return;
    }
    try {
      await increaseAppointment(selectedStaff[0], id);
      toast.success(
        "Appointment approved and staff's appointment count updated."
      );
      fetchAppointments();
      // Optionally: remove the appointment from the list or refresh the list
    } catch (error) {
      toast.error("Failed to approve appointment.");
    }
  };

  const handleStaffRegistration = async () => {
    const staffData = {
      firstName: StaffFirstName,
      lastName: StaffLastName,
      email: StaffEmail,
      password: StaffPassword,
      phoneNumber: StaffPhone,
      aadharCardNumber: StaffAadhaarCard,
      centerId: sessionStorage.getItem("vaccinationCenterId"),
    };
    try {
      const response = await registerStaff(staffData);
      if (response.status === 200) {
        toast.success("Registered Successfully");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setAadharCardNumber("");
        setView("home");
      } else {
        toast.error("Registration Failed");
      }
    } catch (error) {
      toast.error("Error during registration.");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen bg-gray-100 ">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white ">
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
                  onClick={() => setView("healthStaffRegister")}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Register Health Staff
                </a>
              </li>
              <li>
                <a
                  onClick={() => setView("healthStaff")}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Health Staff Details
                </a>
              </li>
              <li>
                <a
                  onClick={() => setView("addVaccine")}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Add Vaccine
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
        <main className="flex-1 p-6 overflow-y-auto">
          {view === "home" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {vaccinationDetails?.vaccinationCenterDto.centerName ||
                  "Vaccination Center Name"}
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Approval Request</h3>
                {appointments.length > 0 ? (
                  <ul>
                    {appointments.map((appointment) => (
                      <li
                        key={appointment.appointmentId}
                        className="mb-4 p-4 border rounded-lg flex items-center justify-between"
                      >
                        {/* Patient Details */}
                        <div className="flex-1 text-start">
                          <p className="font-semibold text-lg mb-1">
                            Patient Name: {appointment.patient.firstName}{" "}
                            {appointment.patient.lastName}
                          </p>
                          <p>
                            Date:{" "}
                            {format(
                              new Date(appointment.bookedAppointmentDate),
                              "MMMM d, yyyy"
                            )}
                          </p>
                          <p>
                            Time:{" "}
                            {format(
                              new Date(appointment.createdAppointmentOn),
                              "h:mm a"
                            )}
                          </p>
                        </div>

                        {/* Dropdown and Buttons */}
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col mr-4">
                            <label className="font-semibold mb-1">
                              Select Staff:
                            </label>
                            <select
                              value={
                                selectedStaff[appointment.appointmentId] || ""
                              }
                              onChange={(e) =>
                                handleStaffChange(
                                  appointment.appointmentId,
                                  e.target.value
                                )
                              }
                              className="p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 capitalize"
                            >
                              <option value="">Select Staff</option>
                              {StaffDetails.map((staff) => (
                                <option key={staff.id} value={staff.userId}>
                                  {staff.firstName} {staff.lastName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={() =>
                              handleApprove(appointment.appointmentId)
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 mt-7"
                          >
                            Approve
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No approval requests available.</p>
                )}
              </div>
            </>
          )}

          {view === "healthStaff" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Details of All Health Staff
              </h3>
              {StaffDetails.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-300 capitalize">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">
                        First Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Last Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Email
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Password
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Phone Number
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Aadhaar Card Number
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        No. of Appointments
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {StaffDetails.map((staff, index) => (
                      <tr key={index} className="border-t">
                        <td className="border border-gray-300 px-4 py-2">
                          {staff.firstName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {staff.lastName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 lowercase">
                          {staff.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {staff.password}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {staff.phoneNumber || "N/A"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {staff.aadharCardNumber}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {staff.noOfAppointments}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No health staff found.</p>
              )}
            </div>
          )}

          {view === "viewProfile" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Admin Profile
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto capitalize">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      First Name:
                    </span>
                    <p className="text-gray-600">{adminData.adminFirstName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Last Name:
                    </span>
                    <p className="text-gray-600">{adminData.adminLastName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32 ">
                      Email:
                    </span>
                    <p className="text-gray-600 lowercase">
                      {adminData.adminEmail}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Phone:
                    </span>
                    <p className="text-gray-600">{adminData.adminPhone}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {view === "addVaccine" && (
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">
                Add Vaccine
              </h3>
              <form className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700 mb-2">
                    Vaccine Name
                  </label>
                  <input
                    type="text"
                    name="vaccineName"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setVaccineName(e.target.value)}
                    placeholder="Enter Vaccine Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setVaccineDescription(e.target.value)}
                    placeholder="Enter Vaccine Description"
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700 mb-2">
                    Age Group
                  </label>
                  <input
                    type="text"
                    name="ageGroup"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setAgeGroup(e.target.value)}
                    placeholder="Enter Age Group"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-semibold text-gray-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Enter Capacity"
                  />
                </div>
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  onClick={handleAddVaccine}
                >
                  Add Vaccine
                </button>
              </form>
            </div>
          )}

          {view === "vaccines" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Available Vaccines
              </h2>
              <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg capitalize ">
                {vaccinationDetails?.vaccineDto?.length > 0 ? (
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                      <tr>
                        <th className="px-6 py-4 text-center text-lg font-semibold uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-semibold uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-semibold uppercase tracking-wider">
                          Age Group
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-semibold uppercase tracking-wider">
                          Capacity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {vaccinationDetails.vaccineDto.map((vaccine, index) => (
                        <tr
                          key={vaccine.id}
                          className={`hover:bg-blue-50 ${
                            index % 2 === 0 ? "bg-gray-50" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-center text-md text-gray-900">
                            {vaccine.vaccineName}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-normal text-md text-gray-700 lowercase">
                            {vaccine.description}
                          </td>
                          <td className="px-6 py-4 text-center text-md text-gray-700">
                            {vaccine.ageGroup}
                          </td>
                          <td className="px-6 py-4 text-center text-md text-gray-700">
                            {vaccine.capacity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-gray-500">
                    No vaccines available.
                  </p>
                )}
              </div>
            </>
          )}

          {view === "healthStaffRegister" && (
            <>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Register Health Staff
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={StaffFirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={StaffLastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Last Name"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={StaffEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={StaffPassword}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={StaffPhone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={10}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-2">
                      Aadhar Card Number
                    </label>
                    <input
                      type="text"
                      value={StaffAadhaarCard}
                      onChange={(e) => setAadharCardNumber(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={12}
                      placeholder="Enter Aadhar Card Number"
                    />
                  </div>
                  <button
                    onClick={handleStaffRegistration}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    Register
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
