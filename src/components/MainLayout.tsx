import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import RagFiles from "./RagFiles";
import { Button } from "./ui/button";
import { ragStats, ragSync } from "@/http/services/ragServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import FilesIcon from "@/icons/files-icon";
import DeleteIcon from "@/icons/delete-icon";
import UrlsIcon from "@/icons/UrlsIcon";
import RagReadyIcon from "@/icons/rag-ready-icon";
import { LinkIcon } from "@/icons/link-icon";
import { UploadIcon } from "@/icons/upload-icon";
import { useEffect, useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { SyncIcon } from "@/icons/sync-icon";
import Cookies from "js-cookie";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedWorkspace } = useWorkspace();
  const [urlsButtonState, setUrlsButtonState] = useState(true);
  const [filesButtonState, setFilesButtonState] = useState(false);
  const user = JSON.parse(Cookies.get("user_details") || "");


  // Set default route to /mainLayout/urls on mount
  useEffect(() => {
    if (location.pathname === "/mainLayout") {
      navigate({ to: "/mainLayout/urls" });
    }
  }, []);

  // Update active button based on current path
  useEffect(() => {
    if (location.pathname.includes("/urls")) {
      setUrlsButtonState(true);
      setFilesButtonState(false);
    } else if (location.pathname.includes("/files")) {
      setUrlsButtonState(false);
      setFilesButtonState(true);
    }
  }, [location.pathname]);

  // Query stats
  const { data, isPending, isError } = useQuery({
    queryKey: ["stats", selectedWorkspace?.id],
    queryFn: async () => {
      if (user.user_type === "ADMIN" && selectedWorkspace?.id === undefined) {
        const res = await ragStats(`/files/stats`);
        if (res?.status === 200 || res?.status === 201) return res.data;
      } else if (
        selectedWorkspace?.user_type === "CUSTOMER" &&
        user.user_type === "ADMIN" &&
        selectedWorkspace?.id
      ) {
        const res = await ragStats(
          `/files/stats?user_id=${selectedWorkspace?.id}`
        );
        if (res?.status === 200 || res?.status === 201) return res.data;
      } else {
        const res = await ragStats(`/files/stats`);
        if (res?.status === 200 || res?.status === 201) return res.data;
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isError) toast.error(data?.data?.message || "Failed to fetch stats");

  // Sync mutation
  const ragSyncFiles = useMutation({
    mutationKey: ["rag-scrape-sync"],
    mutationFn: async () => await ragSync("/files/rag-sync"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scraped-files-list"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success(
        "Sync triggered successfully - check back soon for updates."
      );
    },
    onError: (error: any) => toast.error(error?.message || "failed to sync"),
  });

  const handleRagSync = () => {
    ragSyncFiles.mutateAsync();
  };

  return (
    <>
      <RagFiles />
      <div className="flex flex-col h-full-screen bg-white mt-2 mx-2 rounded-lg shadow-sm">
        <div className="flex items-center w-full mt-3 px-2">
          <div className="flex flex-row flex-wrap gap-2 w-full">
            <Button
              className={`text-xs w-20 h-7 flex items-center justify-center ${
                urlsButtonState
                  ? "bg-green-600 text-white shadow-sm hover:bg-green-600"
                  : "bg-gray-100 text-black shadow-sm hover:bg-gray-200 border border-gray-300"
              }`}
              onClick={() => navigate({ to: "/mainLayout/urls" })}
            >
              <LinkIcon color={urlsButtonState ? "white" : "black"} />
              URLs
            </Button>

            <Button
              className={`text-xs w-20 h-7 flex items-center justify-center ${
                filesButtonState
                  ? "bg-green-600 text-white shadow-sm hover:bg-green-600"
                  : "bg-gray-100 text-black shadow-sm hover:bg-gray-200 border border-gray-300"
              }`}
              onClick={() => navigate({ to: "/mainLayout/files" })}
            >
              <UploadIcon color={filesButtonState ? "white" : "black"} />
              Files
            </Button>

            <Button
              onClick={handleRagSync}
              className="h-7 text-sm bg-white text-black border border-black hover:text-white flex items-center justify-center"
            >
              <SyncIcon />
              <p>sync</p>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="flex justify-end items-center ml-2 mr-2">
            <div className="flex gap-2 justify-end">
              {/* Files */}
              <div className="flex justify-center gap-[10px] items-center bg-white w-[120px] h-10 rounded-lg shadow-sm px-3 md:px-4">
                <div className="flex gap-[10px] justify-center items-center">
                  <p className="text-sm text-gray-500">Files</p>
                  <p className="text-normal font-semibold text-gray-900">
                    {isPending ? "..." : data?.data?.files}
                  </p>
                </div>
                <div className="flex items-center justify-center bg-blue-100 rounded-md p-1">
                  <FilesIcon className="text-blue-600 w-4 h-4" />
                </div>
              </div>

              {/* URLs */}
              <div className="flex justify-center gap-[10px] items-center bg-white w-[120px] h-10 rounded-lg shadow-sm px-3 md:px-4">
                <div className="flex gap-[10px] justify-center items-center">
                  <p className="text-sm text-gray-500">URLs</p>
                  <p className="text-normal font-semibold text-gray-900">
                    {isPending ? "..." : data?.data?.urls}
                  </p>
                </div>
                <div className="flex items-center justify-center bg-green-100 rounded-md p-1">
                  <UrlsIcon className="text-green-600 w-5 h-5" />
                </div>
              </div>

              {/* RAG Ready */}
              <div className="flex justify-center gap-[10px] items-center bg-white w-[160px] md:w-[180px] h-10 rounded-lg shadow-sm px-3 md:px-4">
                <div className="flex gap-[10px] justify-center items-center">
                  <p className="text-sm text-gray-500">RAG Ready</p>
                  <p className="text-normal font-semibold text-gray-900">
                    {isPending ? "..." : data?.data?.ready}
                  </p>
                </div>
                <div className="flex items-center justify-center bg-purple-100 rounded-md p-1">
                  <RagReadyIcon className="text-purple-600 w-5 h-5" />
                </div>
              </div>

              {/* Failed */}
              <div className="flex justify-center gap-[10px] items-center bg-white w-[120px] h-10 rounded-lg shadow-sm px-3 md:px-4">
                <div className="flex gap-[10px] justify-center items-center">
                  <p className="text-sm text-gray-500">Failed</p>
                  <p className="text-normal font-semibold text-gray-900">
                    {isPending ? "..." : data?.data?.failed}
                  </p>
                </div>
                <div className="flex items-center justify-center bg-red-100 rounded-md p-1">
                  <DeleteIcon className="text-red-600 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table / Content Area */}
        <div className="mt-2 w-full overflow-x-auto h-[calc(100vh-135px)]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
