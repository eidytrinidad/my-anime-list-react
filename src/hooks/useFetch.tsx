import { useEffect, useState } from "react";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";
import { IApiCollection, IPagination } from "../interfaces";

type initialState<T> = {
  data: T[];
  isLoading: boolean;
  pagination: IPagination;
  error?: unknown;
};

type useFetchProps<T> = {
  getData: IFunctionGetData<IApiCollection<T>>;
};

const useFetch = <T,>({ getData }: useFetchProps<T>) => {
  const [fetchData, setFetchData] = useState<initialState<T>>({
    data: [],
    pagination: {
      total: 1,
      numeroPagina: 1,
      limite: 1,
      totalPaginas: 1,
    },
    isLoading: true,
    error: "",
  });

  const getFetchData = async () => {
    const response = await getData();
    try {
      setFetchData({
        data: response.data,
        pagination: response.paginacion,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      setFetchData({
        data: [],
        pagination: response.paginacion,
        isLoading: false,
        error: error,
      });
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return {
    data: fetchData.data,
    pagination: fetchData.pagination,
    isLoading: fetchData.isLoading,
    error: fetchData.error,
  };
};

export default useFetch;
