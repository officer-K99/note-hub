import { Navigate, Outlet, useLocation } from "react-router";
import { useMe } from "../../hooks/useAuth";
import Loading from "../loading";

const RequireAuth = () => {
  const { data: user, isPending } = useMe();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b1a]">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
