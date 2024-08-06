import { IPagination } from "./pagination.interface";

export interface IApiCollection<T> {
  data: T[];
  paginacion: IPagination;
}
