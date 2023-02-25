import axios, { Axios } from "axios";
import { Client, ClientFetch, CreateClient } from "../models/client";
import { ClientProvider, Provider } from "../models/provider";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

function handleError(error: any) {
  const e = error?.response?.data.message || error.message;
  if (typeof e === "string") {
    return { error: e, data: [] };
  }
  return { error: e[0], data: [] };
}

export async function fetchClientApi(id?: string) {
  try {
    const {
      data: { data },
    } = await instance.get<ClientFetch>(`/client`, {
      params: { ...(id && { id }) },
    });
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}

export async function fetchClientByIdApi(id: string) {
  try {
    const {
      data: { data },
    } = await instance.get<ClientFetch>(`/client/${id}`);
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}

export async function editClientApi(id: string, body: CreateClient) {
  try {
    const {
      data: { data },
    } = await instance.put<ClientFetch>(`/client/${id}`, body);
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}

export async function createClientApi(body: CreateClient) {
  try {
    const {
      data: { data },
    } = await instance.post<ClientFetch>(`/client`, body);
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}

export async function fetchProviderApi() {
  try {
    const {
      data: { data },
    } = await instance.get<ClientProvider>(`/provider`);
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}

export async function createProviderApi(name: string) {
  try {
    const {
      data: { data },
    } = await instance.post<ClientProvider>(`/provider`, { name });
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}
export async function editProviderApi(id: string, name: string) {
  try {
    const {
      data: { data },
    } = await instance.put<ClientProvider>(`/provider/${id}`, { name });
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}
export async function deleteProviderApi(id: string) {
  try {
    const {
      data: { data },
    } = await instance.delete<ClientProvider>(`/provider/${id}`);
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}

export async function deleteClientApi(id: string) {
  try {
    const {
      data: { data },
    } = await instance.delete<ClientFetch>(`/client/${id}`);
    return { data, error: null };
  } catch (e: any) {
    return handleError(e);
  }
}
