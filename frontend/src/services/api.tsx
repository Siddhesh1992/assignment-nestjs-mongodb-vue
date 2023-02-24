import axios, { Axios } from "axios";
import { Client } from "../models/client";
import { Provider } from "../models/provider";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

interface ClientFetch {
  data: Client[];
  message: string;
  statusCode: number;
}
interface ClientProvider {
  data: Provider[];
  message: string;
  statusCode: number;
}

export async function fetchClient(id?: string) {
  try {
    const {
      data: { data },
    } = await instance.get<ClientFetch>(`/client`, {
      params: { ...(id && { id }) },
    });
    return { data, error: null };
  } catch (e: any) {
    return { data: [], error: e?.message };
  }
}

export async function fetchClientById(id: string) {
  try {
    const {
      data: { data },
    } = await instance.get<ClientFetch>(`/client/${id}`);
    return { data, error: null };
  } catch (e: any) {
    return { data: [], error: e?.message };
  }
}

export async function fetchProvider() {
  try {
    const {
      data: { data },
    } = await instance.get<ClientProvider>(`/provider`);
    return { data, error: null };
  } catch (e: any) {
    return { data: [], error: e?.message };
  }
}
