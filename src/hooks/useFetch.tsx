import { useEffect, useState } from "react";
import { IFunctionGetData } from "../interfaces/functionGetData.interface";

type initialState = {
  data: any[];
  isLoading: boolean;
  error?: unknown;
};

const useFetch = ({ getData }: { getData: IFunctionGetData }) => {
  const [fetchData, setFetchData] = useState<initialState>({
    data: [],
    isLoading: true,
    error: "",
  });

  const getFetchData = async () => {
    try {
      const data = await getData();
      setFetchData({
        data,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      setFetchData({
        data: [],
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
    isLoading: fetchData.isLoading,
    error: fetchData.error,
  };
};

export default useFetch;
