import { Provider } from "./provider";

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  deleted: boolean;
  provider: Provider[];
  createdAt: "2023-02-23T09:06:54.159Z";
  updatedAt: "2023-02-23T09:06:54.159Z";
  __v: 0;
}

export interface PartialClient extends Partial<Omit<Client, "provider">> {
  provider: string;
}

export interface ClientFetch {
  data: Client[];
  message: string;
  statusCode: number;
}


export interface CreateClient extends Pick<Client, "name" | "email" | "phone"> {
  provider: string[];
}
