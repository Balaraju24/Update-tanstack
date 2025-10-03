import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import FilesIcon from "@/icons/files-icon";
import { useState, useEffect } from "react";
import { FileProgress } from "@/lib/interfaces/fileInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadFilesIntoR2,
  uploadFilesIntoSignedUrl,
} from "@/http/services/files";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import FilesTable from "./FilesTable";
import { CircleProgress } from "@/icons/upload-circle-animation";
import { ScrollArea } from "../ui/scroll-area";

export default function UploadFilesComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [progressList, setProgressList] = useState<FileProgress[]>([]);
  const [fileSizeError, setFileSizeError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    {
      file_name: string;
      file_size: string;
      file_type: string;
      file_key: string;
    }[]
  >([]);

  const uploadingFilesExtension = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "text/html",
    "text/plain",
  ];
  const fileSize = 4 * 1024 * 1024; // 4MB
  const queryClient = useQueryClient();

  // upload file (step 1)
  const uploadFiles = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: async (payload: {
      file_type: string;
      file_name: string;
      file_size: string;
    }) => {
      const res = await uploadFilesIntoR2("/files/upload", payload);
      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(`file ${payload.file_name} failed to upload in s3`);
      }
    },
  });

  // signed Url upload (step 3)
  const uploadSignedUrl = useMutation({
    mutationKey: ["signed-url-upload"],
    mutationFn: async (payload: { files: typeof uploadedFiles }) => {
      const res = await uploadFilesIntoSignedUrl(
        "/files/upload-files/manual",
        payload
      );
      if (res?.status === 200 || res?.status === 201) {
        payload.files.forEach((f) =>
          updateProgress(f.file_name, 100, "uploaded")
        );
        queryClient.invalidateQueries({ queryKey: ["files-list"] });
        queryClient.invalidateQueries({ queryKey: ["stats"] });
        toast.success("All files uploaded successfully");
        setFiles([]);
        setUploadedFiles([]);
      } else {
        toast.error(res?.message || "File upload failed");
      }
    },
  });

  // upload with progress
  const uploadWithProgress = (
    url: string,
    file: File,
    onProgress: (p: number) => void
  ) =>
    new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;
        onProgress(Math.round((e.loaded / e.total) * 100));
      };

      xhr.onload = () =>
        xhr.status >= 200 && xhr.status < 300
          ? resolve()
          : reject(new Error(`Upload failed with status ${xhr.status}`));
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(file);
    });

  // update progress + status
  const updateProgress = (
    fileName: string,
    p: number,
    status?: FileProgress["status"]
  ) => {
    setProgressList((prev) =>
      prev
        .map((f) =>
          f.name === fileName
            ? { ...f, progress: p, status: status || f.status }
            : f
        )
        .concat(
          prev.some((f) => f.name === fileName)
            ? []
            : [{ name: fileName, progress: p, status: status || "pending" }]
        )
    );
  };

  // main upload handler
  async function handleUpload(newFiles: File[]) {
    try {
      await Promise.all(
        newFiles.map(async (file) => {
          try {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            const responseData = await uploadFiles.mutateAsync({
              file_type: file.name.split(".").pop() || "",
              file_name: file.name,
              file_size: `${file.size}`,
            });

            updateProgress(file.name, 0, "saved");
            const targetUrl = responseData.data.target_url;

            await uploadWithProgress(targetUrl, file, (p) =>
              updateProgress(file.name, p, "uploading")
            );

            const newFile = {
              file_key: responseData.data.file_key,
              file_name: file.name,
              file_size: `${sizeInMB}MB`,
              file_type: file.type,
            };
            setUploadedFiles((prev) => [...prev, newFile]);
          } catch (err: any) {
            toast.error(`Error uploading file ${file.name}: ${err.message}`);
            updateProgress(file.name, 0, "failed");
          }
        })
      );
    } catch (err) {
      console.error("Error while uploading", err);
    }
  }

  // upload files into r2
  async function handleUploadFileIntoR2() {
    if (uploadedFiles.length > 0) {
      await uploadSignedUrl.mutateAsync({ files: uploadedFiles });
    }
  }

  // handle file selection
  function handleFilesOnChange(value: File[] | FileList) {
    const fileArr: File[] = Array.from(value);
    if (!fileArr.length) return;

    const validFiles: File[] = [];

    for (let i = 0; i < fileArr.length; i++) {
      const mimeType = fileArr[i].type;
      if (
        uploadingFilesExtension.includes(mimeType) &&
        fileArr[i].size < fileSize
      ) {
        validFiles.push(fileArr[i]);
      } else {
        if (fileArr[i].size > fileSize) {
          setFileSizeError(`File exceeded the size limit: ${fileArr[i].name}`);
        }
      }
    }

    if (validFiles.length > 0) {
      setFileSizeError(""); // clear old errors
      setFiles((prev) => [...prev, ...validFiles]);
    }
  }

  // auto-upload whenever files added
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

  return (
    <div className="flex gap-[10px] h-[calc(100vh-140px)] overflow-hidden scrollbar-hide">
      {/* Left panel */}
      <ScrollArea className="max-h-[calc(100vh-150px)] overflow-y-auto">
        <div className="bg-blue-50 w-[380px] border border-gray-200 ml-2 rounded-sm">
          <div className="flex flex-col gap-4 ml-2 mr-2">
            {/* Drop Zone */}
            <div className="flex flex-col items-center mt-2 justify-center gap-3 border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg w-[360px] h-32 text-center p-2">
              <p className="text-gray-700 text-sm">
                Drop files or click to browse
              </p>
              <button className="border-blue-400 border bg-blue-50 text-blue-500 font-medium rounded-md mt-1 px-4 py-1 hover:cursor-pointer">
                <Label
                  htmlFor="choose-files"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Input
                    id="choose-files"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFilesOnChange(e.target.files ?? [])}
                    multiple
                  />
                  <span className="text-xs">Choose Files</span>
                </Label>
              </button>
              <p className="text-xs text-gray-500">
                PDF, TXT, HTML, JPEG, PNG supported (max 4MB)
              </p>
            </div>
            {fileSizeError && (
              <p className="text-xs text-red-500 mt-1">{fileSizeError}</p>
            )}

            {/* Files List */}
            {files.length > 0 && (
              <div>
                <div className="flex justify-between items-center mr-2">
                  <p className="text-sm ml-2 font-semibold text-gray-800">
                    Files Results
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFiles([]);
                      setProgressList([]);
                      setUploadedFiles([]);
                    }}
                  >
                    Clear
                  </Button>
                </div>

                <ScrollArea className="max-h-36 overflow-y-auto">
                  <ul className="space-y-1 mt-2">
                    {files.map((file, index) => {
                      const progress = progressList.find(
                        (p) => p.name === file.name
                      );
                      return (
                        <li
                          key={index}
                          className="flex justify-between rounded-lg bg-white p-3 shadow-sm hover:bg-gray-50"
                        >
                          <div className="flex gap-2">
                            <span className="text-xs text-gray-800">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)}MB
                            </span>
                          </div>
                          {progress && (
                            <CircleProgress progress={progress?.progress} />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>

                {/* Metadata Form */}
                <div className="bg-blue-50 rounded-lg space-y-2 w-full max-w-md mt-2">
                  <div className="flex flex-col space-y-1">
                    <Label className="text-sm text-gray-700">Tags</Label>
                    <Input placeholder="Enter Tags" className="text-sm" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Label className="text-sm text-gray-700">Category</Label>
                    <Input placeholder="Enter Category" className="text-sm" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Label className="text-sm text-gray-700">Context</Label>
                    <Textarea
                      placeholder="Enter Context"
                      className="text-sm h-10 resize-none"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-500 text-sm hover:bg-blue-500"
                  disabled={uploadSignedUrl.isPending}
                  onClick={() => {
                    handleUploadFileIntoR2();
                  }}
                >
                  {uploadSignedUrl.isPending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Right panel */}
      <div className="bg-gray-50 border border-gray-200 rounded-md shadow-sm flex-1 overflow-x-auto mr-2">
        <FilesTable />
      </div>
    </div>
  );
}
