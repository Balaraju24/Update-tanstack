import { useQuery, useMutation } from "@tanstack/react-query";
import { getFilesList, deleteFile } from "@/http/services/files";
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
import { useQueryClient } from "@tanstack/react-query";
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
import FilesTableColumns from "./FileTableColumns";

type FilesTable = {
  id: number;
  filename: string;
  file_type: string;
  file_size: string;
  uploadedAt: string;
  ragStatus: string;
};

type PaginationInfo = {
  total_records: number;
  total_pages: number;
  limit: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
};

export default function FilesTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { selectedWorkspace } = useWorkspace();
  const router = useRouter();

  const handleDateSelect = (d: Date | Date[] | undefined) => {
    if (!d) return setDate(undefined);
    setDate(Array.isArray(d) ? d[0] : d);
  };

  const { data, isPending } = useQuery({
    queryKey: ["files-list", page, limit, selectedWorkspace?.id, date, search],
    queryFn: async () => {
      const baseUrl = selectedWorkspace?.id
        ? `/files/upload/manual?page=${page}&limit=${limit}&user_id=${selectedWorkspace?.id}`
        : `/files/upload/manual?page=${page}&limit=${limit}`;
      const url = `${baseUrl}${date ? `&date=${formatDate(date, "yyyy-MM-dd")}` : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
      const res = await getFilesList(url);
      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(res?.message || "Files list loading failed...");
      }
      return res;
    },
    refetchOnWindowFocus: false,
  });

  const deleteManualFileMutation = useMutation({
    mutationKey: ["file-delete"],
    mutationFn: async (id: number) => {
      const res = await deleteFile(`/files/upload/manual/${id}`);
      return res;
    },
    onSuccess: () => {
      toast.success("File deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["files-list"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete file: ${error?.message}`);
    },
  });

  router.navigate({
    to: "/mainLayout/files",
    params: { page },
    search: {
      page,
      limit,
      date: date ? formatDate(date, "yyyy-MM-dd") : undefined,
      search,
    },
  });

  const FilesData: FilesTable[] = useMemo(() => {
    if (!data?.data?.records || !Array.isArray(data.data.records)) return [];
    return data.data.records as FilesTable[];
  }, [data?.data?.records]);

  const paginationInfo: PaginationInfo | undefined = data?.data?.paginationInfo;

  const columns = useMemo(
    () => FilesTableColumns({ deleteMutation: deleteManualFileMutation }),
    []
  );

  const getData = ({ page, limit }: { page: number; limit: number }) => {
    setPage(page);
    setLimit(limit);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between mr-2">
        <div></div>
        <div className="flex flex-wrap gap-2 md:gap-4 items-center py-1">
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
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <TanStackTable
          data={FilesData}
          columns={columns}
          paginationDetails={paginationInfo || {}}
          getData={getData}
          loading={isPending}
          removeSortingForColumnIds={["actions"]}
          heightClass="h-[calc(100vh-230px)]"
          noDataLabel="files"
          noDataDescription="No files available"
          showNoDataIcon={true}
        />
      </div>
    </>
  );
}
