import NoteCard from "../components/noteCard";
import Loading from "../components/loading";
import Error from "../components/error";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notes";
import { FileText } from "lucide-react";
import deleteNote from "../api/deleteNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const HomePage = () => {
  const {
    data: notes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["Notes"],
    queryFn: getNotes,
  });

  const queryClient = useQueryClient();
  const {
    mutateAsync,
    isPending: mutationIsPending,
    isError: mutationIsError,
  } = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Notes"],
      });
      toast.success("Note deleted");
    },
  });

  const deleteNoteHandler = async (id: string) => {
    await mutateAsync(id);
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-3 py-8 min-[360px]:px-4 sm:px-8 sm:py-10">
      <header className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-sm font-medium text-violet-400">
          <FileText size={16} />
          <span>Your workspace</span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white min-[400px]:text-3xl sm:text-4xl">
          My Notes
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Your thoughts, ideas, and everything worth remembering.
        </p>
      </header>

      {isPending || mutationIsPending ? (
        <Loading />
      ) : isError || mutationIsError ? (
        <Error message="Could not fetch notes" />
      ) : notes.length === 0 ? (
        <div className="mx-auto flex min-h-48 w-full max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#111827]/60 px-4 py-8 text-center sm:px-6">
          <FileText size={26} className="text-slate-500" />
          <h2 className="mt-4 font-semibold text-slate-200">No notes yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Create your first note to get started.
          </p>
        </div>
      ) : (
        <section
          aria-label="Your notes"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
        >
          {notes?.map((note) => (
            <NoteCard key={note._id} data={note} onDelete={deleteNoteHandler} />
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
