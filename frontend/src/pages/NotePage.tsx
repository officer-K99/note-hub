import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Pencil } from "lucide-react";

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
    refetch,
  } = useQuery<NotesType>({
    queryKey: ["notes", id],
    queryFn: () => getNote(id!),
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-12">
        <p className="text-center text-red-400">Invalid note ID.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
        <p className="text-lg font-medium text-slate-400">Loading note...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-center text-red-400">
          {error.message || "Failed to load note."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="cursor-pointer rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mx-auto mb-6 flex w-full max-w-2xl items-center justify-between">
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
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <Pencil size={16} />
            Edit note
          </button>
        )}
      </div>

      <div className="flex justify-center">
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
