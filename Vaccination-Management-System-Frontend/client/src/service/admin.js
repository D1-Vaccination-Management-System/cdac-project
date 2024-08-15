import axios from "axios";
import API_BASE_URL from "./url";

export async function adminLogin(email, password) {
  const body = {
    email,
    password,
  };
  const response = await axios.post(`${API_BASE_URL}/admin/login-user`, body);
  return response;
}

export const getVaccinationCenterDetails = async (centerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/vaccination-center/get-center-details/${centerId}`
  );
  return response;
};

export const updateAdminProfile = async (adminData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/admin/update-profile`,
      adminData
    );
    return response;
  } catch (error) {
    console.error("Error updating admin profile:", error);
    throw error;
  }
};
