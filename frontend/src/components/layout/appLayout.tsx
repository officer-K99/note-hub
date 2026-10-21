import { Outlet } from "react-router";
import Header from "./header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-73px)] bg-slate-950 text-slate-100">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
