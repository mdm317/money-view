import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../UserContext";

function ProtectedLayout() {
  const { user } = useUser();
  console.log({ user });
  if (user === null) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedLayout;
