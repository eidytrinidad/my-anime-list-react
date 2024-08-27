import useFetch from "../../../hooks/useFetch";
import { deleteAnimeDB, getAnimesDB } from "../../../services";
import { AnimeCard } from "./components/AnimeCard";
import { IAnime } from "../../../interfaces";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { showConfirm } from "../../../helpers";

const initialState = {
  data: [],
  paginacion: {
    total: 1,
    numeroPagina: 1,
    limite: 1,
    totalPaginas: 1,
  },
};
export const AnimeContainer = () => {
  const { data, setIsLoading } = useFetch({
    getData: getAnimesDB,
    initialState,
  });

  const handleDelete = (anime: IAnime) => {
    showConfirm("Borrar Anime").then(async () => {
      Loading.standard("Loading...");
      const response = await deleteAnimeDB(anime);
      if (response?.ok) {
        setIsLoading(true);
        Loading.remove();
      }
    });
  };

  return (
    <section className="w-full my-4">
      <div className="flex flex-col md:flex-row md:justify-around px-2 md:flex-wrap items center">
        {data.map((anime) => {
          return (
            <AnimeCard
              onHandleDelete={handleDelete}
              anime={anime}
              key={anime.id}
            />
          );
        })}
      </div>
    </section>
  );
};
