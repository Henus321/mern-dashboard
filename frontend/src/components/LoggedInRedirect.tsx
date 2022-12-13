import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/auth";
import Spinner from "./Spinner";

const LoggedInRedirect = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Navigate to="/orders" /> : <Outlet />;
};

export default LoggedInRedirect;
