import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentHistoryTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
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
        // Fetching appointment history
        console.log("Patient ID :", patientId);
        const historyResponse = await axios.get(
          `${API_BASE_URL}/patient/get-patient-appointment-history`,
          {
            params: { patientId },
          }
        );
        setAppointments(historyResponse.data);

        // Fetching upcoming appointments
        const upcomingResponse = await axios.get(
          `${API_BASE_URL}/patient/get-patient-appointment-upcoming`,
          {
            params: { patientId },
          }
        );
        setUpcomingAppointments(upcomingResponse.data);
      } catch (error) {
        setError("No History Found");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p className="text-3xl font-semibold text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Appointment History
      </h1>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left border-b-2">Serial No</th>
              <th className="py-3 px-6 text-left border-b-2">
                Vaccination Center Name
              </th>
              <th className="py-3 px-6 text-left border-b-2">
                Center Address Street
              </th>
              <th className="py-3 px-6 text-left border-b-2">
                Center Address City
              </th>
              <th className="py-3 px-6 text-left border-b-2">
                Booked Appointment Date
              </th>
              <th className="py-3 px-6 text-left border-b-2">
                Created Appointment On
              </th>
              <th className="py-3 px-6 text-left border-b-2">Status</th>
              <th className="py-3 px-6 text-left border-b-2">
                Appointment Type
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.bookedAppointmentDate + index}
                className="hover:bg-gray-100"
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
                  {new Date(appointment.bookedAppointmentDate).toLocaleString()}
                </td>
                <td className="py-3 px-6 border-b">
                  {new Date(appointment.createdAppointmentOn).toLocaleString()}
                </td>
                <td
                  className={`py-3 px-6 border-b font-bold ${
                    appointment.appointmentStatus === "COMPLETED"
                      ? "text-green-500"
                      : appointment.appointmentStatus === "CANCELED"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {appointment.appointmentStatus}
                </td>
                <td className="py-3 px-6 border-b">
                  {appointment.appointmentType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentHistoryTable;
