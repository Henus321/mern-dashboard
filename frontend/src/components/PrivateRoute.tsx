import { Navigate, Outlet } from "react-router-dom";
import { DEFAULT_UNAUTHORIZED_USER_ROUTE } from "../constants/Routes";
import { useAuthStatus } from "../hooks/auth";
import Spinner from "./Spinner";

const PrivateRoute = () => {
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

export default PrivateRoute;
