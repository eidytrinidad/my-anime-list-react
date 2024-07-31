import db from "../db/db.json";
export const getAnimesLocalDB: IFunctionGetData = async () => {
  return db;
};
import { IFunctionGetData, IFunctionPostData, IAnime } from "../interfaces";
let animeList: IAnime[];

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

export const editAnimesLocalStorage: IFunctionPostData<IAnime> = async (
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
