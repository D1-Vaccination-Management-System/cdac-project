// service/appointment.js
import axios from "axios";

export const getAppointmentHistory = async (patientId) => {
  try {
    const response = await axios.get(`/api/appointments/history/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment history", error);
    throw error;
  }
};
