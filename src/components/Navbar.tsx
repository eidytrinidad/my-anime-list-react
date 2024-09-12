import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { showConfirm } from "../helpers";
import { Loading } from "notiflix";
import { logOutUser } from "../services/authService";

type NavlinkType = { isActive: boolean };

export const Navbar = () => {
  const { isAuth, logout } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const handleLogout = () => {
    showConfirm("Cerrar sesion").then(async () => {
      Loading.standard("Loading...");
      const response: any = await logOutUser();

      if (response.status === 200) {
        logout();
        navigate("/");
        Loading.remove();
      }
    });
  };
  return (
    <nav className="p-2">
      <ul className="flex ">
        <li>
          <NavLink
            to="/"
            className={({ isActive }: NavlinkType) =>
              `font-semibold text-white text-sm ml-4 ${
                isActive ? " bg-slate-100/[0.2] p-2 rounded" : ""
              }`
            }
          >
            Animes
          </NavLink>
        </li>
        {isAuth ? (
          <>
            <li>
              <NavLink
                to="/agregar"
                className={({ isActive }: NavlinkType) =>
                  `font-semibold text-white text-sm ml-4 ${
                    isActive ? " bg-slate-100/[0.2] p-2 rounded" : ""
                  }`
                }
              >
                Agregar
              </NavLink>
            </li>
            <li>
              <button
                className="text-white text-sm p-1 rounded-md bg-red-600 ml-4"
                onClick={handleLogout}
              >
                Cerrar sesion
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/iniciar-sesion"
              className={({ isActive }: NavlinkType) =>
                `font-semibold text-white text-sm ml-4 ${
                  isActive ? " bg-slate-100/[0.2] p-2 rounded" : ""
                }`
              }
            >
              Iniciar sesion
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/registrar"
            className={({ isActive }: NavlinkType) =>
              `font-semibold text-white text-sm ml-4 ${
                isActive ? " bg-slate-100/[0.2] p-2 rounded" : ""
              }`
            }
          >
            Registro
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
