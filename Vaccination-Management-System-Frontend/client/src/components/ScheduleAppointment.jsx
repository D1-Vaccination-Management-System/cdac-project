import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  getCenterByPincode,
  getAvailableSlots,
  scheduleAppointment,
  getAllSlots,
} from "../service/patient";

function ScheduleAppointment() {
  const [pincode, setPincode] = useState("");
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({ id: "", name: "" });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState(""); // New state for appointment type
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [dateOptions, setDateOptions] = useState([]);

  // Fetch all available slots (enum) on component mount
  useEffect(() => {
    async function fetchAllSlots() {
      try {
        const response = await getAllSlots();
        setAllSlots(response.data);
      } catch (err) {
        console.error("Error fetching all slots:", err);
      }
    }

    fetchAllSlots();
  }, []);

  // Generate the next 5 days
  useEffect(() => {
    const today = new Date();
    const futureDates = Array.from({ length: 5 }, (_, i) =>
      format(addDays(today, i), "yyyy-MM-dd")
    );
    setDateOptions(futureDates);
  }, []);

  // Fetch centers based on pincode
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

  // Fetch available slots for the selected center and date
  const handleCenterChange = async (event) => {
    const selectedCenterId = event.target.value;
    const selectedCenter = centers.find(
      (center) => center.centerId === selectedCenterId
    );

    if (selectedCenter) {
      setSelectedCenter({
        id: selectedCenterId,
        name: selectedCenter.centerName,
      });

      try {
        const date = format(new Date(selectedDate), "yyyy-MM-dd");
        const response = await getAvailableSlots(selectedCenterId, date);

        if (response.data.length === 0) {
          const enumSlots = await getAllSlots();
          setAvailableSlots(
            enumSlots.data.map((slot) => ({
              slot,
              date: selectedDate,
              capacity: 0,
            }))
          );
        } else {
          const filteredSlots = response.data
            .filter((slot) => allSlots.includes(slot.slot))
            .filter((slot) => slot.capacity <= 6);

          setAvailableSlots(filteredSlots);
        }

        setSelectedSlot(null);
        setError("");
      } catch (err) {
        setAvailableSlots([]);
        setError("Failed to fetch available slots. Please try again.");
      }
    }
  };

  // Handle slot selection
  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setAppointmentStatus("");
  };

  // Schedule the appointment
  const handleScheduleAppointment = async () => {
    if (!selectedSlot || !selectedCenter.id || !appointmentType) {
      setError("Please select a slot, center, and appointment type.");
      return;
    }

    const appointment = {
      centerId: selectedCenter.id,
      centerName: selectedCenter.name,
      date: selectedSlot.date,
      slot: selectedSlot.slot,
      appointmentType: appointmentType, // Include appointment type
    };

    try {
      await scheduleAppointment(appointment);
      setAppointmentStatus("success");
      setError("");
    } catch (err) {
      setAppointmentStatus("failure");
      setError("Failed to schedule appointment. Please try again.");
    }
  };

  // Handle appointment type change
  const handleAppointmentTypeChange = (event) => {
    setAppointmentType(event.target.value);
  };

  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Trigger fetch centers on pincode change
  useEffect(() => {
    filterCenters();
  }, [pincode]);

  // Trigger fetch available slots on date or center change
  useEffect(() => {
    if (selectedCenter.id && selectedDate) {
      handleCenterChange({ target: { value: selectedCenter.id } });
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-xl font-bold mb-4">Schedule Appointment</h3>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-4">
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
                    value={selectedCenter.id}
                    onChange={handleCenterChange}
                    className="border border-gray-300 p-2 w-full rounded"
                  >
                    <option value="">Select Center</option>
                    {centers.map((center) => (
                      <option key={center.centerId} value={center.centerId}>
                        {center.centerName}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-gray-700">Select Date:</label>
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 p-2 w-full rounded"
            >
              {dateOptions.map((date) => (
                <option key={date} value={date}>
                  {format(new Date(date), "MMM d, yyyy")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {availableSlots.length > 0 && (
          <div className="w-full mt-4">
            <h4 className="text-lg font-bold mb-2">Available Slots:</h4>
            <div className="flex flex-wrap gap-4">
              {availableSlots.map((slot) => (
                <div
                  key={slot.slotId}
                  className={`cursor-pointer p-2 rounded border ${
                    selectedSlot?.slotId === slot.slotId
                      ? "bg-blue-200 border-blue-500"
                      : "hover:bg-gray-200 border-gray-300"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  Slot: {slot.slot} (Capacity: {slot.capacity})
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSlot && (
          <div className="w-full mt-4">
            <h4 className="text-lg font-bold mb-2">Selected Slot:</h4>
            <p>
              Slot: {selectedSlot.slot} (Capacity: {selectedSlot.capacity})
            </p>

            <label className="block mb-2 text-gray-700">
              Appointment Type:
            </label>
            <select
              value={appointmentType}
              onChange={handleAppointmentTypeChange}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="">Select Appointment Type</option>
              <option value="CENTER_VISIT">Center Visit</option>
              <option value="HOME_VISIT">Home Visit</option>
            </select>

            <button
              onClick={handleScheduleAppointment}
              className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
            >
              Schedule Appointment
            </button>
          </div>
        )}

        {appointmentStatus === "success" && (
          <div className="w-full mt-4 text-green-500">
            Appointment successfully scheduled!
          </div>
        )}

        {appointmentStatus === "failure" && (
          <div className="w-full mt-4 text-red-500">
            Failed to schedule appointment.
          </div>
        )}

        {error && <div className="w-full mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
}

export default ScheduleAppointment;
