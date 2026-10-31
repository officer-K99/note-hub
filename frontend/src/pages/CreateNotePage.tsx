import CreateNoteForm from "../components/createNoteForm";
import type { CreateNoteInput } from "../types/noteSchema";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import createNote from "../api/createNote";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const CreateNotePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Notes"],
      });
      toast.success("Note Created");
      navigate("/");
    },
  });

  const handleCreateNote = async (values: CreateNoteInput) => {
    await createNoteMutation.mutateAsync(values);
  };

  return (
    <div className="mx-auto flex max-w-7xl justify-center">
      <CreateNoteForm onSubmit={handleCreateNote} />
    </div>
  );
};

export default CreateNotePage;
