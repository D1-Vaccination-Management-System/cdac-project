import axios from "axios";
import API_BASE_URL from "./url";
export async function registerCenter(formData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/vaccination-center/add-center`,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error registering the center:", error);
    throw error;
  }
}

export const registerAdmin = (formData, centerId) => {
  return axios.post(`${API_BASE_URL}/admin/add-admin/${centerId}`, formData);
};