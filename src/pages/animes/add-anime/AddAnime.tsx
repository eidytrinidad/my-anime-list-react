// import { z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IAnime } from "../../../interfaces/anime.interface";
import { urlRegex } from "../../../helpers";
import {
  editAnimesLocalStorage,
  getAnimeLocalStorage,
  postAnimesLocalStorage,
} from "../../../services";
import { DevTool } from "@hookform/devtools";

// const formSchema=z.object({

// })
export const AddAnime = () => {
  let { animeId } = useParams();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<IAnime> = async (data) => {
    let response;
    try {
      if (animeId) {
        response = await editAnimesLocalStorage(data);
        if (response.success) {
          navigate("/");
        }
        return;
      }
      data.id = setDynamicId(data.title);
      response = await postAnimesLocalStorage(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function setDynamicId(title: string) {
    const id =
      title.toString().toLowerCase().replaceAll(" ", "") +
      Math.floor(Math.random() * 10000);
    return id;
  }
  return (
    <section className="w-full flex items-center justify-center">
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
    </section>
  );
};
