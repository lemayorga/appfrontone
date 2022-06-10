import { http } from "../../../config/http-common";
import  Rol  from '../../../types/modelsapis/seguridad/rol';


const url: string = "/seguridad/Rol";

export const get = async (): Promise<Rol[]> => {
  const { data } = await http.get<Rol[]>(url);
  return data;
};

export const getByKey = async (key: string): Promise<Rol[]> => {
  const { data } = await http.get<Rol[]>(`${url}/${key}`);
  return data;
};

export const create = async (model: Rol): Promise<Rol> => {
  const { data } = await http.post<Rol>(url, model);
  return data;
};

export const update = async (model: Rol): Promise<Rol> => {
  const { data } = await http.put<Rol>(`${url}`, model);
  return data;
};

export const removeByKey = async (key: any | number): Promise<boolean> => {
  const { data } = await http.delete<boolean>(`${url}/${key}`);
  return data;
};


// https://altrim.io/posts/axios-http-client-using-typescript