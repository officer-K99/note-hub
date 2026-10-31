import { Navigate, Outlet, useLocation } from "react-router";
import { useMe } from "../../hooks/useAuth";
import Loading from "../loading";

const GuestOnly = () => {
  const { data: user, isPending } = useMe();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b1a]">
        <Loading />
      </div>
    );
  }

  if (user) {
    const from = location.state?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default GuestOnly;
