import { NavLink } from "react-router-dom";

type NavlinkType = { isActive: boolean };
export const Navbar = () => {
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
      </ul>
    </nav>
  );
};
