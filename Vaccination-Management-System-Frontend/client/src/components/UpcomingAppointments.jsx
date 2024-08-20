import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = "http://localhost:9999";

  useEffect(() => {
    const fetchAppointments = async () => {
      const patientId = sessionStorage.getItem("patientId");

      if (!patientId) {
        setError("Patient ID not found in session storage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/patient/get-patient-appointment-upcoming`,
          {
            params: { patientId },
          }
        );
        console.log(response.data);
        setAppointments(response.data);
      } catch (error) {
        setError("No Upcoming Appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "text-gray-600";
      case "RESCHEDULED":
        return "text-orange-600";
      case "PENDING":
        return "text-yellow-600";
      default:
        return "text-black";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p className="text-3xl font-semibold text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upcoming Appointments
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left border-b-2">Serial No</th>
              <th className="py-3 px-6 text-left border-b-2">
                Vaccination Center
              </th>
              <th className="py-3 px-6 text-left border-b-2">
                Center Address Street
              </th>
              <th className="py-3 px-6 text-left border-b-2">
                Center Address City
              </th>
              <th className="py-3 px-6 text-left border-b-2">Date</th>
              <th className="py-3 px-6 text-left border-b-2">Time</th>
              <th className="py-3 px-6 text-left border-b-2">Type</th>
              <th className="py-3 px-6 text-left border-b-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.appointmentId}
                className="hover:bg-gray-100 capitalize"
              >
                <td className="py-3 px-6 border-b">{index + 1}</td>
                <td className="py-3 px-6 border-b">
                  {appointment.vaccinationCenter.centerName}
                </td>
                <td className="py-3 px-6 border-b">
                  {appointment.vaccinationCenter.address.street}
                </td>
                <td className="py-3 px-6 border-b">
                  {appointment.vaccinationCenter.address.city}
                </td>
                <td className="py-3 px-6 border-b">
                  {new Date(
                    appointment.bookedAppointmentDate
                  ).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 border-b">
                  {new Date(
                    appointment.bookedAppointmentDate
                  ).toLocaleTimeString()}
                </td>
                <td
                  className={`py-3 px-6 border-b font-semibold ${getStatusColor(
                    appointment.appointmentType
                  )}`}
                >
                  {appointment.appointmentType}
                </td>
                <td
                  className={`py-3 px-6 border-b font-bold ${getStatusColor(
                    appointment.appointmentStatus
                  )}`}
                >
                  {appointment.appointmentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
