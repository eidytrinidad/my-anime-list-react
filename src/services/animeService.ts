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
