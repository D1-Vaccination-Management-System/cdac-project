import axios from "axios";
import API_BASE_URL from "./url";

export async function getCenterByPincode(pincode) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/vaccination-center/centers-by-pincode`,
      { params: { pincode } }
    );
    return response;
  } catch (error) {
    console.error("Error fetching centers:", error);
    throw error;
  }
}

export async function register2(formdata) {
  const response = await axios.post(
    `${API_BASE_URL}/patient/register-user`,
    formdata
  );
  return response;
}

export async function login(email, password) {
  const body = { email, password };
  const response = await axios.post(`${API_BASE_URL}/patient/login-user`, body);
  return response;
}

export async function getAppointmentHistory(patientId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/patient/appointment-history/${patientId}`
    );
    return response.data; // return the appointment history data
  } catch (error) {
    console.error("Error fetching appointment history:", error);
    throw error;
  }
}
export async function patientLogin(email, password) {
  const body = {
    email,
    password,
  };
  const response = await axios.post(`${API_BASE_URL}/patient/login-user`, body);
  return response;
}

export const updatePatientProfile = async (patientId, profileData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/patient/update-user`,
      profileData,
      {
        params: {
          id: patientId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating patient profile:", error);
    throw new Error("Failed to update profile.");
  }
};

export const updatePatientAddress = async (patientId, addressDetails) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/patient/update-address`, // Replace with your actual endpoint
      {
        street: addressDetails.street,
        city: addressDetails.city,
        state: addressDetails.state,
        zipCode: addressDetails.zipCode,
      },
      {
        params: {
          id: patientId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    return null;
  }
};

export const deletePatientProfile = async (patientId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/patient/delete-user`, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: patientId, // Pass the patientId as a query parameter
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
