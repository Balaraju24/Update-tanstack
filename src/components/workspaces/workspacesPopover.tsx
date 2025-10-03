import workSpace from "@/assets/workspace.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";

const WorkSpacesPopover = ({ onChangeWorkSpace, workspaces, setIsOpen }) => {
  const [open, setOpen] = useState(false);
  const [labelForTrigger, setLabelForTrigger] = useState("My Workspace");
  const [searchString, setSearchString] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(() => {
    const savedWorkspace = localStorage.getItem("selectedWorkspace");
    return savedWorkspace ? JSON.parse(savedWorkspace) : null;
  });

  const isSingleWorkspace = workspaces?.length === 1;

  const staticMyWorkspace = {
    first_name: "My",
    last_name: "Workspace",
    is_active: true,
    isStatic: true,
  };

  const allWorkspaces = [staticMyWorkspace, ...(workspaces || [])];

  const filteredWorkspaces = allWorkspaces.filter((workspace) =>
    `${workspace.first_name} ${workspace.last_name}`
      .toLowerCase()
      .includes(searchString.toLowerCase())
  );

  useEffect(() => {
    if (isSingleWorkspace && workspaces[0]?.is_active) {
      handleSelectWorkspace(workspaces[0]);
    }
  }, [workspaces]);

  useEffect(() => {
    if (selectedWorkspace) {
      const label = `${selectedWorkspace.first_name} ${selectedWorkspace.last_name}`;
      setLabelForTrigger(label);
    } else {
      setLabelForTrigger("My Workspace");
    }

    if (selectedWorkspace && !selectedWorkspace.isStatic) {
      localStorage.setItem(
        "selectedWorkspace",
        JSON.stringify(selectedWorkspace)
      );
    } else if (selectedWorkspace?.isStatic) {
      localStorage.removeItem("selectedWorkspace");
    }
  }, [selectedWorkspace]);

  const handleSelectWorkspace = (workspace) => {
    if (!workspace.is_active) return;

    setSelectedWorkspace(workspace);
    onChangeWorkSpace(workspace);
    setOpen(false);
    setIsOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-2 h-10 shadow-sm rounded-md px-2 py-1 cursor-pointer hover:bg-gray-50 border border-gray-300"
        >
          <img src={workSpace} alt="User" className="w-6 h-6 rounded-full" />
          <div className="truncate text-sm">{labelForTrigger}</div>
          <ChevronsUpDown className="h-5 w-5 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={`!p-0 bg-white font-normal w-72 border border-gray-200 max-h-48 text-base ${isSingleWorkspace ? "" : "h-48"}`}
      >
        <div className="flex flex-col">
          {!isSingleWorkspace && (
            <input
              placeholder="Search Workspace"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="sticky top-0 z-[99] px-4 py-2 text-sm border-b border-b-gray-200 rounded-none text-gray-700 placeholder-gray-400 focus:outline-none w-full"
            />
          )}
          <ul className="max-h-36 overflow-y-auto ">
            {filteredWorkspaces?.length ? (
              filteredWorkspaces.map((workSpaceObj) => (
                <li
                  key={workSpaceObj.id}
                  onClick={() => handleSelectWorkspace(workSpaceObj)}
                  className={`px-4 py-1.5 text-sm hover:bg-gray-100 cursor-pointer ${
                    !workSpaceObj.is_active
                      ? "text-gray-400 cursor-not-allowed"
                      : selectedWorkspace?.id === workSpaceObj.id
                        ? "bg-primary-200/40"
                        : ""
                  }`}
                >
                  {`${workSpaceObj.first_name} ${workSpaceObj.last_name}` +
                    (!workSpaceObj.is_active ? " (Inactive)" : "")}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                No Users found.
              </li>
            )}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WorkSpacesPopover;
