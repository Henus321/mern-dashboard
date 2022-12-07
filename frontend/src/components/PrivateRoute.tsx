import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/auth";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
