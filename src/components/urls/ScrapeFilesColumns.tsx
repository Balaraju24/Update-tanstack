import { Trash2 } from "lucide-react";
import RetryIcon from "@/icons/retry-icon";
import { Button } from "../ui/button";

interface UrlPayload {
  id: number;
  base_url: string;
  web_id: string;
  page_title: string;
}

interface RetryPayload {
  urls: UrlPayload[];    
  tags: string[];
  category: string;
  context: string;
}

interface DeleteMutation {
  mutate: (id: number) => void;
}

interface RetryMutation {
  mutate: (payload: RetryPayload) => void;
}

interface ScrapeFilesColumnsProps {
  deleteMutation: DeleteMutation;
  retryMutation: RetryMutation;
}

export default function ScrapeFilesColumns({
  deleteMutation,
  retryMutation,
}: ScrapeFilesColumnsProps) {
  const handleRetry = (info: any) => {
    const payload: RetryPayload = {
      urls: [
        {
          id: info.id,
          base_url: info.web_url,
          web_id: info.web_id,
          page_title: info.pageTitle,
        },
      ],       
      tags: [],
      category: "demo",
      context: "",
    };

    retryMutation.mutate(payload);
  };

  return [
    {
      accessorFn: (row: any) => row.web_id,
      id: "web_id",
      header: () => <span>Website Id</span>,
      footer: (props: any) => props.column.id,
      cell: (info: any) => (
        <span className="text-gray-500 text-sm">{info.getValue()}</span>
      ),
      minWidth: 100,
      maxWidth: 150,
    },
    {
      accessorFn: (row: any) => row.web_url,
      id: "web_url",
      header: () => <span>URL</span>,
      footer: (props: any) => props.column.id,
      cell: (info: any) => (
        <div className="truncate" title={info.getValue()} style={{ maxWidth: 260 }}>
          <a
            href={info.getValue()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            {info.getValue()}
          </a>
        </div>
      ),
      minWidth: 100,
      maxWidth: 200,
    },
    {
      accessorFn: (row: any) => row.pageTitle,
      id: "pageTitle",
      header: () => <span>Page Title</span>,
      footer: (props: any) => props.column.id,
      cell: (info: any) => (
        <span className="text-gray-700 text-sm hover:underline">{info.getValue()}</span>
      ),
      minWidth: 60,
      maxWidth: 100,
    },
    {
      accessorFn: (row: any) => row.scrape_status,
      id: "scrape_status",
      header: () => <span>Scrape Status</span>,
      footer: (props: any) => props.column.id,
      cell: (info: any) => {
        const status = info.getValue();
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-md ${
              status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        );
      },
      minWidth: 180,
      maxWidth: 180,
    },
    {
      accessorFn: (row: any) => row.ragStatus,
      id: "rag_status",
      header: () => <span>Rag Status</span>,
      footer: (props: any) => props.column.id,
      cell: (info: any) => {
        const status = info.getValue();
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-md ${
              status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        );
      },
      minWidth: 180,
      maxWidth: 180,
    },
    {
      accessorFn: (row: any) => row.id,
      id: "actions",
      header: () => <span>ACTIONS</span>,
      footer: (props: any) => props.column.id,
      cell: (info: any) => {
        const rowData = info.row.original;
        return (
          <div className="flex gap-1 items-center justify-center">
            {rowData.scrape_status === "FAILED" && (
              <Button
                onClick={() => handleRetry(rowData)}
                className="bg-white hover:bg-white text-black"
              >
                <RetryIcon />
              </Button>
            )}

            <Trash2
              className="hover:text-red-700 transition-colors cursor-pointer"
              style={{ width: 16, height: 16, color: "#dc2626" }}
              onClick={() => deleteMutation.mutate(rowData.id)}
            />
          </div>
        );
      },
      minWidth: 80,
      maxWidth: 100,
    },
  ];
}
