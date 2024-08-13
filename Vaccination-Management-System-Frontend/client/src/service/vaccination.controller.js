import axios from "axios";

export async function searchCenterByStateAndCity(city, state) {
  try {
    const response = await axios.get(
      "http://localhost:9999/vaccination-center/centers-by-address",
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
