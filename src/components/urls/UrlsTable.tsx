import { useQuery, useMutation } from "@tanstack/react-query";
import { getScrapedFilesTable, ragSync } from "@/http/services/ragServices";
import { useMemo, useState } from "react";
import TanStackTable from "@/components/core/TanstackTable";
import { CalendarIcon, Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadIntoRag } from "@/http/services/ragServices";
import { deleteScrapedFileFromTable } from "@/http/services/ragServices";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format as formatDate } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/context/WorkspaceContext";
import ScrapeFilesColumns from "./ScrapeFilesColumns";
import { useQueryClient } from "@tanstack/react-query";

type ScrapeFile = {
  id: number;
  web_id: string;
  web_url: string;
  pageTitle: string;
  filename: string;
  uploadedAt: string;
  ragStatus: string;
  scrape_status: string;
};

type PaginationInfo = {
  total_records: number;
  total_pages: number;
  limit: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
};

export default function UrlsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { selectedWorkspace } = useWorkspace();
  const handleDateSelect = (d: Date | Date[] | undefined) => {
    if (!d) return setDate(undefined);
    setDate(Array.isArray(d) ? d[0] : d);
  };
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["scraped-files-list", page, limit, selectedWorkspace?.id],
    queryFn: async () => {
      const res = selectedWorkspace?.id
        ? await getScrapedFilesTable(
            `/files/upload/scraped?page=${page}&limit=${limit}&user_id=${selectedWorkspace?.id}`
          )
        : await getScrapedFilesTable(
            `/files/upload/scraped?page=${page}&limit=${limit}`
          );

      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(
          res?.message || "Something went wrong while fetching files..."
        );
      }
      return res;
    },
    refetchOnWindowFocus: false,
  });


    const uploadScrapedLinksIntoRagMutation = useMutation({
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
        queryClient.invalidateQueries({ queryKey: ["scraped-files-list"] });
        toast.success("Selected links uploaded successfully!");
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to upload links");
      },
    });

  const deleteScrapedFilesMutation = useMutation({
    mutationKey: ["scraped-file-delete"],
    mutationFn: async (id: number) => {
      const res = await deleteScrapedFileFromTable(
        `/files/upload/scraped/${id}`
      );
      return res;
    },
    onSuccess: () => {
      toast.success("file is deleted...");
    },
    onError: (error) => {
      toast.error(error?.message || `file deletion error...`);
    },
  });

  router.navigate({
    to: "/mainLayout/urls",
    params: { page: page },
    search: { page: page, limit: limit },
  });

  const FilesData: ScrapeFile[] = useMemo(() => {
    if (!data?.data?.records) return [];
    if (!Array.isArray(data.data.records)) return [];
    return data.data.records as ScrapeFile[];
  }, [data?.data?.records]);

  const paginationInfo: PaginationInfo | undefined = data?.data?.paginationInfo;

  const columns = useMemo(
    () => ScrapeFilesColumns({ deleteMutation: deleteScrapedFilesMutation, retryMutation: uploadScrapedLinksIntoRagMutation }),

    []
  );

  const getData = ({ page, limit }: { page: number; limit: number }) => {
    setPage(page);
    setLimit(limit);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between  mr-2">
        <div></div>
        <div className="flex flex-wrap gap-2 md:gap-4 items-center pb-1">
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[180px] justify-start text-left font-normal ${!date && "text-muted-foreground"} border-1 border-gray-200`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? formatDate(date, "PPP") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search" className="pl-8 bg-white" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden ">
        <TanStackTable
          data={FilesData}
          columns={columns}
          paginationDetails={paginationInfo || {}}
          getData={getData}
          loading={isPending}
          removeSortingForColumnIds={["serial", "actions"]}
          heightClass="h-[calc(100vh-238px)]"
          noDataLabel="files"
          noDataDescription="No files available"
          showNoDataIcon={true}
        />
      </div>
    </>
  );
}
