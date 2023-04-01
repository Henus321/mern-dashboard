import { Navigate, Outlet } from "react-router-dom";
import { DEFAULT_AUTHORIZED_USER_ROUTE } from "@/constants";
import { useAuthStatus } from "@/hooks";

import { Spinner } from "./";

export const LoggedInRedirect = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? (
    <Navigate to={DEFAULT_AUTHORIZED_USER_ROUTE} />
  ) : (
    <Outlet />
  );
};
