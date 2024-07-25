import db from "../db/db.json";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";

export const getAnimesLocalDB: IFunctionGetData = async () => {
  return db;
};
export const getAnimesDB: IFunctionGetData = async () => {
  return [];
};
export const getAnimesLocalStorage: IFunctionGetData = async () => {
  return [];
};
