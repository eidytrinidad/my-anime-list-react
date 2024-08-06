import useFetch from "../../../hooks/useFetch";
import { getAnimesLocalDB, getAnimesLocalStorage } from "../../../services";
import { AnimeCard } from "./components/AnimeCard";

export const AnimeContainer = () => {
  const { data } = useFetch({
    getData: getAnimesLocalStorage,
  });

  return (
    <section className="w-full my-4">
      <div className="flex flex-col md:flex-row md:justify-around px-2 md:flex-wrap items center">
        {data.map((anime) => (
          <AnimeCard anime={anime} key={anime.id} />
        ))}
      </div>
    </section>
  );
};
