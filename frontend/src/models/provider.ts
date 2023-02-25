export type Provider = {
  _id: string;
  name: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface ClientProvider {
  data: Provider[];
  message: string;
  statusCode: number;
}
