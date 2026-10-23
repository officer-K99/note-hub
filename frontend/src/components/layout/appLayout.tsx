import { Outlet } from "react-router";
import Header from "./header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-68px)] bg-[#070b1a]">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
