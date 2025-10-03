import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { $ as $fetch, B as Button, c as cn } from "./button-Cul2gyf-.js";
import { I as Input } from "./input-DDl6Pfw1.js";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Calendar, T as TanStackTable, e as Textarea } from "./calendar-Dh1ccXnm.js";
import { Trash2, CalendarIcon, Search, Check } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { u as useWorkspace } from "./router-DX4z58n8.js";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import "js-cookie";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-table";
import "@radix-ui/react-select";
import "react-day-picker";
async function getFilesList(url) {
  try {
    const response = await $fetch.get(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function deleteFile(url) {
  try {
    const response = await $fetch.delete(url);
    return response;
  } catch (err) {
    throw err;
  }
}
async function uploadFilesIntoSignedUrl(url, payload) {
  try {
    const response = await $fetch.post(url, payload);
    return response;
  } catch (err) {
    throw err;
  }
}
async function uploadFilesIntoR2(url, payload) {
  try {
    const response = await $fetch.post(url, payload);
    return response;
  } catch (err) {
    throw err;
  }
}
function FilesTableColumns({
  deleteMutation
}) {
  return [
    {
      accessorFn: (row) => row.filename,
      id: "filename",
      header: () => /* @__PURE__ */ jsx("span", { children: "Title" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            fontSize: "13px",
            lineHeight: "20px",
            color: "#111827",
            fontWeight: "400"
          },
          children: info.getValue() ?? "..."
        }
      ),
      size: 200
    },
    {
      accessorFn: (row) => row.file_type,
      id: "file_type",
      header: () => /* @__PURE__ */ jsx("span", { children: "Type" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            fontSize: "11px",
            lineHeight: "16px",
            backgroundColor: "#dbeafe",
            color: "#1e40af",
            padding: "2px 8px",
            borderRadius: "12px",
            fontWeight: "500",
            textTransform: "uppercase"
          },
          children: info.getValue().split("/").pop() ?? "..."
        }
      ),
      size: 120
    },
    {
      accessorFn: (row) => row.file_size,
      id: "file_size",
      header: () => /* @__PURE__ */ jsx("span", { children: "Size" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx(
        "span",
        {
          style: {
            fontSize: "13px",
            lineHeight: "20px",
            color: "#111827",
            fontWeight: "400"
          },
          children: info.getValue() ?? "..."
        }
      ),
      size: 120
    },
    {
      accessorFn: (row) => row.ragStatus,
      id: "ragStatus",
      header: () => /* @__PURE__ */ jsx("span", { children: "RAG Status" }),
      footer: (props) => props.column.id,
      cell: (info) => {
        const status = info.getValue() ?? "UNKNOWN";
        return /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              fontSize: "11px",
              lineHeight: "16px",
              backgroundColor: status === "COMPLETED" ? "#dcfce7" : "#fef3c7",
              color: status === "COMPLETED" ? "#15803d" : "#d97706",
              padding: "2px 8px",
              borderRadius: "12px",
              fontWeight: "500",
              textTransform: "uppercase"
            },
            children: status
          }
        );
      },
      size: 150
    },
    {
      accessorFn: (row) => row.uploadedAt,
      id: "uploadedAt",
      header: () => /* @__PURE__ */ jsx("span", { children: "Uploaded At" }),
      footer: (props) => props.column.id,
      cell: (info) => {
        const value = info.getValue() ?? "";
        if (!value)
          return /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                fontSize: "13px",
                lineHeight: "20px",
                color: "#111827",
                fontWeight: "400"
              },
              children: "..."
            }
          );
        const [year, month, day] = value.split(" ")[0].split("-");
        return /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              fontSize: "13px",
              lineHeight: "20px",
              color: "#111827",
              fontWeight: "400"
            },
            children: `${day}-${month}-${year}`
          }
        );
      },
      size: 150
    },
    {
      accessorFn: (row) => row.id,
      id: "actions",
      header: () => /* @__PURE__ */ jsx("span", { children: "Actions" }),
      footer: (props) => props.column.id,
      cell: (info) => /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: /* @__PURE__ */ jsx(
        Trash2,
        {
          style: {
            width: "16px",
            height: "16px",
            color: "#dc2626",
            cursor: "pointer"
          },
          className: "hover:text-red-700 transition-colors",
          onClick: () => deleteMutation.mutate(info.row.original.id)
        }
      ) }),
      size: 80
    }
  ];
}
function FilesTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [date, setDate] = useState(void 0);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { selectedWorkspace } = useWorkspace();
  const router = useRouter();
  const handleDateSelect = (d) => {
    if (!d) return setDate(void 0);
    setDate(Array.isArray(d) ? d[0] : d);
  };
  const { data, isPending } = useQuery({
    queryKey: ["files-list", page, limit, selectedWorkspace?.id, date, search],
    queryFn: async () => {
      const baseUrl = selectedWorkspace?.id ? `/files/upload/manual?page=${page}&limit=${limit}&user_id=${selectedWorkspace?.id}` : `/files/upload/manual?page=${page}&limit=${limit}`;
      const url = `${baseUrl}${date ? `&date=${format(date, "yyyy-MM-dd")}` : ""}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
      const res = await getFilesList(url);
      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(res?.message || "Files list loading failed...");
      }
      return res;
    },
    refetchOnWindowFocus: false
  });
  const deleteManualFileMutation = useMutation({
    mutationKey: ["file-delete"],
    mutationFn: async (id) => {
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
    }
  });
  router.navigate({
    to: "/mainLayout/files",
    params: { page },
    search: {
      page,
      limit,
      date: date ? format(date, "yyyy-MM-dd") : void 0,
      search
    }
  });
  const FilesData = useMemo(() => {
    if (!data?.data?.records || !Array.isArray(data.data.records)) return [];
    return data.data.records;
  }, [data?.data?.records]);
  const paginationInfo = data?.data?.paginationInfo;
  const columns = useMemo(
    () => FilesTableColumns({ deleteMutation: deleteManualFileMutation }),
    []
  );
  const getData = ({ page: page2, limit: limit2 }) => {
    setPage(page2);
    setLimit(limit2);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between mr-2", children: [
      /* @__PURE__ */ jsx("div", {}),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 md:gap-4 items-center py-1", children: [
        /* @__PURE__ */ jsxs(Select, { children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px] bg-white", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "option1", children: "Option 1" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "option2", children: "Option 2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: `w-[180px] justify-start text-left font-normal ${!date && "text-muted-foreground"} border-1 border-gray-200`,
              children: [
                /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                date ? format(date, "PPP") : "Select Date"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              mode: "single",
              selected: date,
              onSelect: handleDateSelect,
              initialFocus: true
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-[200px]", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              placeholder: "Search",
              className: "pl-8 bg-white",
              value: search,
              onChange: (e) => setSearch(e.target.value)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      TanStackTable,
      {
        data: FilesData,
        columns,
        paginationDetails: paginationInfo || {},
        getData,
        loading: isPending,
        removeSortingForColumnIds: ["actions"],
        heightClass: "h-[calc(100vh-230px)]",
        noDataLabel: "files",
        noDataDescription: "No files available",
        showNoDataIcon: true
      }
    ) })
  ] });
}
function CircleProgress({ progress }) {
  const radius = 12;
  const stroke = 2.5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress / 100 * circumference;
  return /* @__PURE__ */ jsxs("div", { className: "relative w-8 h-8 flex items-center justify-center", children: [
    progress < 100 ? /* @__PURE__ */ jsxs(
      "svg",
      {
        className: "w-6 h-6 rotate-[-90deg]",
        viewBox: "0 0 32 32",
        fill: "none",
        children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "16",
              cy: "16",
              r: radius,
              stroke: "#e5e7eb",
              strokeWidth: stroke
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "16",
              cy: "16",
              r: radius,
              stroke: "#3b82f6",
              strokeWidth: stroke,
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              strokeLinecap: "round"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-green-500 flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { size: 12, strokeWidth: 3, className: "text-white" }) }),
    progress < 100 && /* @__PURE__ */ jsxs("span", { className: "absolute text-[10px] text-blue-600 font-medium", children: [
      progress,
      "%"
    ] })
  ] });
}
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-gray-200 dark:bg-gray-800" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
function UploadFilesComponent() {
  const [files, setFiles] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [fileSizeError, setFileSizeError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const uploadingFilesExtension = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "text/html",
    "text/plain"
  ];
  const fileSize = 4 * 1024 * 1024;
  const queryClient = useQueryClient();
  const uploadFiles = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: async (payload) => {
      const res = await uploadFilesIntoR2("/files/upload", payload);
      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(`file ${payload.file_name} failed to upload in s3`);
      }
    }
  });
  const uploadSignedUrl = useMutation({
    mutationKey: ["signed-url-upload"],
    mutationFn: async (payload) => {
      const res = await uploadFilesIntoSignedUrl(
        "/files/upload-files/manual",
        payload
      );
      if (res?.status === 200 || res?.status === 201) {
        payload.files.forEach(
          (f) => updateProgress(f.file_name, 100, "uploaded")
        );
        queryClient.invalidateQueries({ queryKey: ["files-list"] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
        toast.success("All files uploaded successfully");
        setFiles([]);
        setUploadedFiles([]);
      } else {
        toast.error(res?.message || "File upload failed");
      }
    }
  });
  const uploadWithProgress = (url, file, onProgress) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      onProgress(Math.round(e.loaded / e.total * 100));
    };
    xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed with status ${xhr.status}`));
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });
  const updateProgress = (fileName, p, status) => {
    setProgressList(
      (prev) => prev.map(
        (f) => f.name === fileName ? { ...f, progress: p, status: status || f.status } : f
      ).concat(
        prev.some((f) => f.name === fileName) ? [] : [{ name: fileName, progress: p, status: status || "pending" }]
      )
    );
  };
  async function handleUpload(newFiles) {
    try {
      await Promise.all(
        newFiles.map(async (file) => {
          try {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            const responseData = await uploadFiles.mutateAsync({
              file_type: file.name.split(".").pop() || "",
              file_name: file.name,
              file_size: `${file.size}`
            });
            updateProgress(file.name, 0, "saved");
            const targetUrl = responseData.data.target_url;
            await uploadWithProgress(
              targetUrl,
              file,
              (p) => updateProgress(file.name, p, "uploading")
            );
            const newFile = {
              file_key: responseData.data.file_key,
              file_name: file.name,
              file_size: `${sizeInMB}MB`,
              file_type: file.type
            };
            setUploadedFiles((prev) => [...prev, newFile]);
          } catch (err) {
            toast.error(`Error uploading file ${file.name}: ${err.message}`);
            updateProgress(file.name, 0, "failed");
          }
        })
      );
    } catch (err) {
      console.error("Error while uploading", err);
    }
  }
  async function handleUploadFileIntoR2() {
    if (uploadedFiles.length > 0) {
      await uploadSignedUrl.mutateAsync({ files: uploadedFiles });
    }
  }
  function handleFilesOnChange(value) {
    const fileArr = Array.from(value);
    if (!fileArr.length) return;
    const validFiles = [];
    for (let i = 0; i < fileArr.length; i++) {
      const mimeType = fileArr[i].type;
      if (uploadingFilesExtension.includes(mimeType) && fileArr[i].size < fileSize) {
        validFiles.push(fileArr[i]);
      } else {
        if (fileArr[i].size > fileSize) {
          setFileSizeError(`File exceeded the size limit: ${fileArr[i].name}`);
        }
      }
    }
    if (validFiles.length > 0) {
      setFileSizeError("");
      setFiles((prev) => [...prev, ...validFiles]);
    }
  }
  useEffect(() => {
    if (files.length > 0) {
      const notUploaded = files.filter(
        (f) => !progressList.find((p) => p.name === f.name)
      );
      if (notUploaded.length > 0) {
        handleUpload(notUploaded);
      }
    }
  }, [files]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-[10px] h-[calc(100vh-140px)] overflow-hidden scrollbar-hide", children: [
    /* @__PURE__ */ jsx(ScrollArea, { className: "max-h-[calc(100vh-150px)] overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-50 w-[380px] border border-gray-200 ml-2 rounded-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 ml-2 mr-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mt-2 justify-center gap-3 border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg w-[360px] h-32 text-center p-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm", children: "Drop files or click to browse" }),
        /* @__PURE__ */ jsx("button", { className: "border-blue-400 border bg-blue-50 text-blue-500 font-medium rounded-md mt-1 px-4 py-1 hover:cursor-pointer", children: /* @__PURE__ */ jsxs(
          Label,
          {
            htmlFor: "choose-files",
            className: "cursor-pointer flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "choose-files",
                  type: "file",
                  className: "hidden",
                  onChange: (e) => handleFilesOnChange(e.target.files ?? []),
                  multiple: true
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Choose Files" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "PDF, TXT, HTML, JPEG, PNG supported (max 4MB)" })
      ] }),
      fileSizeError && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: fileSizeError }),
      files.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mr-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm ml-2 font-semibold text-gray-800", children: "Files Results" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setFiles([]);
                setProgressList([]);
                setUploadedFiles([]);
              },
              children: "Clear"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ScrollArea, { className: "max-h-36 overflow-y-auto", children: /* @__PURE__ */ jsx("ul", { className: "space-y-1 mt-2", children: files.map((file, index) => {
          const progress = progressList.find(
            (p) => p.name === file.name
          );
          return /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex justify-between rounded-lg bg-white p-3 shadow-sm hover:bg-gray-50",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-800", children: file.name }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                    (file.size / (1024 * 1024)).toFixed(2),
                    "MB"
                  ] })
                ] }),
                progress && /* @__PURE__ */ jsx(CircleProgress, { progress: progress?.progress })
              ]
            },
            index
          );
        }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-lg space-y-2 w-full max-w-md mt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm text-gray-700", children: "Tags" }),
            /* @__PURE__ */ jsx(Input, { placeholder: "Enter Tags", className: "text-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm text-gray-700", children: "Category" }),
            /* @__PURE__ */ jsx(Input, { placeholder: "Enter Category", className: "text-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
            /* @__PURE__ */ jsx(Label, { className: "text-sm text-gray-700", children: "Context" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Enter Context",
                className: "text-sm h-10 resize-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full bg-blue-500 text-sm hover:bg-blue-500",
            disabled: uploadSignedUrl.isPending,
            onClick: () => {
              handleUploadFileIntoR2();
            },
            children: uploadSignedUrl.isPending ? "Submitting..." : "Submit"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 border border-gray-200 rounded-md shadow-sm flex-1 overflow-x-auto mr-2", children: /* @__PURE__ */ jsx(FilesTable, {}) })
  ] });
}
function RouteComponent() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(UploadFilesComponent, {}) });
}
export {
  RouteComponent as component
};
