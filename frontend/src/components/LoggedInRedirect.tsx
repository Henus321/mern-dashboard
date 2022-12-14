import { Navigate, Outlet } from "react-router-dom";
import { DEFAULT_AUTHORIZED_USER_ROUTE } from "../constants/Routes";
import { useAuthStatus } from "../hooks/auth";
import Spinner from "./Spinner";

const LoggedInRedirect = () => {
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

export default LoggedInRedirect;
