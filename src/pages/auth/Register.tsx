import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces";
import { registerUser } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setProfile } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const response: any = await registerUser(data);
    if (response) {
      setToken(response.data.accessToken);
      setProfile(response.data.user);
      navigate("/");
    }
  };
  return (
    <>
      <section className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-96 bg-white border border-slate p-4 mt-6"
        >
          <div className="mb-3">
            <label htmlFor="title" className="font-semibold text-xl">
              Nombre de usario
              {errors.name && (
                <span className="text-xs text-red-500 ms-2">
                  ({errors.name.message})
                </span>
              )}
            </label>
            <input
              type="text"
              className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
              {...register("name", {
                required: "Nombre de usuario es requerido",
              })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="font-semibold text-xl">
              Email
              {errors.email && (
                <span className="text-xs text-red-500 ms-2">
                  ({errors.email.message})
                </span>
              )}
            </label>
            <input
              type="text"
              className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
              {...register("email", { required: "Email es requerido" })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="font-semibold text-xl">
              Password
              {errors.password && (
                <span className="text-xs text-red-500 ms-2">
                  ({errors.password.message})
                </span>
              )}
            </label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                className="border rounded-sm border-slate-400 outline-primary block w-full pl-2 py-1"
                {...register("password", {
                  required: "Password es requerido",
                  minLength: {
                    value: 6,
                    message: "Password minimo debe ser 6 digitos",
                  },
                })}
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
            <button
              className="btn-primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
            <Link className="btn-red" to="/">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};
