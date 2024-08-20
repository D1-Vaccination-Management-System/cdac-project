import React, { useState, useEffect } from "react";
import { getListOfVaccines } from "../service/healthstaff";

function VaccineDropdown({ setVaccineName }) {
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState("");

  useEffect(() => {
    const centerId = sessionStorage.getItem("centerId");
    if (centerId) {
      const fetchVaccines = async () => {
        try {
          const response = await getListOfVaccines(centerId);
          console.log(response.data);
          setVaccines(response.data);
        } catch (error) {
          console.error("Error fetching vaccines:", error);
        }
      };

      fetchVaccines();
    }
  }, []);

  const handleVaccineChange = (event) => {
    setSelectedVaccine(event.target.value);
    setVaccineName(event.target.value);
    // Additional logic for handling selected vaccine can be added here
  };

  return (
    <select
      value={selectedVaccine}
      onChange={handleVaccineChange}
      className="border border-gray-300 p-2 rounded"
    >
      <option value="">Select a vaccine</option>
      {vaccines.map((vaccine, index) => (
        <option key={index} value={vaccine.vaccineName}>
          {vaccine.vaccineName}
        </option>
      ))}
    </select>
  );
}

export default VaccineDropdown;
