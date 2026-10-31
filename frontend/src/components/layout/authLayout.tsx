import { Link, Outlet } from "react-router";
import { NotebookPen } from "lucide-react";

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#070b1a] px-6 py-10">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
          <NotebookPen size={22} />
        </span>
        <span className="text-xl font-bold tracking-tight text-white">
          Note <span className="text-indigo-400">Hub</span>
        </span>
      </Link>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
