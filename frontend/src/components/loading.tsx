import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div
        role="status"
        className="flex min-h-44 w-full max-w-lg items-center gap-5 rounded-2xl border border-white/[0.08] bg-[#111827] p-8"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <LoaderCircle size={28} className="animate-spin" />
        </div>

        <div>
          <p className="text-base font-semibold text-slate-100">
            Loading your notes
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Getting everything ready...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
