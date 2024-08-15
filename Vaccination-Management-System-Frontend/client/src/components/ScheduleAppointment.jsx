import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  getCenterByPincode,
  getAvailableSlots,
  scheduleAppointment,
  getAllSlots,
  updateSlotCapacity,
  addNewSlot,
} from "../service/patient";

function ScheduleAppointment() {
  const [pincode, setPincode] = useState("");
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({ id: "", name: "" });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [allSlots, setAllSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [dateOptions, setDateOptions] = useState([]);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const storedPatientId = sessionStorage.getItem("patientId");
    if (storedPatientId) {
      setPatientId(parseInt(storedPatientId, 10));
    }
  }, []);

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

  useEffect(() => {
    const today = new Date();
    const futureDates = Array.from({ length: 5 }, (_, i) =>
      format(addDays(today, i), "yyyy-MM-dd")
    );
    setDateOptions(futureDates);
  }, []);

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

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setAppointmentStatus("");
  };

  const handleScheduleAppointment = async () => {
    if (!selectedSlot || !selectedCenter.id || !appointmentType || !patientId) {
      setError("Please select a slot, center, appointment type, and patient.");
      return;
    }

    const appointment = {
      patientId,
      vaccination_center_id: parseInt(selectedCenter.id, 10),
      bookedAppointmentDate: new Date().toISOString(),
      appointmentType,
      appointmentStatus: "SCHEDULED",
    };

    try {
      await scheduleAppointment(appointment);
      setAppointmentStatus("success");
      updateCapacity();
      addSlot();
      setError("");
    } catch (err) {
      setAppointmentStatus("failure");
      setError("Failed to schedule appointment. Please try again.");
    }
  };

  const handleAppointmentTypeChange = (event) => {
    setAppointmentType(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const addSlot = async (slot) => {
    try {
      await addNewSlot(selectedCenter.id, slot);
      // Option 1: Refetch all slots
      const response = await getAllSlots();
      setAllSlots(response.data);
      // Option 2: Update availableSlots state directly
      setAvailableSlots((prevSlots) => [...prevSlots, slot]);
      console.log("Slot added successfully.");
    } catch (err) {
      console.error("Error adding new slot:", err);
      setError("Failed to add new slot. Please try again.");
    }
  };

  const updateCapacity = async (slotId) => {
    try {
      await updateSlotCapacity(selectedCenter.id, slotId);
      // Option 1: Refetch all slots
      const response = await getAllSlots();
      setAllSlots(response.data);
      // Option 2: Update availableSlots state directly
      setAvailableSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.slotId === slotId
            ? { ...slot, capacity: slot.capacity - 1 }
            : slot
        )
      );
      console.log("Slot capacity updated successfully.");
    } catch (err) {
      console.error("Error updating slot capacity:", err);
      setError("Failed to update slot capacity. Please try again.");
    }
  };

  useEffect(() => {
    filterCenters();
  }, [pincode]);

  useEffect(() => {
    if (selectedCenter.id && selectedDate) {
      handleCenterChange({ target: { value: selectedCenter.id } });
    }
  }, [selectedCenter.id, selectedDate]);

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
            <div className="flex flex-wrap gap-4 justify-center">
              {availableSlots.map((slot) => (
                <div
                  key={slot.slotId}
                  className={`cursor-pointer p-2 rounded border  ${
                    selectedSlot?.slotId === slot.slotId
                      ? "bg-blue-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.slot}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 mt-4">
          <div>
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
          </div>

          {selectedSlot && (
            <div className="flex flex-col gap-4">
              <p>
                Selected Slot:{" "}
                <strong>
                  {selectedSlot.slot} - {selectedSlot.capacity}
                </strong>
              </p>
              <button
                onClick={handleScheduleAppointment}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Schedule Appointment
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      {appointmentStatus && (
        <p
          className={`mt-4 ${
            appointmentStatus === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {appointmentStatus === "success"
            ? "Appointment scheduled successfully!"
            : "Failed to schedule appointment."}
        </p>
      )}
    </div>
  );
}

export default ScheduleAppointment;
