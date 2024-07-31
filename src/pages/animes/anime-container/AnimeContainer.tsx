import useFetch from "../../../hooks/useFetch";
import { getAnimesLocalDB, getAnimesLocalStorage } from "../../../services";
import { AnimeCard } from "./components/AnimeCard";

export const AnimeContainer = () => {
  const { data } = useFetch({
    getData: getAnimesLocalStorage,
  });

  const handleUpdate = (id: string) => {
    console.log(id);
  };
  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <section className="w-full my-4">
      <div className="flex flex-col md:flex-row md:justify-around px-2 md:flex-wrap items center">
        {data.map((anime) => (
          <AnimeCard
            anime={anime}
            key={anime.id}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </section>
  );
};
