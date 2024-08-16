import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVaccinationCenterDetails } from "../service/admin";
import { toast } from "react-toastify";
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
  const [selectedStaff, setSelectedStaff] = useState(null);
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
    if (view === "healthStaff" || view == "home") {
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
      if (response.status === 201) {
        toast.success("Vaccine added successfully!");
        setView("vaccines");
      }
    } catch (error) {
      toast.error("Failed to add vaccine.");
    }
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
                        <label className="mr-2" htmlFor="staff-select">
                          Assign Staff:
                        </label>
                        <select
                          id="staff-select"
                          value={selectedStaff || ""}
                          onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                          <option value="">Select a staff member</option>
                          {StaffDetails.map((staff) => (
                            <option key={staff.id} value={staff.id}>
                              {staff.firstName} {staff.lastName}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleApprove(selectedStaff.userId)}
                          className="ml-4 bg-blue-500 text-white p-2 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleRevoke(appointment.appointmentId)
                          }
                          className="ml-2 bg-red-500 text-white p-2 rounded"
                        >
                          Revoke
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No appointments available.</p>
              )}
            </div>
          </>
        )}
        {view === "healthStaff" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Health Staff Details</h2>
            {StaffDetails.length > 0 ? (
              <ul>
                {StaffDetails.map((staff) => (
                  <li key={staff.id} className="mb-4 p-4 border rounded">
                    <p className="font-semibold">
                      {staff.firstName} {staff.lastName}
                    </p>
                    <p>Email: {staff.email}</p>
                    <p>Phone: {staff.phoneNumber}</p>
                    <p>Aadhaar Card: {staff.aadharCardNumber}</p>
                    <p>Appointments: {staff.appointmentCount}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No staff details available.</p>
            )}
          </>
        )}
        {view === "healthStaffRegister" && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register Health Staff</h2>
            <div className="mb-4">
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                value={StaffFirstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                value={StaffLastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={StaffEmail}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                value={StaffPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                value={StaffPhone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Aadhaar Card Number</label>
              <input
                type="text"
                value={StaffAadhaarCard}
                onChange={(e) => setAadharCardNumber(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <button
              onClick={handleStaffRegistration}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Register Staff
            </button>
          </div>
        )}
        {view === "addVaccine" && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Vaccine</h2>
            <div className="mb-4">
              <label className="block mb-2">Vaccine Name</label>
              <input
                type="text"
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                value={vaccineDescription}
                onChange={(e) => setVaccineDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Age Group</label>
              <input
                type="text"
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
            <button
              onClick={handleAddVaccine}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Vaccine
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
