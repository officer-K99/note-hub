import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h1>auth</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
