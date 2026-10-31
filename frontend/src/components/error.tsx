import { AlertCircle } from "lucide-react";

interface NotesErrorProps {
  message: string;
}

const Error = ({ message }: NotesErrorProps) => {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div
        role="alert"
        className="flex min-h-44 w-full max-w-lg items-start gap-4 rounded-2xl border border-red-400/15 bg-[#111827] p-5 sm:gap-5 sm:p-8"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 sm:h-14 sm:w-14">
          <AlertCircle size={27} />
        </div>

        <div className="min-w-0 pt-1">
          <h2 className="text-base font-semibold text-slate-100">
            Couldn't load your notes
          </h2>

          <p className="mt-2 break-words text-sm leading-6 text-slate-400">
            {message}
          </p>

          <p className="mt-3 text-xs text-slate-500">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
