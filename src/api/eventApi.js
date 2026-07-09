import axios from "axios";

const eventApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export async function fetchEventData() {
  const response = await eventApi.get("/posts");

  return response.data.slice(0, 6);
}