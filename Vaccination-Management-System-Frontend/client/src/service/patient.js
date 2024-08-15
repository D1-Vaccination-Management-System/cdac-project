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
