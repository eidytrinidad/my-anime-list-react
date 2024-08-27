import { useEffect, useState } from "react";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";
import { IApiCollection, } from "../interfaces";

type useFetchProps<T> = {
  getData: IFunctionGetData<IApiCollection<T>>;
  initialState: IApiCollection<T>;
};

const useFetch = <T,>({ getData, initialState }: useFetchProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchData, setFetchData] = useState(initialState);

  const getFetchData = async () => {
    const response = await getData();
    setIsLoading(true);
    try {
      setFetchData({
        data: response.data,
        paginacion: response.paginacion,
      });
    } catch (error) {
      setFetchData({
        data: [],
        paginacion: response.paginacion,
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
    pagination: fetchData.paginacion,
    isLoading,
    setIsLoading,
  };
};

export default useFetch;
