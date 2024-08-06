import db from "../db/db.json";
export const getAnimesLocalDB: IFunctionGetData<
  IApiCollection<IAnime>
> = async () => {
  return db;
};
import { IFunctionGetData, IAnime } from "../interfaces";
import { IApiCollection } from "../interfaces/collection.interface";
let animeList: IApiCollection<IAnime>;

export const getAnimesLocalStorage: IFunctionGetData<
  IApiCollection<IAnime>
> = async () => {
  animeList = JSON.parse(localStorage.getItem("animes") || "[]");

  return animeList;
};

export const getAnimeLocalStorage: any = async (id: string | undefined) => {
  let animes = await getAnimesLocalStorage();

  let selectedAnime;
  if (id) {
    selectedAnime = animes.data?.find((anime: IAnime) => anime.id === id);
  }

  return selectedAnime;
};

export const postAnimesLocalStorage = async (data: IAnime) => {
  return new Promise((resolve) => {
    const list = [data, ...animeList.data];
    localStorage.setItem("animes", JSON.stringify(list));
    setTimeout(() => {
      resolve({ success: true, data });
    }, 2000);
  });
};

export const editAnimesLocalStorage: any = async (data: IAnime) => {
  let animes = await getAnimesLocalStorage();
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedList = animes.data.map((anime: IAnime) => {
        if (anime.id === data.id) {
          return {
            ...data,
          };
        }
        return anime;
      });

      localStorage.setItem("animes", JSON.stringify(updatedList));
      resolve({ success: true, data });
    }, 2000);
  });
};
