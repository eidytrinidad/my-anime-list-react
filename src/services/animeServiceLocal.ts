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

export const getAnimeLocalStorage: any = async (id: string) => {
  try {
    animeList = await getAnimesLocalStorage();
    let selectedAnime = animeList.data?.find(
      (anime: IAnime) => anime.id === id
    );

    if (!selectedAnime) {
      throw new Error("No existe un anime con ese id");
    }
    selectedAnime = animeList.data?.find((anime: IAnime) => anime.id === id);
    return selectedAnime;
  } catch (error) {
    console.log(error);
  }
};

export const postAnimesLocalStorage: any = async (data: IAnime) => {
  animeList = await getAnimesLocalStorage();
  const formData = {
    ...animeList,
    data: [data, ...animeList.data],
  };

  return new Promise((resolve) => {
    localStorage.setItem("animes", JSON.stringify(formData));
    setTimeout(() => {
      resolve({ success: true, data });
    }, 2000);
  });
};

export const editAnimesLocalStorage: any = async (data: IAnime) => {
  animeList = await getAnimesLocalStorage();
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedList = animeList.data.map((anime: IAnime) => {
        if (anime.id === data.id) {
          return {
            ...data,
          };
        }
        return anime;
      });
      const formData = {
        ...animeList,
        data: updatedList,
      };

      localStorage.setItem("animes", JSON.stringify(formData));
      resolve({ success: true, data });
    }, 2000);
  });
};
