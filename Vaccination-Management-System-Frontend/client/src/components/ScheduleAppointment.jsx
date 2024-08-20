import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  getCenterByPincode,
  getAvailableSlots,
  scheduleAppointment,
  addNewSlot,
} from "../service/patient";

function ScheduleAppointment() {
  const [pincode, setPincode] = useState("");
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({ id: "", name: "" });
  const [availableSlots, setAvailableSlots] = useState([]);
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
    // Hard-coded slots
    const hardCodedSlots = [
      { slotId: 1, slot: "SLOT_1", date: selectedDate, capacity: 0 },
      { slotId: 2, slot: "SLOT_2", date: selectedDate, capacity: 0 },
      { slotId: 3, slot: "SLOT_3", date: selectedDate, capacity: 0 },
      { slotId: 4, slot: "SLOT_4", date: selectedDate, capacity: 0 },
    ];
    setAvailableSlots(hardCodedSlots);
  }, [selectedDate]);

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
      vaccinationCenterId: selectedCenter.id,
      bookedAppointmentDate: new Date(selectedDate).toISOString(),
      appointmentType,
      appointmentStatus: "SCHEDULED",
    };
    console.log(selectedCenter.id);
    console.log(selectedDate);
    console.log(selectedSlot);
    console.log(appointmentType);

    try {
      await scheduleAppointment(appointment);
      setAppointmentStatus("success");
      // await updateCapacity(selectedSlot);
      await addSlot(selectedSlot);
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
      console.log(selectedCenter.id);
      console.log(slot.slot);
      console.log("For add new " + slot.date);
      const patientId = sessionStorage.getItem("patientId");
      await addNewSlot(selectedCenter.id, slot.slot, slot.date, patientId);
      setAvailableSlots((prevSlots) =>
        prevSlots.map((s) =>
          s.slotId === slot.slotId ? { ...s, capacity: s.capacity - 1 } : s
        )
      ); // Set initial capacity as needed
      console.log("Slot added successfully.");
    } catch (err) {
      console.error("Error adding new slot:", err);
      setError("Failed to add new slot. Please try again.");
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
            <input
              type="text"
              value={pincode}
              onChange={handlePincodeChange}
              placeholder="Enter Pincode"
              className="border p-2"
            />
            {/* <button
              onClick={filterCenters}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Search Centers
            </button> */}
          </div>

          <select
            value={selectedCenter.id}
            onChange={handleCenterChange}
            className="border p-2"
          >
            <option value="">Select Center</option>
            {centers.map((center) => (
              <option key={center.centerId} value={center.centerId}>
                {center.centerName}
              </option>
            ))}
          </select>

          <select
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2"
          >
            {dateOptions.map((date) => (
              <option key={date} value={date}>
                {format(new Date(date), "MMMM d, yyyy")}
              </option>
            ))}
          </select>

          <div className="flex flex-col gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.slotId}
                className={`border p-2 text-left ${selectedSlot && selectedSlot.slotId === slot.slotId
                  ? "bg-gray-200"
                  : "bg-white"
                  }`}
                onClick={() => handleSlotClick(slot)}
              >
                Slot {slot.slot} - Capacity: {slot.capacity}
              </button>
            ))}
          </div>

          <select
            value={appointmentType}
            onChange={handleAppointmentTypeChange}
            className="border p-2"
          >
            <option value="">Select Appointment Type</option>
            <option value="CENTER_VISIT">CENTER_VISIT</option>
            <option value="HOME_VISIT">HOME_VISIT</option>
          </select>

          <button
            onClick={handleScheduleAppointment}
            className="bg-green-500 text-white p-2 rounded"
          >
            Schedule Appointment
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {appointmentStatus === "success" && (
            <p className="text-green-500">
              Appointment scheduled successfully!
            </p>
          )}
          {appointmentStatus === "failure" && (
            <p className="text-red-500">Failed to schedule appointment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
