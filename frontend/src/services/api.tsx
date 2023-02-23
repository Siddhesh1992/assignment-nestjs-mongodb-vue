import axios, { Axios } from "axios";
import { Client } from "../models/client";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

interface axiosType {
  data: Client[];
  message: string;
  statusCode: number;
}

export async function fetchClient() {
  try {
    const {
      data: { data },
    } = await instance.get<axiosType>("/client");
    return { data, error: null };
  } catch (e: any) {
    return { data: [], error: e?.message };
  }
}
