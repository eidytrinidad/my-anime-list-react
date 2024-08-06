import { z } from "zod";
import { urlRegex } from "../helpers";
export const animeFormSchema = z.object({
  title: z.string().min(2, "Titulo debe ser minimo 2 letras"),
  imgUrl: z.string().regex(urlRegex, {
    message: "Ingrese url valida",
  }),
  genres: z.string(),
  state: z.boolean(),
});
