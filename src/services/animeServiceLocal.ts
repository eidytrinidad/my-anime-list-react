import db from "../db/db.json";
export const getAnimesLocalDB: IFunctionGetData = async () => {
  return db;
};
import { IFunctionGetData, IAnime } from "../interfaces";
let animeList: IAnime[];

export const getAnimesLocalStorage = async () => {
  animeList = JSON.parse(localStorage.getItem("animes") || "[]");
  console.log(animeList);

  return animeList;
};

export const getAnimeLocalStorage: any = async (id: string | undefined) => {
  let animes = await getAnimesLocalStorage();

  let selectedAnime;
  if (id) {
    selectedAnime = animes?.find((anime: IAnime) => anime.id === id);
  }

  return selectedAnime;
};

export const postAnimesLocalStorage = async (data: IAnime) => {
  return new Promise((resolve) => {
    const dat = {
      data: animeList,
      paginacion: {
        total: 3,
        numeroPagina: 1,
        limite: 10,
        totalPaginas: 1,
      },
    };
    const list = [data, ...animeList];
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
      const updatedList = animes.map((anime: IAnime) => {
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
