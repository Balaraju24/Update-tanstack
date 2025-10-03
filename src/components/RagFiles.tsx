import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import Cookies from "js-cookie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, LogOut } from "lucide-react";
import SalesTableLogo from "@/assets/Salestablelogo";
import profileImage from "@/assets/profile.jpg";
import { getAllUsersAPI } from "@/http/services/ragServices";
import WorkSpacesPopover from "./workspaces/workspacesPopover";
import { useWorkspace } from "@/context/WorkspaceContext";
import CreateWorkspaceDialog from "./workspaces/createWorkspace";
import PlusTooltip from "./core/ClickTooltip";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export default function RagFiles() {
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspace();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const userDetails = JSON.parse(Cookies.get("user_details") || "{}");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["users-list"],
    queryFn: async () => {
      const res = await getAllUsersAPI(`/users`);
      if (res?.status === 200 || res?.status === 201) {
        return res.data;
      } else {
        toast.error(
          res?.message || "Something went wrong while fetching users..."
        );
        return { records: [] };
      }
    },
    refetchOnWindowFocus: false,
  });

  const workspaces = data?.data?.records || [];

  const handleCreateWorkspace = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("user_details");
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    toast.success("Successfully logged out...");
    router.navigate({ to: "/" });
    localStorage.clear();
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-1 bg-white shadow-sm rounded-[10px]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <SalesTableLogo />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Create Workspace Button & Workspaces Popover */}
          {userDetails.user_type === "CUSTOMER" ? (
            ""
          ) : (
            <>
              <PlusTooltip text="Create Workspace">
                <button
                  onClick={handleCreateWorkspace}
                  className="bg-black/80 !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-full h-8 w-8 transition duration-300 text-sm 3xl:text-base font-normal text-center flex justify-center items-center"
                >
                  <PlusIcon className="w-5 h-5 font-extralight group-hover:rotate-90 duration-300" />
                </button>
              </PlusTooltip>

              <WorkSpacesPopover
                workspaces={workspaces}
                onChangeWorkSpace={(workspace) => {
                  setSelectedWorkspace(workspace);
                }}
                setIsOpen={() => {}}
              />
            </>
          )}

          {/* Profile with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer transition">
                <img
                  src={profileImage}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2 border-0">
              <div className="flex flex-col space-y-2">
                <Button className="flex items-center gap-2 px-2 py-1 rounded-md bg-white text-black hover:bg-gray-100 transition">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Button>
                <Button
                  className="flex items-center gap-2 px-2 py-1 rounded-md bg-white hover:bg-gray-100 transition"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">Logout</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Create Workspace Dialog */}
        <CreateWorkspaceDialog
          isOpen={isCreateDialogOpen}
          onClose={handleCloseDialog}
        />
      </div>
    </>
  );
}
