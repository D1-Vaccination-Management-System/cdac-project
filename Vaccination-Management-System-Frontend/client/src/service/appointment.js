// service/appointment.js
import axios from "axios";
import API_BASE_URL from "./url";

export const getAppointmentHistory = async (patientId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/appointments/history/${patientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment history", error);
    throw error;
  }
};

export const getHomeVisitAppointment = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/appointment/get-home-visit-appointments`
    );
    return response;
  } catch (error) {}
};
