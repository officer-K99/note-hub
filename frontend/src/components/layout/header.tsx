import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Plus, NotebookPen, LogOut, ChevronDown } from "lucide-react";
import { useLogout, useMe } from "../../hooks/useAuth";

const Header = () => {
  const { data: user } = useMe();
  const { mutate: logout, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-slate-900/95 shadow-lg shadow-black/10 backdrop-blur">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link
          to="/"
          aria-label="Note Hub home"
          className="group flex shrink-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 transition-colors group-hover:bg-indigo-500/25">
            <NotebookPen size={22} strokeWidth={2} />
          </span>

          <span className="hidden text-xl font-bold tracking-tight text-white min-[400px]:inline">
            Note <span className="text-indigo-400">Hub</span>
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            to="/notes/new"
            aria-label="New note"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 text-sm font-semibold text-white shadow-md shadow-indigo-950/30 transition-all hover:bg-indigo-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 min-[500px]:px-4 sm:px-5"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="hidden text-stone-950 min-[500px]:inline">
              New Note
            </span>
          </Link>

          <div ref={menuRef} className="relative min-w-0">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label="Account menu"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-slate-700 pl-1 pr-1 text-sm text-slate-300 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:pl-1.5 sm:pr-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-semibold text-indigo-300">
                {initial}
              </span>
              <span className="hidden max-w-48 truncate sm:block">
                {user?.email}
              </span>
              <ChevronDown
                size={16}
                className={`hidden shrink-0 transition-transform sm:block ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-xl shadow-black/30"
              >
                <div className="border-b border-white/[0.06] px-4 py-3">
                  <p className="text-xs text-slate-500">Signed in as</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-slate-200">
                    {user?.email}
                  </p>
                </div>

                <div className="p-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => logout()}
                    disabled={isPending}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut size={16} />
                    {isPending ? "Logging out..." : "Log out"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
