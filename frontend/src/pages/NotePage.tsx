import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Pencil } from "lucide-react";
import Loading from "../components/loading";
import Error from "../components/error";
import NoteForm from "../components/noteForm";
import getNote from "../api/note";
import type { NotesType } from "../types/index";

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: note,
    isPending,
    isError,
    error,
  } = useQuery<NotesType>({
    queryKey: ["notes", id],
    queryFn: () => getNote(id!),
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Error message="Invalid Id" />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Error message={error.message} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-3 py-6 min-[360px]:px-4 sm:py-12">
      <div className="mx-auto mb-5 flex w-full max-w-2xl items-center justify-between gap-3 sm:mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 sm:px-4"
          >
            <Pencil size={16} />
            Edit note
          </button>
        )}
      </div>

      <div className="flex w-full min-w-0 justify-center">
        <NoteForm
          note={note}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      </div>
    </div>
  );
}
