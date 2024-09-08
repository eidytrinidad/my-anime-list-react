import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type ProtectedRoutesProps = {
  children?: React.ReactNode;
};

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuth } = useAuthStore((state) => state);
  if (!isAuth) {
    return <Navigate to={"/iniciar-sesion"} />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
