import axios from "../libs/axios";
import { IUser } from "../interfaces";
import { Loading, Notify } from "notiflix";

//const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `/auth`;

export const registerUser = async (data: IUser) => {
  Loading.circle();

  try {
    const response = await axios.post(`${baseUrl}/register`, { ...data });
    return response;
  } catch (error: any) {
    const { msg } = error.response.data;
    Notify.failure(msg, { timeout: 5000 });
  } finally {
    Loading.remove();
  }
};
export const loginUser = async (data: IUser) => {
  Loading.circle();

  try {
    const response = await axios.post(`${baseUrl}/login`, { ...data });
    return response;
  } catch (error: any) {
    const { msg } = error.response.data;
    Notify.failure(msg, { timeout: 5000 });
  } finally {
    Loading.remove();
  }
};
export const logOutUser = async () => {
  Loading.circle();

  try {
    const response = await axios.get(`${baseUrl}/logout`);
    return response;
  } catch (error: any) {
    const { msg } = error.response.data;
    Notify.failure(msg, { timeout: 3000 });
  } finally {
    Loading.remove();
  }
};
