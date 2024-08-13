import React, { useState, useEffect } from "react";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getAppointmentHistory();
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointment history.");
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Appointment History</h3>
      {error && <div className="text-red-500 font-bold mb-4">{error}</div>}
      {appointments.length > 0 ? (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="border border-gray-300 p-4 rounded-lg bg-white shadow-md"
            >
              <div>
                <span className="font-bold">Date:</span> {appointment.date}
              </div>
              <div>
                <span className="font-bold">Time:</span> {appointment.time}
              </div>
              <div>
                <span className="font-bold">Status:</span> {appointment.status}
              </div>
              <div className="mt-2">
                <span className="font-bold">Vaccination Center:</span>
                <div>{appointment.center.name}</div>
                <div>{appointment.center.address}</div>
                <div>{appointment.center.pincode}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No appointment history.</div>
      )}
    </div>
  );
}

export default AppointmentHistory;
