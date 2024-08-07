import { IAnime } from "../../../../interfaces/anime.interface";
import noImage from "../../../../assets/no-image.jpg";
import { titleCase } from "../../../../helpers";
import { Link } from "react-router-dom";
import { deleteAnimesLocalStorage } from "../../../../services";
type AnimeCardProp = {
  anime: IAnime;
};

export const AnimeCard = ({ anime }: AnimeCardProp) => {
  return (
    <article className="w-60 mb-7 card-shadow md:w-52 relative">
      <div className="w-full">
        <img
          className="object-cover aspect-[5/7] w-full"
          src={anime.imgUrl}
          alt={anime.title}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = noImage;
          }}
        />
      </div>
      <div className="text-center px-2 py-2 absolute top-0 w-full bg-primary/[0.6]">
        <p className="font-semibold text-white text-sm">
          {titleCase(anime.title)}
        </p>
      </div>
      {anime.genres ? (
        <div className="text-center py-2 absolute bottom-16 w-full bg-primary/[0.6]">
          <p className="font-semibold text-white text-xs">
            {titleCase(anime.genres)}
          </p>
        </div>
      ) : null}

      <hr />
      {anime.state ? (
        <div className="flex justify-between items-center p-3 bg-white">
          <Link to={`/editar/${anime.id}`} className="btn-secondary">
            Editar
          </Link>
          <button
            className="btn-red"
            onClick={() => deleteAnimesLocalStorage(anime)}
          >
            Borrar
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center p-3 bg-white">
          <Link to={`/editar/${anime.id}`} className="btn-secondary ">
            Habilitar
          </Link>
        </div>
      )}
    </article>
  );
};
