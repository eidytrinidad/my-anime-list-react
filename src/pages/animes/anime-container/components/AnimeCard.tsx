import { titleCase } from "../../../../helpers/title-case";
import { IAnime } from "../../../../interfaces/anime.interface";
import noImage from "../../../../assets/no-image.jpg";
type AnimeCardProp = {
  anime: IAnime;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
};

export const AnimeCard = ({ anime, onUpdate, onDelete }: AnimeCardProp) => {
  const handleEdit = (id: string) => {
    onUpdate(id);
  };
  const handleDelete = (id: string) => {
    onDelete(id);
  };
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
      <div className="flex justify-between items-center p-3 bg-white">
        {anime.state ? (
          <>
            <button
              className="btn-secondary"
              onClick={() => handleEdit(anime.id)}
            >
              Editar
            </button>
            <button className="btn-red" onClick={() => handleDelete(anime.id)}>
              Borrar
            </button>
          </>
        ) : (
          <button
            className="btn-secondary"
            onClick={() => handleEdit(anime.id)}
          >
            Habilitar
          </button>
        )}
      </div>
    </article>
  );
};
