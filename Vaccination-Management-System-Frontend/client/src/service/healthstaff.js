import axios from "axios";
import API_BASE_URL from "./url";

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

export async function registerStaff(StaffData) {
  const response = await axios.post(
    `${API_BASE_URL}/health-staff/add-health-staff`,
    StaffData
  );
  return response;
}

export async function getHealthStaff(centerId) {
  const response = await axios.get(
    `${API_BASE_URL}/health-staff/get-all-staff-by-center-id/${centerId}`
  );
  return response;
}

export async function increaseAppointment(id, appointmentId) {
  const body = {
    id,
    appointmentId
  }
  const response = await axios.post(
    `${API_BASE_URL}/health-staff/incrementAppointments`, body
  );
  return response;
}

export async function healthStaffLogin(email, password) {
  const body = { email, password };
  const response = await axios.post(`${API_BASE_URL}/health-staff/login`, body);
  return response;
}

export async function getAllAppointmentsByStaffId(staffId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/health-staff/get-all-appointment-by-staff-id-null-vaccines/${staffId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching health staff's appointments:", error);
    throw error;
  }
}

export async function updateStaffProfile(email, updatedData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/health-staff/update-health-staff`,
      updatedData,
      {
        params: { email },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
}

export async function getListOfVaccines(centerId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/vaccines/available-vaccine/${centerId}`
    );

    console.log(response.data);
    return response;
  } catch (error) {
    throw new Error("Failed to update profile");
  }
}

export async function assignVaccineToAppointmentDue(
  appointmentId,
  vaccineName
) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/appointment/assign-vaccine-due`,
      {
        appointmentId: appointmentId,
        vaccines: vaccineName,
      }
    );
    console.log("DUE", response.data);
    return response;
  } catch (error) {
    console.error("Error assigning vaccine:", error);
  }
}

export async function assignVaccineToAppointment(appointmentId, vaccineName) {
  try {
    console.log("Appointments ", appointmentId, vaccineName);
    const response = await axios.post(
      `${API_BASE_URL}/appointment/assign-vaccine`,
      {
        appointmentId: appointmentId,
        vaccines: vaccineName,
      }
    );
    console.log("DONE", response.data);
    return response;
  } catch (error) {
    console.error("Error assigning vaccine:", error);
  }
}

export const getCenterVisitAppointments = async (centerId) => {
  return await axios.get(`${API_BASE_URL}/appointment/get-center-visit-appointments/${centerId}`);
};
