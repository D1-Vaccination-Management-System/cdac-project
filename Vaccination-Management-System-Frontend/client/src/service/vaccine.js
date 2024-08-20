import axios from "axios";
import API_BASE_URL from "./url";

export async function addVaccine(vaccineData, centerId) {
  const response = await axios.post(
    `${API_BASE_URL}/vaccines/add-vaccine/${centerId}`,
    vaccineData
  );
  return response;
}
