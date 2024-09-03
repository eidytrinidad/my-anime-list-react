import axios from "axios";
import { AnimeState } from "../constants/anime";
import { IFunctionGetData, IApiCollection, IAnime } from "../interfaces";
import { IApiData } from "../interfaces/data.interface";
import { Loading, Notify } from "notiflix";

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

  const resp = await fetch(
    `http://localhost:4500/api/v1/animes?${queryString.toString()}`
  );
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
  Loading.circle();
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ ...anime }),
  };
  const res = await fetch(
    `http://localhost:4500/api/v1/animes/${anime.id}`,
    requestOptions
  );
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
      `http://localhost:4500/api/v1/animes/${anime.id}`,
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
