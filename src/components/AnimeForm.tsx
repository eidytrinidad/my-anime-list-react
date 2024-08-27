import { DevTool } from "@hookform/devtools";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAnimeDB, getAnimeLocalStorage } from "../services";
import { zodResolver } from "@hookform/resolvers/zod";
import { animeFormSchema } from "../schemas/animeFormZSchema";
import { IAnime } from "../interfaces";

type AnimeFormProps = {
  animeId: string | undefined;
  onSubmit: SubmitHandler<IAnime>;
};

const AnimeForm = ({ animeId, onSubmit }: AnimeFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IAnime>({
    defaultValues: async () => {
      if (animeId) {
        const response = await getAnimeDB(animeId);
        const anime = response;
        return anime;
      }
      return {
        title: "",
        genres: "",
        imgUrl: "",
        state: true,
      };
    },
    resolver: zodResolver(animeFormSchema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white border border-slate p-4 mt-6"
      >
        <div className="mb-3">
          <label htmlFor="title" className="font-semibold text-xl">
            Titulo del Anime
            {errors.title && (
              <span className="text-xs text-red-500 ms-2">
                ({errors.title.message})
              </span>
            )}
          </label>
          <input
            {...register("title")}
            className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgUrl" className="font-semibold text-xl">
            Url de la imagen
            {errors.imgUrl && (
              <span className="text-xs text-red-500 ms-2">
                ({errors.imgUrl.message})
              </span>
            )}
          </label>
          <input
            {...register("imgUrl")}
            className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genres" className="font-semibold text-xl">
            Generos
            <span className="text-xs">(Separe los generos por comas)</span>
          </label>

          <input
            {...register("genres")}
            className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
          />
        </div>
        {!getValues("state") ? (
          <div className="mb-3">
            <label
              htmlFor="state"
              className="font-semibold cursor-pointer flex items-center"
            >
              <input
                type="checkbox"
                id="state"
                className="mr-2"
                {...register("state")}
              />
              <span>Habilitar Anime</span>
            </label>
          </div>
        ) : null}

        <div className="flex justify-between items-center">
          {animeId ? (
            <button
              className="btn-secondary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Editando" : "Editar"}
            </button>
          ) : (
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando" : "Agregar"}
            </button>
          )}
          <Link className="btn-red" to="/">
            Cancelar
          </Link>
        </div>
      </form>

      <DevTool control={control} />
    </>
  );
};

export default AnimeForm;
