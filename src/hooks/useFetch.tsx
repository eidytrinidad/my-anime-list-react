import { useEffect, useState } from "react";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";
import { IApiCollection } from "../interfaces";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix";

type useFetchProps<T> = {
  getData: IFunctionGetData<IApiCollection<T>>;
  initialState: IApiCollection<T>;
};

const useFetch = <T, P>({ getData, initialState }: useFetchProps<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    numeroPagina: 1,
    limite: 1,
  });
  const [fetchData, setFetchData] = useState(initialState);

  const getFetchData = async () => {
    Loading.standard("Loading...");
    try {
      const response = await getData(searchParams);
      setFetchData({
        data: response.data,
        paginacion: response.paginacion,
      });
    } catch (error: any) {
      setFetchData(initialState);
      Notify.failure("Ha ocurrido un error cargando los datos", {
        timeout: 5000,
      });
    } finally {
      setIsLoading(false);

      Loading.remove();
    }
  };

  useEffect(() => {
    getFetchData();
  }, [isLoading, searchParams]);

  return {
    ...fetchData,
    data: fetchData.data,
    paginacion: fetchData.paginacion,
    isLoading,
    setIsLoading,
    setSearchParams,
    searchParams,
  };
};

export default useFetch;
