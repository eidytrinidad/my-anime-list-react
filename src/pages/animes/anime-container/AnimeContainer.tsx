import useFetch from "../../../hooks/useFetch";
import { deleteAnimeDB, getAnimesDB, ISearchParams } from "../../../services";
import { AnimeCard } from "./components/AnimeCard";
import { IAnime } from "../../../interfaces";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { showConfirm } from "../../../helpers";
import Pagination from "../../../components/Pagination";

const initialState = {
  data: [],
  paginacion: {
    total: 1,
    numeroPagina: 1,
    limite: 1,
    totalPaginas: 1,
  },
};
const searchParamsInitialState = {
  numeroPagina: 1,
  limite: 1,
};
export const AnimeContainer = () => {
  const { data, setIsLoading, paginacion, setSearchParams, searchParams } =
    useFetch<IAnime, ISearchParams>({
      getData: getAnimesDB,
      initialState,
      searchParamsInitialState,
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

  const handleSearch = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      ...searchParams,
      state: target.value,
      numeroPagina: 1,
    });
  };
  const handlePageChange = (page: number) => {
    if (page !== paginacion.numeroPagina) {
      setSearchParams({
        ...searchParams,
        numeroPagina: page,
      });
    }
  };

  return (
    <section className="w-full my-4">
      <div className="flex justify-end mb-5">
        <select
          onChange={(e) => handleSearch(e)}
          className="bg-primary rounded-md p-1 text-white font-semibold"
        >
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </div>
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
      {data.length > 0 && (
        <Pagination
          paginacion={paginacion}
          onHandlePageChange={handlePageChange}
        />
      )}
    </section>
  );
};
