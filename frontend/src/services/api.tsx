import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export async function fetchClient() {
  try {
    const { data } = await instance.get("/client");
    return { data, error: null };
  } catch (e: any) {
    return { data: null, error: e?.message };
  }
}
