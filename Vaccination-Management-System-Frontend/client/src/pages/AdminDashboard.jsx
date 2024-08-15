import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVaccinationCenterDetails } from "../service/admin"; // Import the vaccination center service
import { toast } from "react-toastify";
import { getHealthStaff, registerStaff } from "../service/healthstaff";
import { addVaccine } from "../service/vaccine";

const AdminDashboard = () => {
  const [vaccinationDetails, setVaccinationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home"); // Control what to display in the main area
  const [adminData, setAdminData] = useState(null); // Admin data for profile view and update
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
    if (view === "healthStaff") {
      handleStaffDetails();
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
    const response = await addVaccine(vaccineData, centerId);
    if (response.status === 201) {
      toast.success("Vaccine added successfully!");
      setView("vaccines"); // Redirect to the vaccine list view after successful addition
    }
  };
  const handleApprove = (id) => {
    console.log(`Approved appointment with ID: ${id}`);
    // Add logic to handle approval
  };

  const handleRevoke = (id) => {
    console.log(`Revoked appointment with ID: ${id}`);
    // Add logic to handle revocation
  };

  const handleStaffDetails = async () => {
    const centerId = sessionStorage.getItem("vaccinationCenterId");
    const response = await getHealthStaff(centerId);
    console.log(response.data);
    setStaffDetails(response.data);
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
    const response = await registerStaff(staffData);
    if (response.status === 201) {
      toast.success("Registrated Successfully");
      setView("home");
    } else toast.error("Registration Failed");
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

        {view === "healthStaffRegister" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Register HealthStaff
            </h3>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">First Name</label>
              <input
                type="text"
                name="StaffFirstName"
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Last Name</label>
              <input
                type="text"
                name="StaffLastName"
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="StaffEmail"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Phone Number</label>
              <input
                type="text"
                name="StaffPhone"
                className="input input-bordered w-full"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                name="StaffPassword"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Aadhaar Card Number
              </label>
              <input
                type="text"
                name="StaffAadhaarCard"
                className="input input-bordered w-full"
                onChange={(e) => setAadharCardNumber(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleStaffRegistration}
            >
              Register
            </button>
          </div>
        )}

        {/* Main Content Area */}
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
                    <th className="border border-gray-300 px-4 py-2">Email</th>
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
