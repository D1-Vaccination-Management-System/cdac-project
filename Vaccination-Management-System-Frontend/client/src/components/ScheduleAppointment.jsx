import React, { useState, useEffect } from "react";
import { getCenterByPincode } from "../service/patient";

function ScheduleAppointment() {
  const [pincode, setPincode] = useState("");
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [error, setError] = useState("");

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const filterCenters = async () => {
    if (pincode.length === 6) {
      try {
        const response = await getCenterByPincode(pincode);
        setCenters(response.data);
        setError("");
      } catch (err) {
        setCenters([]);
        setError("Failed to fetch centers. Please try again.");
      }
    } else {
      setCenters([]);
    }
  };

  const handleCenterChange = (event) => {
    const selectedCenterName = event.target.value;
    setSelectedCenter(selectedCenterName);

    // Dummy slot data, replace with actual data from API
    const slots = [
      {
        id: 1,
        centerName: selectedCenterName,
        date: "2024-08-15",
        startTime: "09:00",
        endTime: "10:00",
      },
      {
        id: 2,
        centerName: selectedCenterName,
        date: "2024-08-15",
        startTime: "10:00",
        endTime: "11:00",
      },
    ];

    const selectedSlots = slots.filter(
      (slot) => slot.centerName === selectedCenterName
    );
    setAvailableSlots(selectedSlots);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setAppointmentStatus("");
  };

  const handleScheduleAppointment = async () => {
    try {
      // Simulate API call
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        setAppointmentStatus("success");
      } else {
        setAppointmentStatus("failure");
      }
    } catch (err) {
      setAppointmentStatus("failure");
    }
  };

  useEffect(() => {
    filterCenters();
  }, [pincode]);

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-xl font-bold mb-4">Schedule Appointment</h3>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {/* Horizontal alignment for pincode and center selection */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-gray-700">Enter Pincode:</label>
            <input
              type="text"
              value={pincode}
              onChange={handlePincodeChange}
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="Enter your pincode"
            />
          </div>
          <div className="flex-1">
            {centers.length > 0 && (
              <>
                <label className="block mb-2 text-gray-700">
                  Select Center:
                </label>
                <select
                  value={selectedCenter}
                  onChange={handleCenterChange}
                  className="border border-gray-300 p-2 w-full rounded"
                >
                  <option value="">Select Center</option>
                  {centers.map((center, index) => (
                    <option key={index} value={center.centerName}>
                      {center.centerName}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>

        {availableSlots.length > 0 && (
          <div className="w-full mt-4">
            <h4 className="text-lg font-bold mb-2">Available Slots:</h4>
            <div className="flex flex-wrap gap-4">
              {availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`cursor-pointer p-2 rounded border ${
                    selectedSlot?.id === slot.id
                      ? "bg-blue-200 border-blue-500"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.date} - {slot.startTime} to {slot.endTime}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 w-full flex justify-center">
          {selectedSlot && (
            <button
              onClick={handleScheduleAppointment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Schedule
            </button>
          )}
        </div>
      </div>
      {error && <div className="text-red-500 font-bold mt-4">{error}</div>}
      {appointmentStatus === "success" && (
        <div className="text-green-500 font-bold mt-4">
          Appointment scheduled successfully!
        </div>
      )}
      {appointmentStatus === "failure" && (
        <div className="text-red-500 font-bold mt-4">
          Failed to schedule appointment.
        </div>
      )}
    </div>
  );
}

export default ScheduleAppointment;