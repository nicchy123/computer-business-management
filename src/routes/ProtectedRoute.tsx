import { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
