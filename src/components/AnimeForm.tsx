import { DevTool } from "@hookform/devtools";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { urlRegex } from "../helpers";
import { IAnime } from "../interfaces";
import { getAnimeLocalStorage } from "../services";

type AnimeFormProps = {
  animeId: string | undefined;
  onSubmit: SubmitHandler<IAnime>;
};

const AnimeForm = ({ animeId, onSubmit }: AnimeFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IAnime>({
    defaultValues: async () => {
      const response = await getAnimeLocalStorage(animeId);
      const anime = response;
      return anime;
    },
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
                (Titulo debe ser minimo 2 letras)
              </span>
            )}
          </label>
          <input
            {...register("title", {
              required: "Title is required",
              minLength: 2,
            })}
            className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imgUrl" className="font-semibold text-xl">
            Url de la imagen
            {errors.imgUrl && (
              <span className="text-xs text-red-500 ms-2">
                (Ingrese url valida)
              </span>
            )}
          </label>
          <input
            {...register("imgUrl", {
              required: "imgUrl is required",
              pattern: urlRegex,
            })}
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
