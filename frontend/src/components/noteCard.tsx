import { Link } from "react-router";
import { FileText, DeleteIcon } from "lucide-react";

import type { NotesType } from "../types";

const NoteCard = ({
  data,
  onDelete,
}: {
  data: NotesType;
  onDelete: (id: string) => Promise<void>;
}) => {
  return (
    <article className="group rounded-2xl border  border-white/[0.08] bg-[#111827] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/30 hover:bg-[#151d30]">
      <Link to={`/notes/${data._id}`}>
        <div className="flex items-start gap-3">
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

        <p className="mt-5 min-h-12 whitespace-pre-wrap break-words text-sm leading-6 text-slate-400">
          {data.content}
        </p>
      </Link>

      <div className="flex items-center justify-between mt-4 border-t border-white/[0.06] pt-3">
        <div>
          <time dateTime={data.createdAt} className="text-xs text-slate-500">
            {new Date(data.createdAt).toLocaleDateString()}
          </time>
        </div>
        <div>
          <DeleteIcon
            className="cursor-pointer text-red-700/80"
            onClick={() => onDelete(data._id)}
            size={19}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
