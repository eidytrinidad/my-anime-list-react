import { IAnime } from "./anime.interface";

export interface IFunctionGetData {
    (): Promise<IAnime[]>;
  }
  