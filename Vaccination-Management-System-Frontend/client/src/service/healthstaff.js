import axios from "axios";
import API_BASE_URL from "./url";

export async function healthStaffLogin(email, password) {
  const body = { email, password };
  const response = await axios.post(`${API_BASE_URL}/health-staff/login`, body);
  return response;
}

export async function healthStaffAppointments(email) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/health-staff/get-health-staff-with-appointments/${email}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching health staff's appointments:", error);
    throw error;
  }
}
