import { useEffect, useState } from "react";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";
import { IApiCollection } from "../interfaces";
import { Loading } from "notiflix/build/notiflix-loading-aio";
type useFetchProps<T> = {
  getData: IFunctionGetData<IApiCollection<T>>;
  initialState: IApiCollection<T>;
};

const useFetch = <T,>({ getData, initialState }: useFetchProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(initialState);

  const getFetchData = async () => {
    setIsLoading(true);
    Loading.standard("Loading...");
    try {
      const response = await getData();
      setFetchData({
        data: response.data,
        paginacion: response.paginacion,
      });
    } catch (error) {
      setFetchData(initialState);
    } finally {
      setIsLoading(false);
      Loading.remove();
    }
  };

  useEffect(() => {
    getFetchData();
  }, [isLoading]);

  return {
    ...fetchData,
    data: fetchData.data,
    pagination: fetchData.paginacion,
    isLoading,
    setIsLoading,
  };
};

export default useFetch;
