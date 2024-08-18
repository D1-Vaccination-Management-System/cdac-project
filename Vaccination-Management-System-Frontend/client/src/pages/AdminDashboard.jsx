import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVaccinationCenterDetails } from "../service/admin";
import { toast, ToastContainer } from "react-toastify";
import { getHealthStaff, registerStaff } from "../service/healthstaff";
import { addVaccine } from "../service/vaccine";
import { getHomeVisitAppointment } from "../service/appointment";
import { addAppointment } from "../service/healthstaff"; // Import the new API function

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
      } catch (error) {
        setError("Failed to fetch vaccination details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointments = async () => {
      if (view === "home") {
        try {
          const response = await getHomeVisitAppointment();
          setAppointments(response.data);
        } catch (error) {
          setError("Failed to fetch appointments.");
        }
      }
    };

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
    setSelectedStaff(staffId);
    // setSelectedStaff((prevState) => ({
    //   ...prevState,
    //   [appointmentId]: staffId,
    // }));
  };

  const handleApprove = async (id) => {
    console.log(id);
    if (selectedStaff === null) {
      toast.error("Please select a staff member to approve the appointment.");
      return;
    }

    try {
      await addAppointment(selectedStaff);
      toast.success(
        "Appointment approved and staff's appointment count updated."
      );
      // Optionally: remove the appointment from the list or refresh the list
    } catch (error) {
      toast.error("Failed to approve appointment.");
    }
  };

  const handleRevoke = async (id) => {
    console.log(`Revoked appointment with ID: ${id}`);
    // Add logic to handle revocation
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
      if (response.status === 201) {
        toast.success("Registered Successfully");
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
                  onClick={() => setView("healthStaff")}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Health Staff Details
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
                  onClick={() => setView("addVaccine")}
                  className="block p-2 hover:bg-gray-700 rounded"
                >
                  Add Vaccine
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
              <div className="bg-white p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-2">Approval Request</h3>
                {appointments.length > 0 ? (
                  <ul>
                    {appointments.map((appointment) => (
                      <li
                        key={appointment.appointmentId}
                        className="mb-4 p-4 border rounded"
                      >
                        <p className="font-semibold">
                          Patient Name: {appointment.patient.firstName}{" "}
                          {appointment.patient.lastName}
                        </p>
                        <p>
                          Date:{" "}
                          {new Date(
                            appointment.bookedAppointmentDate
                          ).toLocaleDateString()}
                        </p>
                        <p>
                          Time:{" "}
                          {new Date(
                            appointment.bookedAppointmentDate
                          ).toLocaleTimeString()}
                        </p>
                        <div className="mt-2">
                          <label className="font-semibold">Select Staff:</label>
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
                            className="ml-2 p-2 border rounded"
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
                          className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleRevoke(appointment.appointmentId)
                          }
                          className="bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2 hover:bg-red-700"
                        >
                          Revoke
                        </button>
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
                <table className="min-w-full table-auto border-collapse border border-gray-300">
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
                        <td className="border border-gray-300 px-4 py-2">
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
              <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
              <div className="bg-white p-4 rounded shadow-md">
                <p>First Name: {adminData.adminFirstName}</p>
                <p>Last Name: {adminData.adminLastName}</p>
                <p>Email: {adminData.adminEmail}</p>
                <p>Phone: {adminData.adminPhone}</p>
              </div>
            </>
          )}

          {view === "addVaccine" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Add Vaccine
              </h3>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Vaccine Name</label>
                <input
                  type="text"
                  name="vaccineName"
                  className="input input-bordered w-full"
                  onChange={(e) => setVaccineName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Description</label>
                <textarea
                  name="description"
                  className="input input-bordered w-full"
                  onChange={(e) => setVaccineDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Age Group</label>
                <input
                  type="text"
                  name="ageGroup"
                  className="input input-bordered w-full"
                  onChange={(e) => setAgeGroup(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  className="input input-bordered w-full"
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleAddVaccine}
              >
                Add Vaccine
              </button>
            </div>
          )}

          {view === "vaccines" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Available Vaccines</h2>
              <div className="bg-white p-4 rounded shadow-md">
                {vaccinationDetails?.vaccines?.length > 0 ? (
                  <ul>
                    {vaccinationDetails.vaccines.map((vaccine) => (
                      <li key={vaccine.id} className="mb-4 p-4 border rounded">
                        <p>
                          <strong>Name:</strong> {vaccine.vaccineName}
                        </p>
                        <p>
                          <strong>Description:</strong> {vaccine.description}
                        </p>
                        <p>
                          <strong>Age Group:</strong> {vaccine.ageGroup}
                        </p>
                        <p>
                          <strong>Capacity:</strong> {vaccine.capacity}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No vaccines available.</p>
                )}
              </div>
            </>
          )}

          {view === "healthStaffRegister" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Register Health Staff</h2>
              <div className="bg-white p-4 rounded shadow-md">
                <div className="mb-4">
                  <label className="block font-semibold">First Name</label>
                  <input
                    type="text"
                    value={StaffFirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Last Name</label>
                  <input
                    type="text"
                    value={StaffLastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Email</label>
                  <input
                    type="email"
                    value={StaffEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Password</label>
                  <input
                    type="password"
                    value={StaffPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">Phone Number</label>
                  <input
                    type="text"
                    value={StaffPhone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 border rounded"
                    maxLength={10}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold">
                    Aadhar Card Number
                  </label>
                  <input
                    type="text"
                    value={StaffAadhaarCard}
                    onChange={(e) => setAadharCardNumber(e.target.value)}
                    className="w-full p-2 border rounded"
                    maxLength={12}
                  />
                </div>
                <button
                  onClick={handleStaffRegistration}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </>
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
    </>
  );
};

export default AdminDashboard;
