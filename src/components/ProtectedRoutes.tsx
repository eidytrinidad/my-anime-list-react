import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
  children?: React.ReactNode;
  isAllowed: boolean;
};

const ProtectedRoutes = ({ children, isAllowed }: ProtectedRoutesProps) => {
  if (!isAllowed) {
    return <Navigate to={"/iniciar-sesion"} />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoutes;
