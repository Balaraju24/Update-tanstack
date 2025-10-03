import { Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

interface DeleteMutation {
  mutate: (id: number) => void;
}

type FilesTable = {
  id: number;
  filename: string;
  file_type: string;
  file_size: string;
  uploadedAt: string;
  ragStatus: string;
};

export default function FilesTableColumns({
  deleteMutation,
}: {
  deleteMutation: DeleteMutation;
}): ColumnDef<FilesTable>[] {
  return [
    {
      accessorFn: (row) => row.filename,
      id: "filename",
      header: () => <span>Title</span>,
      footer: (props) => props.column.id,
      cell: (info) => (
        <span
          style={{
            fontSize: "13px",
            lineHeight: "20px",
            color: "#111827",
            fontWeight: "400",
          }}
        >
          {(info.getValue() as string) ?? "..."}
        </span>
      ),
      size: 200, 
    },
    {
      accessorFn: (row) => row.file_type,
      id: "file_type",
      header: () => <span>Type</span>,
      footer: (props) => props.column.id,
      cell: (info) => (
        <span
          style={{
            fontSize: "11px",
            lineHeight: "16px",
            backgroundColor: "#dbeafe",
            color: "#1e40af",
            padding: "2px 8px",
            borderRadius: "12px",
            fontWeight: "500",
            textTransform: "uppercase",
          }}
        >
          {(info.getValue() as string).split("/").pop() ?? "..."}
        </span>
      ),
      size: 120,
    },
    {
      accessorFn: (row) => row.file_size,
      id: "file_size",
      header: () => <span>Size</span>,
      footer: (props) => props.column.id,
      cell: (info) => (
        <span
          style={{
            fontSize: "13px",
            lineHeight: "20px",
            color: "#111827",
            fontWeight: "400",
          }}
        >
          {(info.getValue() as string) ?? "..."}
        </span>
      ),
      size: 120,
    },
    {
      accessorFn: (row) => row.ragStatus,
      id: "ragStatus",
      header: () => <span>RAG Status</span>,
      footer: (props) => props.column.id,
      cell: (info) => {
        const status = (info.getValue() as string) ?? "UNKNOWN";
        return (
          <span
            style={{
              fontSize: "11px",
              lineHeight: "16px",
              backgroundColor: status === "COMPLETED" ? "#dcfce7" : "#fef3c7",
              color: status === "COMPLETED" ? "#15803d" : "#d97706",
              padding: "2px 8px",
              borderRadius: "12px",
              fontWeight: "500",
              textTransform: "uppercase",
            }}
          >
            {status}
          </span>
        );
      },
      size: 150,
    },
    {
      accessorFn: (row) => row.uploadedAt,
      id: "uploadedAt",
      header: () => <span>Uploaded At</span>,
      footer: (props) => props.column.id,
      cell: (info) => {
        const value = (info.getValue() as string) ?? "";
        if (!value)
          return (
            <span
              style={{
                fontSize: "13px",
                lineHeight: "20px",
                color: "#111827",
                fontWeight: "400",
              }}
            >
              ...
            </span>
          );
        const [year, month, day] = value.split(" ")[0].split("-");
        return (
          <span
            style={{
              fontSize: "13px",
              lineHeight: "20px",
              color: "#111827",
              fontWeight: "400",
            }}
          >
            {`${day}-${month}-${year}`}
          </span>
        );
      },
      size: 150,
    },
    {
      accessorFn: (row) => row.id,
      id: "actions",
      header: () => <span>Actions</span>,
      footer: (props) => props.column.id,
      cell: (info) => (
        <div className="flex gap-1">
          <Trash2
            style={{
              width: "16px",
              height: "16px",
              color: "#dc2626",
              cursor: "pointer",
            }}
            className="hover:text-red-700 transition-colors"
            onClick={() => deleteMutation.mutate(info.row.original.id)}
          />
        </div>
      ),
      size: 80,
    },
  ];
}
