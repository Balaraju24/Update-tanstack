import { Workspace, WorkspaceContextType } from "@/lib/interfaces/workspace";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWorkspace = localStorage.getItem("selectedWorkspace");
      if (savedWorkspace) {
        try {
          const parsed = JSON.parse(savedWorkspace);
          setSelectedWorkspace(parsed);
        } catch (error) {
          localStorage.removeItem("selectedWorkspace");
        }
      } else {
      }
    }
  }, []);

  const handleSetWorkspace = (workspace: Workspace | null) => {
    setSelectedWorkspace(workspace);

    if (typeof window !== "undefined") {
      if (workspace) {
        const stringified = JSON.stringify(workspace);
        localStorage.setItem("selectedWorkspace", stringified);
      } else {
        localStorage.removeItem("selectedWorkspace");
      }
    }
  };

  useEffect(() => {}, [selectedWorkspace]);

  return (
    <WorkspaceContext.Provider
      value={{
        selectedWorkspace,
        setSelectedWorkspace: handleSetWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }

  return context;
};
