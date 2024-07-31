// import { z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IAnime } from "../../../interfaces/anime.interface";
import { urlRegex } from "../../../helpers";

// const formSchema=z.object({

// })
export const AddAnime = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      title: "",
      imgUrl: "",
      genres: "",
      state: true,
    },
  });

  const onSubmit: SubmitHandler<IAnime> = async (data) => {
    data.id = setDynamicId(data.title);
    console.log(data);

    try {
    } catch (error) {}
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
          <button className="btn-primary">Agregar</button>
          {/* <button className="btn-secondary">Editar</button> */}
          <Link className="btn-red" to="/">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
};
