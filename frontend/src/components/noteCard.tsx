import { Link } from "react-router";
import { FileText, Trash2 } from "lucide-react";

import type { NotesType } from "../types";

const NoteCard = ({
  data,
  onDelete,
}: {
  data: NotesType;
  onDelete: (id: string) => void;
}) => {
  return (
    <article className="group flex h-64 flex-col rounded-2xl border border-white/[0.08] bg-[#111827] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-[#151d30]">
      <Link to={`/notes/${data._id}`} className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/10 text-violet-400">
            <FileText size={19} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h2 className="truncate text-base font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-violet-200">
              {data.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Note</p>
          </div>
        </div>

        <div className="relative mt-5 min-h-0 flex-1 overflow-hidden">
          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-400">
            {data.content}
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#111827] to-transparent transition-colors group-hover:from-[#151d30]" />
        </div>
      </Link>

      <div className="mt-4 flex shrink-0 items-center justify-between border-t border-white/[0.06] pt-3">
        <time dateTime={data.createdAt} className="text-xs text-slate-500">
          {new Date(data.createdAt).toLocaleDateString()}
        </time>

        <button
          type="button"
          aria-label="Delete note"
          onClick={() => onDelete(data._id)}
          className="cursor-pointer rounded-md p-1 text-red-500/70 transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <Trash2 size={19} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
};

export default NoteCard;
