import { useSelector } from "react-redux";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { ROUTES } from "../constants";
import { getAuthLocalStorage } from "../storage/local";
import { useEffect } from "react";

const LoginProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);

  return getAuthLocalStorage() && auth.accessToken ? (
    children
  ) : (
    <Navigate to={ROUTES.signIn} replace />
  );
};

export default LoginProtectedRoute;
