import { useLocation } from "react-router-dom";
import { AnimeState } from "../../../constants/anime";
import useFetch from "../../../hooks/useFetch";
import {
  deleteAnimesLocalStorage,
  getAnimesLocalDB,
  getAnimesLocalStorage,
} from "../../../services";
import { AnimeCard } from "./components/AnimeCard";
import { IAnime } from "../../../interfaces";
import { Confirm } from "notiflix";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { showConfirm } from "../../../helpers";

export const AnimeContainer = () => {
  const { data, setIsLoading } = useFetch({
    getData: getAnimesLocalStorage,
  });

  let location = useLocation();
  const handleDelete = (anime: IAnime) => {
    showConfirm("Borrar Anime").then(async () => {
      Loading.standard("Loading...");
      const response = await deleteAnimesLocalStorage(anime);
      if (response?.success) {
        setIsLoading(true);
        //Loading.remove();
      }
    });
  };

  return (
    <section className="w-full my-4">
      <div className="flex flex-col md:flex-row md:justify-around px-2 md:flex-wrap items center">
        {location.pathname === "/"
          ? data.map((anime) => {
              if (anime.state === AnimeState.ACTIVE) {
                return (
                  <AnimeCard
                    onHandleDelete={handleDelete}
                    anime={anime}
                    key={anime.id}
                  />
                );
              }
            })
          : data.map((anime) => {
              if (anime.state === AnimeState.INACTIVE) {
                return (
                  <AnimeCard
                    onHandleDelete={handleDelete}
                    anime={anime}
                    key={anime.id}
                  />
                );
              }
            })}
      </div>
    </section>
  );
};
