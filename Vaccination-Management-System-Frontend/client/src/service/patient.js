import axios from "axios";

export async function getCenterByPincode(pincode) {
  try {
    const response = await axios.get(
      "http://localhost:9999/vaccination-center/centers-by-pincode",
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
    "http://localhost:9999/patient/register-user",
    formdata
  );
  return response;
}
