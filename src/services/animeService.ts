import axios from "axios";
import { AnimeState } from "../constants/anime";
import { IFunctionGetData, IApiCollection, IAnime } from "../interfaces";
import { IApiData } from "../interfaces/data.interface";
import { Loading, Notify } from "notiflix";

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = `${apiUrl}/animes`;

export type getAnimeDBType = (animeId: string) => Promise<any>;
export interface ISearchParams {
  limite?: number;
  numeroPagina?: number;
  state?: string;
}

export const getAnimesDB: IFunctionGetData<IApiCollection<IAnime>> = async (
  params: Record<string, any>
) => {
  let queryString = new URLSearchParams();

  for (let key in params) {
    queryString.append(key, params[key]);
  }

  const resp = await fetch(`${baseUrl}?${queryString.toString()}`);
  const animeData: IApiCollection<IAnime> = await resp.json();

  return animeData;
};

export const getAnimeDB: getAnimeDBType = async (animeId: string) => {
  const resp = await fetch(`${baseUrl}/${animeId}`);
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
    const response = await fetch(`${baseUrl}`, requestOptions);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editAnimesDB = async (anime: IAnime) => {
  Loading.circle();
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ ...anime }),
  };
  const res = await fetch(`${baseUrl}/${anime.id}`, requestOptions);
  if (!res.ok) {
    Loading.remove();
    return res.text().then((text: any) => {
      Notify.failure(JSON.parse(text).msg, { timeout: 5000 });

      throw new Error(text);
    });
  } else {
    Loading.remove();
    return res;
  }
};
export const deleteAnimeDB = async (anime: IAnime) => {
  const data = {
    ...anime,
    state: AnimeState.INACTIVE,
  };
  try {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await axios.patch(
      `${baseUrl}/${anime.id}`,
      requestOptions
    );
    return response;
  } catch (error: any) {
    const { msg } = error.response.data;
    Notify.failure(msg, { timeout: 5000 });
  } finally {
    Loading.remove();
  }
};
