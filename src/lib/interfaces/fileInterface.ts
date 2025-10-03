export type FileProgress = {
  name: string;
  progress: number;
  status: "pending" | "saved" | "uploading" | "uploaded" | "failed";
};

export type FilesTable = {
  id: number;
  filename: string;
  file_type: string;
  file_size: string;
  uploadedAt: string;
  ragStatus: string;
};

export type PaginationInfo = {
  total_records: number;
  total_pages: number;
  limit: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
};
