import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type NavlinkType = { isActive: boolean };
export const Navbar = () => {
  const { isAuth } = useAuthStore();
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
