import axios from "axios";

export const getAsteroidsData = async (startDate, endDate) => {
  // Get the API key from the runtime config
  const config = useRuntimeConfig();
  const apiKey = config.public.nasaApiKey;
  const baseUrl = "https://api.nasa.gov/neo/rest/v1";

  try {
    //  GET request to NASA's API
    const response = await axios.get(`${baseUrl}/feed`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: apiKey,
      },
    });

    // Extract and return the near earth objects data from the response
    const data = response.data.near_earth_objects;
    return data;
  } catch (error) {
    console.error("Error fetching asteroid data:", error);
    throw error;
  }
};
