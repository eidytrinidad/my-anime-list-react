import { z } from "zod";
import { emailRegex } from "../helpers";
export const authFormSchema = z.object({
  user: z.string().min(2, "Usuario debe ser minimo 2").optional(),
  password: z.string().min(2, "Usuario debe ser minimo 2"),
  email: z.string().regex(emailRegex, { message: "Ingrese un correo valido" }),
});
