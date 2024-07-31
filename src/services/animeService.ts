import db from "../db/db.json";
import { IFunctionGetData, IFunctionPostData, IAnime } from "../interfaces";
let animeList: IAnime[];
export const getAnimesLocalDB: IFunctionGetData = async () => {
  return db;
};
export const getAnimesDB: IFunctionGetData = async () => {
  return [];
};
export const getAnimesLocalStorage: IFunctionGetData = async () => {
  animeList = JSON.parse(localStorage.getItem("animes") || "[]");
  return animeList;
};

export const postAnimesLocalStorage: IFunctionPostData<IAnime> = async (
  data: IAnime
) => {
  return new Promise((resolve) => {
    const list = [data, ...animeList];
    localStorage.setItem("animes", JSON.stringify(list));
    setTimeout(() => {
      resolve({ success: true, data });
    }, 2000);
  });
};
