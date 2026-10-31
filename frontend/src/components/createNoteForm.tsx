import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Plus } from "lucide-react";

import { noteSchema, type CreateNoteInput } from "../types/noteSchema";

interface CreateNoteFormProps {
  onSubmit: (values: CreateNoteInput) => void | Promise<void>;
}

const CreateNoteForm = ({ onSubmit }: CreateNoteFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const title = watch("title");
  const content = watch("content");
  const isFormEmpty = !title?.trim() || !content?.trim();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#111827] p-4 min-[400px]:p-6 sm:space-y-6 sm:p-8"
    >
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 sm:mb-5">
          <FileText size={23} />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white min-[400px]:text-2xl">
          Create a new note
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Capture your thoughts and keep your ideas organized.
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
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
          className="w-full rounded-xl border border-white/10 bg-[#070b1a] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 sm:px-4 sm:py-3"
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
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? "content-error" : undefined}
          className="w-full resize-y rounded-xl border border-white/10 bg-[#070b1a] px-3 py-2.5 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 sm:px-4 sm:py-3"
        />

        {errors.content && (
          <p id="content-error" className="text-sm text-red-400">
            {errors.content.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isFormEmpty}
        className={`inline-flex w-full items-center cursor-pointer justify-center gap-2 rounded-xl ${isSubmitting || isFormEmpty ? "bg-gray-500/30" : "bg-violet-600"} px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed sm:w-auto`}
      >
        <Plus size={18} />
        {isSubmitting ? "Creating note..." : "Create note"}
      </button>
    </form>
  );
};

export default CreateNoteForm;
