import { Navigate, Outlet } from "react-router-dom";
import { DEFAULT_UNAUTHORIZED_USER_ROUTE } from "@/constants";
import { useAuthStatus } from "@/hooks";

import { Spinner } from "./";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={DEFAULT_UNAUTHORIZED_USER_ROUTE} />
  );
};
