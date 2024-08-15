import axios from "axios";
import API_BASE_URL from "./url";

export async function searchCenterByStateAndCity(city, state) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/vaccination-center/centers-by-address`,
      {
        params: { city, state },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching centers:", error);
    throw error;
  }
}
