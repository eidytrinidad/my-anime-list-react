import db from "../db/db.json";
import { IFunctionGetData, IFunctionPostData, IAnime } from "../interfaces";

export const getAnimesLocalDB: IFunctionGetData = async () => {
  return db;
};
export const getAnimesDB: IFunctionGetData = async () => {
  return [];
};
export const getAnimesLocalStorage: IFunctionGetData = async () => {
  return [];
};

export const postAnimesLocalDB: IFunctionPostData<IAnime> = async (
  data: IAnime
) => {
  console.log(data);

  return data;
};
