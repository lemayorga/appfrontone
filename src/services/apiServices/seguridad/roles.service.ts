import { http } from "../../../config/http-common";
import  Rol  from '../../../types/modelsapis/seguridad/rol';


const url: string = "/seguridad/Rol";

export const get = async (): Promise<Rol[]> => {
  const { data } = await http.get<Rol[]>(url);
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

export const remove = async (model: Rol): Promise<Rol> => {
  const { data } = await http.delete<Rol>(`/users/${model.cod_rol}`);
  return data;
};


// https://altrim.io/posts/axios-http-client-using-typescript