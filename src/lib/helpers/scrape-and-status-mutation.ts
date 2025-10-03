// scrape-and-status-mutation.ts
import { uploadIntoRag } from "@/http/services/ragServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadScrapedLinksIntoRag() {
  const queryClient = useQueryClient();

  const mutateData = useMutation({
    mutationKey: ["upload-scrape-files-into-rag"],
    mutationFn: async (payload: {
      urls: any[];
      tags: string[];
      category: string;
      context: string;
    }) => {
      const res = await uploadIntoRag("/scrape/scrape-and-save", payload);
      return res;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["scraped-files-list"] });
      toast.success("Selected links uploaded successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to upload links");
    },
  });
  return {mutateData}
}
