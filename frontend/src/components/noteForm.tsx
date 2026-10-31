import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save, X } from "lucide-react";
import { noteSchema, type CreateNoteInput } from "../types/noteSchema";
import updateNote from "../api/updateNote";
import type { NotesType } from "../types/index";
import { FileText, Pencil } from "lucide-react";

type NoteFormValues = {
  title: string;
  content: string;
};

type UpdateNoteFormProps = {
  note: NotesType;
  isEditing: boolean;
  onCancel: () => void;
  onSuccess: () => void;
};

const UpdateNoteForm = ({
  note,
  isEditing,
  onCancel,
  onSuccess,
}: UpdateNoteFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  useEffect(() => {
    reset({
      title: note.title,
      content: note.content,
    });
  }, [note, reset]);

  const mutation = useMutation({
    mutationFn: (values: NoteFormValues) => updateNote(values, note._id),

    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["notes", note._id], updatedNote);
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      reset({
        title: updatedNote.title,
        content: updatedNote.content,
      });

      onSuccess();
    },
  });

  const handleCancel = () => {
    reset({
      title: note.title,
      content: note.content,
    });
    mutation.reset();
    onCancel();
  };

  const updateNoteHandler = (values: CreateNoteInput) => {
    mutation.mutateAsync(values);
  };
  return (
    <form
      onSubmit={handleSubmit(updateNoteHandler)}
      className="w-full max-w-2xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#111827] p-4 min-[400px]:p-6 sm:space-y-6 sm:p-8"
    >
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 sm:mb-5">
          <FileText size={23} />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white min-[400px]:text-2xl">
          {isEditing ? "Edit note" : "Note details"}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {isEditing
            ? "Update your note and save your changes."
            : "View your note. Click edit when you want to make changes."}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-slate-200">
          Title
        </label>

        <input
          id="title"
          {...register("title")}
          placeholder="Give your note a title..."
          maxLength={100}
          disabled={!isEditing || mutation.isPending}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          className="w-full rounded-xl border border-white/10 bg-[#070b1a] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
        />

        {errors.title && (
          <p id="title-error" className="text-sm text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-slate-200">
          Content
        </label>

        <textarea
          id="content"
          {...register("content")}
          placeholder="Write your thoughts here..."
          rows={7}
          maxLength={5000}
          disabled={!isEditing || mutation.isPending}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? "content-error" : undefined}
          className="w-full resize-y rounded-xl border border-white/10 bg-[#070b1a] px-3 py-2.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
        />

        {errors.content && (
          <p id="content-error" className="text-sm text-red-400">
            {errors.content.message}
          </p>
        )}
      </div>

      {mutation.isError && (
        <p role="alert" className="text-sm text-red-400">
          {mutation.error.message}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              disabled={mutation.isPending}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isDirty || mutation.isPending}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={18} />
              {mutation.isPending ? "Updating note..." : "Update note"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              mutation.reset();
              onCancel = onCancel;
            }}
            className="hidden"
          >
            <Pencil size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateNoteForm;
