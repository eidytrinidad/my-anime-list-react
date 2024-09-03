import { useForm } from "react-hook-form";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      user: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = () => {};
  return (
    <>
      <section className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-96 bg-white border border-slate p-4 mt-6"
        >
          <div className="mb-3">
            <label htmlFor="title" className="font-semibold text-xl">
              Usuario
              {errors.user && (
                <span className="text-xs text-red-500 ms-2">
                  ({errors.user.message})
                </span>
              )}
            </label>
            <input
              type="text"
              {...register("user", { required: "Usuario es requrido" })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              Email
              {errors.email && (
                <span className="text-xs text-red-500 ms-2">
                  {errors.email.message}
                </span>
              )}
            </label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password
              {errors.password && (
                <span className="text-xs text-red ms-2">
                  {errors.password.message}
                </span>
              )}
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Password is requiered",
                min: { value: 6, message: "Password minumum is 6 digts" },
              })}
            />
          </div>

          {errors.root && (
            <p className="text-xs text-red">{errors.root.message}</p>
          )}
          <button className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </section>
    </>
  );
};
