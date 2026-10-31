import { Link } from "react-router";
import { FileQuestion } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070b1a] px-6">
      <div className="flex max-w-md flex-col items-center rounded-2xl border border-dashed border-white/10 bg-[#111827]/60 px-8 py-10 text-center">
        <FileQuestion size={30} className="text-slate-500" />
        <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-sm text-slate-400">
          The page you are looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
