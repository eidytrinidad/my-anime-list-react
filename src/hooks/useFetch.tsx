import { useEffect, useState } from "react";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";
import { IApiCollection, IPagination } from "../interfaces";

type initialState<T> = {
  data: T[];
  pagination: IPagination;
  error?: unknown;
};

type useFetchProps<T> = {
  getData: IFunctionGetData<IApiCollection<T>>;
};

const useFetch = <T,>({ getData }: useFetchProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState<initialState<T>>({
    data: [],
    pagination: {
      total: 1,
      numeroPagina: 1,
      limite: 1,
      totalPaginas: 1,
    },

    error: "",
  });

  const getFetchData = async () => {
    const response = await getData();
    setIsLoading(true);
    try {
      setFetchData({
        data: response.data,
        pagination: response.paginacion,
        error: "",
      });
    } catch (error) {
      setFetchData({
        data: [],
        pagination: response.paginacion,
        error: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFetchData();
  }, [isLoading]);

  return {
    ...fetchData,
    data: fetchData.data,
    pagination: fetchData.pagination,
    isLoading,
    setIsLoading,
    error: fetchData.error,
  };
};

export default useFetch;
