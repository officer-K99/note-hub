import { Link } from "react-router";
import { Plus, NotebookPen } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-slate-900/95 shadow-lg shadow-black/10 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand — left */}
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 transition-colors group-hover:bg-indigo-500/25">
            <NotebookPen size={22} strokeWidth={2} />
          </span>

          <span className="text-xl font-bold tracking-tight text-white">
            Note <span className="text-indigo-400">Hub</span>
          </span>
        </Link>

        {/* New note — right */}
        <Link
          to="/notes/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-950/30 transition-all hover:bg-indigo-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-5"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="text-stone-950">New Note</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
