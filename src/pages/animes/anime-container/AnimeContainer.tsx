import { useLocation } from "react-router-dom";
import { AnimeState } from "../../../constants/anime";
import useFetch from "../../../hooks/useFetch";
import { getAnimesLocalDB, getAnimesLocalStorage } from "../../../services";
import { AnimeCard } from "./components/AnimeCard";

export const AnimeContainer = () => {
  const { data } = useFetch({
    getData: getAnimesLocalStorage,
  });
  let isAnimeActive = true;
  let location = useLocation();
  // if (data.length < 1) {
  //   return (
  //     <div className="mt-10">
  //       {isAnimeActive ? (
  //         <h4 className="font-bold text-lg sm:text-xl md:text-2xl">
  //           No tienes animes disponibles en tu lista
  //         </h4>
  //       ) : (
  //         <h4 className="font-bold text-lg sm:text-xl md:text-2xl">
  //           No tienes animes en tu lista de inactivos
  //         </h4>
  //       )}
  //     </div>
  //   );
  // }

  return (
    <section className="w-full my-4">
      <div className="flex flex-col md:flex-row md:justify-around px-2 md:flex-wrap items center">
        {location.pathname === "/"
          ? data.map((anime) => {
              if (anime.state === AnimeState.ACTIVE) {
                return <AnimeCard anime={anime} key={anime.id} />;
              }
            })
          : data.map((anime) => {
              if (anime.state === AnimeState.INACTIVE) {
                return <AnimeCard anime={anime} key={anime.id} />;
              }
            })}
      </div>
    </section>
  );
};
