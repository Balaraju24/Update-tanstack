export type Workspace = {
  id: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  user_type: string;
};

export type WorkspaceContextType = {
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace | null) => void;
};