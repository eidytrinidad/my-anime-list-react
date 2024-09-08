import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUser } from "../../interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/authService";
import { authFormSchema } from "../../schemas/authFormZSchema";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setProfile } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    console.log("test");

    const response: any = await loginUser(data);
    if (response) {
      setToken(response.data.accessToken);
      setProfile(response.data.user);
      navigate("/");
    }
  };
  return (
    <section className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 bg-white border border-slate p-4 mt-6"
      >
        <div className="mb-3">
          <label htmlFor="email" className="font-semibold text-xl">
            Email{errors.email && <span>{errors.email?.message}</span>}
          </label>
          <input
            className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
            type="email"
            {...register("email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="font-semibold text-xl">
            Password{errors.password && <span>{errors.password?.message}</span>}
          </label>

          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
              {...register("password")}
            />
            <button
              className="btn-secondary text-xs p-2 hover:bg-primary hover:text-white"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide " : "Show"}
            </button>
          </div>
        </div>
        {errors.root && (
          <p className="text-xs text-red">{errors.root.message}</p>
        )}
        <div className="flex justify-between items-center">
          <button className="btn-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Iniciando sesion..." : "Iniciar sesion"}
          </button>
          <Link className="btn-red" to="/">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
};
