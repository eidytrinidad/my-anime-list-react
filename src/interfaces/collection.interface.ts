export interface IApiCollection<T> {
  data: T[];
  paginacion: {
    total: number;
    numeroPagina: number;
    limite: number;
    totalPaginas: number;
  };
}
