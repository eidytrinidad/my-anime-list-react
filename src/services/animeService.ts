import { IFunctionGetData, IApiCollection, IAnime } from "../interfaces";
import { IApiData } from "../interfaces/data.interface";

export type getAnimeDBType = (animeId: string) => Promise<any>;

export const getAnimesDB: IFunctionGetData<
  IApiCollection<IAnime>
> = async () => {
  const resp = await fetch("http://localhost:4500/api/v1/animes");
  const animeData: IApiCollection<IAnime> = await resp.json();
  return animeData;
};

export const getAnimeDB: getAnimeDBType = async (animeId: string) => {
  const resp = await fetch(`http://localhost:4500/api/v1/animes/${animeId}`);
  const animeData: IApiData<IAnime> = await resp.json();

  return animeData.data;
};

export const postAnimesDB = async (anime: IAnime) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...anime }),
    };
    const response = await fetch(
      `http://localhost:4500/api/v1/animes`,
      requestOptions
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editAnimesDB = async (anime: IAnime) => {
  try {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...anime }),
    };
    const response = await fetch(
      `http://localhost:4500/api/v1/animes/${anime.id}`,
      requestOptions
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAnimeDB = async (anime: IAnime) => {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://localhost:4500/api/v1/animes/${anime.id}`,
      requestOptions
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
