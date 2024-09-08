import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type PublicRoutesProps = {
  children?: React.ReactNode;
};

const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { isAuth } = useAuthStore((state) => state);
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoutes;
