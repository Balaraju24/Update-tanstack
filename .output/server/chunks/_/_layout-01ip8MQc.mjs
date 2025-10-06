import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useLocation, useNavigate, Outlet, useRouter } from '@tanstack/react-router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PlusIcon, User, LogOut, ChevronsUpDown, X, Mail, Phone } from 'lucide-react';
import Cookies from 'js-cookie';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { B as Button, c as cn } from './button-Cul2gyf-.mjs';
import { S as SalesTableLogo } from './Salestablelogo-Cl8l0GJc.mjs';
import { r as ragStats, a as ragSync, g as getAllUsersAPI, C as CreateWorkspaceAPI } from './ragServices-BTI_KB5q.mjs';
import { u as useWorkspace } from './router-DX4z58n8.mjs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
const profileImage = "/assets/profile-C1LjtNlw.jpg";
const workSpace = "/assets/workspace-DjPhalU6.jpg";
const WorkSpacesPopover = ({ onChangeWorkSpace, workspaces, setIsOpen }) => {
  const [open, setOpen] = useState(false);
  const [labelForTrigger, setLabelForTrigger] = useState("My Workspace");
  const [searchString, setSearchString] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(() => {
    const savedWorkspace = localStorage.getItem("selectedWorkspace");
    return savedWorkspace ? JSON.parse(savedWorkspace) : null;
  });
  const isSingleWorkspace = (workspaces == null ? void 0 : workspaces.length) === 1;
  const staticMyWorkspace = {
    first_name: "My",
    last_name: "Workspace",
    is_active: true,
    isStatic: true
  };
  const allWorkspaces = [staticMyWorkspace, ...workspaces || []];
  const filteredWorkspaces = allWorkspaces.filter(
    (workspace) => `${workspace.first_name} ${workspace.last_name}`.toLowerCase().includes(searchString.toLowerCase())
  );
  useEffect(() => {
    var _a;
    if (isSingleWorkspace && ((_a = workspaces[0]) == null ? void 0 : _a.is_active)) {
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
    } else if (selectedWorkspace == null ? void 0 : selectedWorkspace.isStatic) {
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
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        role: "combobox",
        "aria-expanded": open,
        className: "flex items-center gap-2 h-10 shadow-sm rounded-md px-2 py-1 cursor-pointer hover:bg-gray-50 border border-gray-300",
        children: [
          /* @__PURE__ */ jsx("img", { src: workSpace, alt: "User", className: "w-6 h-6 rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "truncate text-sm", children: labelForTrigger }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-5 w-5 text-gray-500" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        className: `!p-0 bg-white font-normal w-72 border border-gray-200 max-h-48 text-base ${isSingleWorkspace ? "" : "h-48"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          !isSingleWorkspace && /* @__PURE__ */ jsx(
            "input",
            {
              placeholder: "Search Workspace",
              value: searchString,
              onChange: (e) => setSearchString(e.target.value),
              className: "sticky top-0 z-[99] px-4 py-2 text-sm border-b border-b-gray-200 rounded-none text-gray-700 placeholder-gray-400 focus:outline-none w-full"
            }
          ),
          /* @__PURE__ */ jsx("ul", { className: "max-h-36 overflow-y-auto ", children: (filteredWorkspaces == null ? void 0 : filteredWorkspaces.length) ? filteredWorkspaces.map((workSpaceObj) => /* @__PURE__ */ jsx(
            "li",
            {
              onClick: () => handleSelectWorkspace(workSpaceObj),
              className: `px-4 py-1.5 text-sm hover:bg-gray-100 cursor-pointer ${!workSpaceObj.is_active ? "text-gray-400 cursor-not-allowed" : (selectedWorkspace == null ? void 0 : selectedWorkspace.id) === workSpaceObj.id ? "bg-primary-200/40" : ""}`,
              children: `${workSpaceObj.first_name} ${workSpaceObj.last_name}` + (!workSpaceObj.is_active ? " (Inactive)" : "")
            },
            workSpaceObj.id
          )) : /* @__PURE__ */ jsx("li", { className: "px-4 py-2 text-sm text-gray-500", children: "No Users found." }) })
        ] })
      }
    )
  ] });
};
function CreateWorkspaceDialog({
  isOpen,
  onClose
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();
  const createWorkspaceMutation = useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: async (data) => {
      const res = await CreateWorkspaceAPI("/users/create-internal-user", data);
      return res;
    },
    onSuccess: (data) => {
      toast.success("Workspace created successfully!");
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      handleClose();
    },
    onError: (response) => {
      var _a, _b;
      setErrors((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.errors);
      toast.error(((_b = response == null ? void 0 : response.data) == null ? void 0 : _b.message) || "Failed to create workspace");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      rag_account_id: "9ddc7d0d438e65cedd2ecfd4430277af",
      rag_id: "autorag-sales-table",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      ...formData.phone && { phone: formData.phone }
    };
    createWorkspaceMutation.mutate(payload);
  };
  const handleInputChange = (field, value) => {
    if (field === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      value = numericValue;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field === "firstName" ? "first_name" : field === "lastName" ? "last_name" : field];
      return newErrors;
    });
  };
  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    });
    setErrors({});
    onClose();
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-lg mx-2 p-2 transform transition-all", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4  border-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-normal text-black", children: "Create New Workspace" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Add a new workspace to get started" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleClose,
          className: "p-1 hover:bg-gray-100 rounded-full transition-colors",
          disabled: createWorkspaceMutation.isPending,
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-gray-500 cursor-pointer" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-4 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "First Name *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.firstName,
                onChange: (e) => handleInputChange("firstName", e.target.value),
                className: `w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 transition-all ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"} `,
                placeholder: "First name",
                disabled: createWorkspaceMutation.isPending
              }
            )
          ] }),
          errors.first_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-0.5", children: errors.first_name[0] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Last Name *" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: formData.lastName,
                onChange: (e) => handleInputChange("lastName", e.target.value),
                className: `w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"}`,
                placeholder: "Last name",
                disabled: createWorkspaceMutation.isPending,
                required: true
              }
            )
          ] }),
          errors.last_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-0.5", children: errors.last_name[0] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: "Email Address *" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Mail, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3  text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: formData.email,
              onChange: (e) => handleInputChange("email", e.target.value),
              className: `w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"}`,
              placeholder: "Email address",
              disabled: createWorkspaceMutation.isPending,
              required: true
            }
          )
        ] }),
        errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-0.5", children: errors.email[0] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-xs font-medium text-gray-700 mb-1", children: [
          "Phone Number",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-normal", children: "(Optional)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Phone, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              value: formData.phone,
              onChange: (e) => handleInputChange("phone", e.target.value),
              className: `w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all ${errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"}`,
              placeholder: "Enter phone number",
              disabled: createWorkspaceMutation.isPending
            }
          )
        ] }),
        errors.phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-0.5", children: errors.phone })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClose,
            className: "flex-1 px-3 py-2 text-sm border cursor-pointer border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            disabled: createWorkspaceMutation.isPending,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "flex-1 px-3 py-2 text-sm bg-black cursor-pointer text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1",
            disabled: createWorkspaceMutation.isPending,
            children: createWorkspaceMutation.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" }),
              "Creating..."
            ] }) : "Add Workspace"
          }
        )
      ] })
    ] })
  ] }) });
}
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const PlusTooltip = ({ text, children }) => {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(
      TooltipContent,
      {
        side: "top",
        align: "center",
        className: "bg-white text-black shadow-md rounded-md px-3 py-1 text-sm font-medium",
        children: [
          text,
          /* @__PURE__ */ jsx(TooltipArrow, { className: "fill-white" })
        ]
      }
    )
  ] }) });
};
function RagFiles() {
  var _a;
  const { selectedWorkspace, setSelectedWorkspace } = useWorkspace();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const userDetails = JSON.parse(Cookies.get("user_details") || "{}");
  const router = useRouter();
  useQueryClient();
  const { data } = useQuery({
    queryKey: ["users-list"],
    queryFn: async () => {
      const res = await getAllUsersAPI(`/users`);
      if ((res == null ? void 0 : res.status) === 200 || (res == null ? void 0 : res.status) === 201) {
        return res.data;
      } else {
        toast.error(
          (res == null ? void 0 : res.message) || "Something went wrong while fetching users..."
        );
        return { records: [] };
      }
    },
    refetchOnWindowFocus: false
  });
  const workspaces = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.records) || [];
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
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full px-4 py-1 bg-white shadow-sm rounded-[10px]", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(SalesTableLogo, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      userDetails.user_type === "CUSTOMER" ? "" : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(PlusTooltip, { text: "Create Workspace", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCreateWorkspace,
            className: "bg-black/80 !text-white hover:bg-gray-800 cursor-pointer group focus:ring-none active:scale-95 !rounded-full h-8 w-8 transition duration-300 text-sm 3xl:text-base font-normal text-center flex justify-center items-center",
            children: /* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5 font-extralight group-hover:rotate-90 duration-300" })
          }
        ) }),
        /* @__PURE__ */ jsx(
          WorkSpacesPopover,
          {
            workspaces,
            onChangeWorkSpace: (workspace) => {
              setSelectedWorkspace(workspace);
            },
            setIsOpen: () => {
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Popover, { children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer transition", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: profileImage,
            alt: "User",
            className: "w-8 h-8 rounded-full"
          }
        ) }) }),
        /* @__PURE__ */ jsx(PopoverContent, { className: "w-40 p-2 border-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
          /* @__PURE__ */ jsxs(Button, { className: "flex items-center gap-2 px-2 py-1 rounded-md bg-white text-black hover:bg-gray-100 transition", children: [
            /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Profile" })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "flex items-center gap-2 px-2 py-1 rounded-md bg-white hover:bg-gray-100 transition",
              onClick: handleLogout,
              children: [
                /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 text-red-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Logout" })
              ]
            }
          )
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CreateWorkspaceDialog,
      {
        isOpen: isCreateDialogOpen,
        onClose: handleCloseDialog
      }
    )
  ] }) });
}
function FilesIcon({ className }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("svg", { width: "26", height: "26", className, viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("path", { d: "M21.6667 7.58366H18.4167C17.842 7.58366 17.2909 7.35539 16.8846 6.94906C16.4783 6.54273 16.25 5.99163 16.25 5.41699V2.16699", stroke: "#3182ED", strokeWidth: "2.16667", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M9.75016 19.5003C9.17553 19.5003 8.62443 19.2721 8.2181 18.8657C7.81177 18.4594 7.5835 17.9083 7.5835 17.3337V4.33366C7.5835 3.75902 7.81177 3.20792 8.2181 2.80159C8.62443 2.39527 9.17553 2.16699 9.75016 2.16699H17.3335L21.6668 6.50033V17.3337C21.6668 17.9083 21.4386 18.4594 21.0322 18.8657C20.6259 19.2721 20.0748 19.5003 19.5002 19.5003H9.75016Z", stroke: "#3182ED", strokeWidth: "2.16667", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M3.25 8.2334V22.1001C3.25 22.5598 3.43262 23.0007 3.75768 23.3257C4.08274 23.6508 4.52362 23.8334 4.98333 23.8334H15.6", stroke: "#3182ED", strokeWidth: "2.16667", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }) });
}
function DeleteIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "26",
      height: "26",
      viewBox: "0 0 26 26",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M16.8017 9.93442L14.1414 12.5937L16.8017 15.2531C16.8768 15.3281 16.9363 15.4172 16.9769 15.5153C17.0175 15.6133 17.0384 15.7184 17.0384 15.8245C17.0384 15.9306 17.0175 16.0357 16.9769 16.1338C16.9363 16.2318 16.8768 16.3209 16.8017 16.396C16.7267 16.471 16.6376 16.5305 16.5395 16.5711C16.4415 16.6118 16.3364 16.6327 16.2303 16.6327C16.1242 16.6327 16.0191 16.6118 15.921 16.5711C15.823 16.5305 15.7339 16.471 15.6588 16.396L12.9995 13.7356L10.3402 16.396C10.2651 16.471 10.1761 16.5305 10.078 16.5711C9.97996 16.6118 9.87487 16.6327 9.76875 16.6327C9.66262 16.6327 9.55753 16.6118 9.45948 16.5711C9.36143 16.5305 9.27235 16.471 9.1973 16.396C9.12226 16.3209 9.06273 16.2318 9.02212 16.1338C8.98151 16.0357 8.9606 15.9306 8.9606 15.8245C8.9606 15.7184 8.98151 15.6133 9.02212 15.5153C9.06273 15.4172 9.12226 15.3281 9.1973 15.2531L11.8576 12.5937L9.1973 9.93442C9.04575 9.78287 8.9606 9.57731 8.9606 9.36298C8.9606 9.14865 9.04575 8.94309 9.1973 8.79154C9.34886 8.63998 9.55441 8.55484 9.76875 8.55484C9.98308 8.55484 10.1886 8.63998 10.3402 8.79154L12.9995 11.4519L15.6588 8.79154C15.7339 8.71649 15.823 8.65697 15.921 8.61635C16.0191 8.57574 16.1242 8.55484 16.2303 8.55484C16.3364 8.55484 16.4415 8.57574 16.5395 8.61635C16.6376 8.65697 16.7267 8.71649 16.8017 8.79154C16.8768 8.86658 16.9363 8.95567 16.9769 9.05372C17.0175 9.15176 17.0384 9.25685 17.0384 9.36298C17.0384 9.46911 17.0175 9.57419 16.9769 9.67224C16.9363 9.77029 16.8768 9.85938 16.8017 9.93442ZM23.4995 12.5937C23.4995 14.6705 22.8837 16.7005 21.7299 18.4272C20.5762 20.1539 18.9363 21.4998 17.0177 22.2945C15.0991 23.0892 12.9879 23.2971 10.9511 22.892C8.91427 22.4868 7.04335 21.4868 5.57489 20.0184C4.10644 18.5499 3.10642 16.679 2.70127 14.6422C2.29613 12.6054 2.50406 10.4942 3.29878 8.57557C4.0935 6.65695 5.43931 5.01707 7.16603 3.86332C8.89274 2.70956 10.9228 2.09375 12.9995 2.09375C15.7834 2.09669 18.4524 3.20388 20.4209 5.17237C22.3894 7.14087 23.4966 9.80988 23.4995 12.5937ZM21.8841 12.5937C21.8841 10.8365 21.3631 9.11879 20.3868 7.65772C19.4105 6.19665 18.023 5.05789 16.3995 4.38544C14.7761 3.71298 12.9897 3.53703 11.2662 3.87985C9.54277 4.22266 7.95968 5.06884 6.71714 6.31138C5.47461 7.55391 4.62843 9.137 4.28562 10.8604C3.9428 12.5839 4.11875 14.3703 4.7912 15.9937C5.46366 17.6172 6.60242 19.0048 8.06349 19.981C9.52455 20.9573 11.2423 21.4784 12.9995 21.4784C15.355 21.4757 17.6133 20.5388 19.2789 18.8732C20.9445 17.2076 21.8815 14.9493 21.8841 12.5937Z",
          fill: "#EF4444"
        }
      )
    }
  );
}
function UrlsIcon({ className }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "26",
      height: "26",
      className,
      viewBox: "0 0 26 26",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M13.0003 23.8337C18.9834 23.8337 23.8337 18.9834 23.8337 13.0003C23.8337 7.01724 18.9834 2.16699 13.0003 2.16699C7.01724 2.16699 2.16699 7.01724 2.16699 13.0003C2.16699 18.9834 7.01724 23.8337 13.0003 23.8337Z",
            stroke: "#16A249",
            strokeWidth: "2.16667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M12.9998 2.16699C10.2181 5.08783 8.6665 8.96679 8.6665 13.0003C8.6665 17.0339 10.2181 20.9128 12.9998 23.8337C15.7816 20.9128 17.3332 17.0339 17.3332 13.0003C17.3332 8.96679 15.7816 5.08783 12.9998 2.16699Z",
            stroke: "#16A249",
            strokeWidth: "2.16667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2.16699 13H23.8337",
            stroke: "#16A249",
            strokeWidth: "2.16667",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  ) });
}
function RagReadyIcon({ className }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("svg", { width: "26", height: "26", className, viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M25.1873 12.5938C25.1862 11.5176 24.8804 10.4636 24.3052 9.55398C23.7301 8.64433 22.9091 7.91615 21.9373 7.4537V7.31253C21.9363 6.26564 21.5984 5.24687 20.9735 4.40694C20.3486 3.56702 19.4699 2.95057 18.4675 2.64881C17.465 2.34705 16.3921 2.376 15.4073 2.7314C14.4226 3.08679 13.5785 3.74973 12.9998 4.62214C12.4211 3.74973 11.5769 3.08679 10.5922 2.7314C9.6075 2.376 8.53454 2.34705 7.53208 2.64881C6.52963 2.95057 5.65094 3.56702 5.02604 4.40694C4.40114 5.24687 4.06322 6.26564 4.06229 7.31253V7.4537C3.08966 7.91488 2.26787 8.64261 1.69243 9.55231C1.11699 10.462 0.811523 11.5163 0.811523 12.5928C0.811523 13.6692 1.11699 14.7235 1.69243 15.6332C2.26787 16.5429 3.08966 17.2706 4.06229 17.7318V17.875C4.06322 18.9219 4.40114 19.9407 5.02604 20.7806C5.65094 21.6205 6.52963 22.237 7.53208 22.5388C8.53454 22.8405 9.6075 22.8116 10.5922 22.4562C11.5769 22.1008 12.4211 21.4378 12.9998 20.5654C13.5785 21.4378 14.4226 22.1008 15.4073 22.4562C16.3921 22.8116 17.465 22.8405 18.4675 22.5388C19.4699 22.237 20.3486 21.6205 20.9735 20.7806C21.5984 19.9407 21.9363 18.9219 21.9373 17.875V17.7318C22.9089 17.2697 23.7299 16.5419 24.305 15.6326C24.8802 14.7233 25.1861 13.6697 25.1873 12.5938ZM8.93729 21.125C8.1359 21.1249 7.36282 20.8287 6.76651 20.2933C6.17021 19.758 5.79273 19.0211 5.70658 18.2244C5.96933 18.2619 6.23438 18.2809 6.49979 18.2813H7.31229C7.52777 18.2813 7.73444 18.1957 7.88681 18.0433C8.03918 17.8909 8.12479 17.6843 8.12479 17.4688C8.12479 17.2533 8.03918 17.0466 7.88681 16.8943C7.73444 16.7419 7.52777 16.6563 7.31229 16.6563H6.49979C5.54059 16.6574 4.61193 16.3191 3.87823 15.7012C3.14453 15.0834 2.65312 14.2258 2.49099 13.2804C2.32886 12.335 2.50648 11.3628 2.9924 10.5358C3.47832 9.70876 4.24119 9.08036 5.14596 8.76183C5.30426 8.70578 5.44132 8.60205 5.53825 8.46492C5.63519 8.32779 5.68726 8.16398 5.68729 7.99605V7.31253C5.68729 6.45058 6.02969 5.62393 6.63919 5.01443C7.24868 4.40494 8.07533 4.06253 8.93729 4.06253C9.79924 4.06253 10.6259 4.40494 11.2354 5.01443C11.8449 5.62393 12.1873 6.45058 12.1873 7.31253V14.2452C11.2951 13.4427 10.1373 12.9991 8.93729 13C8.7218 13 8.51513 13.0856 8.36276 13.238C8.21039 13.3904 8.12479 13.597 8.12479 13.8125C8.12479 14.028 8.21039 14.2347 8.36276 14.3871C8.51513 14.5394 8.7218 14.625 8.93729 14.625C9.79924 14.625 10.6259 14.9674 11.2354 15.5769C11.8449 16.1864 12.1873 17.0131 12.1873 17.875C12.1873 18.737 11.8449 19.5636 11.2354 20.1731C10.6259 20.7826 9.79924 21.125 8.93729 21.125ZM19.4998 16.6563H18.6873C18.4718 16.6563 18.2651 16.7419 18.1128 16.8943C17.9604 17.0466 17.8748 17.2533 17.8748 17.4688C17.8748 17.6843 17.9604 17.8909 18.1128 18.0433C18.2651 18.1957 18.4718 18.2813 18.6873 18.2813H19.4998C19.7652 18.2809 20.0302 18.2619 20.293 18.2244C20.2255 18.8487 19.9786 19.44 19.5822 19.927C19.1857 20.4139 18.6567 20.7756 18.0591 20.9682C17.4615 21.1609 16.8208 21.1763 16.2146 21.0127C15.6084 20.849 15.0626 20.5132 14.6432 20.0459C14.2238 19.5786 13.9487 18.9999 13.8512 18.3796C13.7537 17.7593 13.838 17.124 14.0939 16.5506C14.3498 15.9772 14.7663 15.4902 15.2931 15.1485C15.8199 14.8067 16.4344 14.6249 17.0623 14.625C17.2778 14.625 17.4844 14.5394 17.6368 14.3871C17.7892 14.2347 17.8748 14.028 17.8748 13.8125C17.8748 13.597 17.7892 13.3904 17.6368 13.238C17.4844 13.0856 17.2778 13 17.0623 13C15.8623 12.9991 14.7045 13.4427 13.8123 14.2452V7.31253C13.8123 6.45058 14.1547 5.62393 14.7642 5.01443C15.3737 4.40494 16.2003 4.06253 17.0623 4.06253C17.9242 4.06253 18.7509 4.40494 19.3604 5.01443C19.9699 5.62393 20.3123 6.45058 20.3123 7.31253V7.99605C20.3123 8.16398 20.3644 8.32779 20.4613 8.46492C20.5583 8.60205 20.6953 8.70578 20.8536 8.76183C21.7584 9.08036 22.5213 9.70876 23.0072 10.5358C23.4931 11.3628 23.6707 12.335 23.5086 13.2804C23.3465 14.2258 22.855 15.0834 22.1213 15.7012C21.3876 16.3191 20.459 16.6574 19.4998 16.6563ZM21.1248 11.375C21.1248 11.5905 21.0392 11.7972 20.8868 11.9496C20.7344 12.1019 20.5278 12.1875 20.3123 12.1875H19.906C18.9363 12.1875 18.0064 11.8023 17.3207 11.1166C16.635 10.431 16.2498 9.50098 16.2498 8.53128V8.12503C16.2498 7.90954 16.3354 7.70288 16.4878 7.55051C16.6401 7.39813 16.8468 7.31253 17.0623 7.31253C17.2778 7.31253 17.4844 7.39813 17.6368 7.55051C17.7892 7.70288 17.8748 7.90954 17.8748 8.12503V8.53128C17.8748 9.07 18.0888 9.58666 18.4697 9.96759C18.8507 10.3485 19.3673 10.5625 19.906 10.5625H20.3123C20.5278 10.5625 20.7344 10.6481 20.8868 10.8005C21.0392 10.9529 21.1248 11.1595 21.1248 11.375ZM6.09354 12.1875H5.68729C5.4718 12.1875 5.26513 12.1019 5.11276 11.9496C4.96039 11.7972 4.87479 11.5905 4.87479 11.375C4.87479 11.1595 4.96039 10.9529 5.11276 10.8005C5.26513 10.6481 5.4718 10.5625 5.68729 10.5625H6.09354C6.63226 10.5625 7.14891 10.3485 7.52985 9.96759C7.91078 9.58666 8.12479 9.07 8.12479 8.53128V8.12503C8.12479 7.90954 8.21039 7.70288 8.36276 7.55051C8.51513 7.39813 8.7218 7.31253 8.93729 7.31253C9.15277 7.31253 9.35944 7.39813 9.51181 7.55051C9.66418 7.70288 9.74979 7.90954 9.74979 8.12503V8.53128C9.74979 9.50098 9.36457 10.431 8.67889 11.1166C7.99321 11.8023 7.06323 12.1875 6.09354 12.1875Z", fill: "#9D1BFB" }) }) });
}
const LinkIcon = (({ title = "Link", size = 24, strokeWidth = 2, color = "black" }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    color,
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-labelledby": title ? "link-title" : void 0,
    role: "img",
    children: [
      title ? /* @__PURE__ */ jsx("title", { id: "link-title", children: title }) : null,
      /* @__PURE__ */ jsx("path", { d: "M10 14a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L10 6.93" }),
      /* @__PURE__ */ jsx("path", { d: "M14 10a5 5 0 0 0-7.07 0L4.1 12.93a5 5 0 0 0 7.07 7.07L14 17.07" })
    ]
  }
));
const UploadIcon = (({ title = "Upload", size = 20, strokeWidth = 2, color = "black" }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    color,
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-labelledby": title ? "upload-title" : void 0,
    role: "img",
    children: [
      title ? /* @__PURE__ */ jsx("title", { id: "upload-title", children: title }) : null,
      /* @__PURE__ */ jsx("path", { d: "M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" }),
      /* @__PURE__ */ jsx("path", { d: "M12 3v13" }),
      /* @__PURE__ */ jsx("path", { d: "M8 7l4-4 4 4" })
    ]
  }
));
function SyncIcon({
  size = 32,
  className = "",
  title = "Sync",
  spin = false,
  strokeWidth = 2
}) {
  const s = typeof size === "number" ? `${size}px` : size;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 640 640",
      width: s,
      height: s,
      strokeWidth,
      role: "img",
      "aria-label": title,
      className: cn(spin ? "animate-spin" : "", className),
      children: [
        /* @__PURE__ */ jsx("title", { children: title }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "currentColor",
            d: "M544.1 256L552 256C565.3 256 576 245.3 576 232L576 88C576 78.3 570.2 69.5 561.2 65.8C552.2 62.1 541.9 64.2 535 71L483.3 122.8C439 86.1 382 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6C143.2 199.5 223.3 128 320 128C364.4 128 405.2 143 437.7 168.3L391 215C384.1 221.9 382.1 232.2 385.8 241.2C389.5 250.2 398.3 256 408 256L544.1 256zM573.5 356.5C576 339 563.8 322.8 546.4 320.3C529 317.8 512.7 330 510.2 347.4C496.9 440.4 416.8 511.9 320.1 511.9C275.7 511.9 234.9 496.9 202.4 471.6L249 425C255.9 418.1 257.9 407.8 254.2 398.8C250.5 389.8 241.7 384 232 384L88 384C74.7 384 64 394.7 64 408L64 552C64 561.7 69.8 570.5 78.8 574.2C87.8 577.9 98.1 575.8 105 569L156.8 517.2C201 553.9 258 576 320 576C449 576 555.7 480.6 573.4 356.5z"
          }
        )
      ]
    }
  );
}
function MainLayout() {
  var _a, _b, _c, _d, _e;
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedWorkspace } = useWorkspace();
  const [urlsButtonState, setUrlsButtonState] = useState(true);
  const [filesButtonState, setFilesButtonState] = useState(false);
  const user = JSON.parse(Cookies.get("user_details") || "");
  useEffect(() => {
    if (location.pathname === "/mainLayout") {
      navigate({ to: "/mainLayout/urls" });
    }
  }, []);
  useEffect(() => {
    if (location.pathname.includes("/urls")) {
      setUrlsButtonState(true);
      setFilesButtonState(false);
    } else if (location.pathname.includes("/files")) {
      setUrlsButtonState(false);
      setFilesButtonState(true);
    }
  }, [location.pathname]);
  const { data, isPending, isError } = useQuery({
    queryKey: ["stats", selectedWorkspace == null ? void 0 : selectedWorkspace.id],
    queryFn: async () => {
      if (user.user_type === "ADMIN" && (selectedWorkspace == null ? void 0 : selectedWorkspace.id) === void 0) {
        const res = await ragStats(`/files/stats`);
        if ((res == null ? void 0 : res.status) === 200 || (res == null ? void 0 : res.status) === 201) return res.data;
      } else if ((selectedWorkspace == null ? void 0 : selectedWorkspace.user_type) === "CUSTOMER" && user.user_type === "ADMIN" && (selectedWorkspace == null ? void 0 : selectedWorkspace.id)) {
        const res = await ragStats(
          `/files/stats?user_id=${selectedWorkspace == null ? void 0 : selectedWorkspace.id}`
        );
        if ((res == null ? void 0 : res.status) === 200 || (res == null ? void 0 : res.status) === 201) return res.data;
      } else {
        const res = await ragStats(`/files/stats`);
        if ((res == null ? void 0 : res.status) === 200 || (res == null ? void 0 : res.status) === 201) return res.data;
      }
    },
    refetchOnWindowFocus: false
  });
  if (isError) toast.error(((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.message) || "Failed to fetch stats");
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
    onError: (error) => toast.error((error == null ? void 0 : error.message) || "failed to sync")
  });
  const handleRagSync = () => {
    ragSyncFiles.mutateAsync();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(RagFiles, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full-screen bg-white mt-2 mx-2 rounded-lg shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center w-full mt-3 px-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap gap-2 w-full", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: `text-xs w-20 h-7 flex items-center justify-center ${urlsButtonState ? "bg-green-600 text-white shadow-sm hover:bg-green-600" : "bg-gray-100 text-black shadow-sm hover:bg-gray-200 border border-gray-300"}`,
              onClick: () => navigate({ to: "/mainLayout/urls" }),
              children: [
                /* @__PURE__ */ jsx(LinkIcon, { color: urlsButtonState ? "white" : "black" }),
                "URLs"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: `text-xs w-20 h-7 flex items-center justify-center ${filesButtonState ? "bg-green-600 text-white shadow-sm hover:bg-green-600" : "bg-gray-100 text-black shadow-sm hover:bg-gray-200 border border-gray-300"}`,
              onClick: () => navigate({ to: "/mainLayout/files" }),
              children: [
                /* @__PURE__ */ jsx(UploadIcon, { color: filesButtonState ? "white" : "black" }),
                "Files"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: handleRagSync,
              className: "h-7 text-sm bg-white text-black border border-black hover:text-white flex items-center justify-center",
              children: [
                /* @__PURE__ */ jsx(SyncIcon, {}),
                /* @__PURE__ */ jsx("p", { children: "sync" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end items-center ml-2 mr-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-[10px] items-center bg-white w-[120px] h-10 rounded-lg shadow-sm px-3 md:px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-[10px] justify-center items-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Files" }),
              /* @__PURE__ */ jsx("p", { className: "text-normal font-semibold text-gray-900", children: isPending ? "..." : (_b = data == null ? void 0 : data.data) == null ? void 0 : _b.files })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-blue-100 rounded-md p-1", children: /* @__PURE__ */ jsx(FilesIcon, { className: "text-blue-600 w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-[10px] items-center bg-white w-[120px] h-10 rounded-lg shadow-sm px-3 md:px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-[10px] justify-center items-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "URLs" }),
              /* @__PURE__ */ jsx("p", { className: "text-normal font-semibold text-gray-900", children: isPending ? "..." : (_c = data == null ? void 0 : data.data) == null ? void 0 : _c.urls })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-green-100 rounded-md p-1", children: /* @__PURE__ */ jsx(UrlsIcon, { className: "text-green-600 w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-[10px] items-center bg-white w-[160px] md:w-[180px] h-10 rounded-lg shadow-sm px-3 md:px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-[10px] justify-center items-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "RAG Ready" }),
              /* @__PURE__ */ jsx("p", { className: "text-normal font-semibold text-gray-900", children: isPending ? "..." : (_d = data == null ? void 0 : data.data) == null ? void 0 : _d.ready })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-purple-100 rounded-md p-1", children: /* @__PURE__ */ jsx(RagReadyIcon, { className: "text-purple-600 w-5 h-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-[10px] items-center bg-white w-[120px] h-10 rounded-lg shadow-sm px-3 md:px-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-[10px] justify-center items-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Failed" }),
              /* @__PURE__ */ jsx("p", { className: "text-normal font-semibold text-gray-900", children: isPending ? "..." : (_e = data == null ? void 0 : data.data) == null ? void 0 : _e.failed })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-red-100 rounded-md p-1", children: /* @__PURE__ */ jsx(DeleteIcon, { className: "text-red-600 w-5 h-5" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 w-full overflow-x-auto h-[calc(100vh-135px)]", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const SplitComponent = MainLayout;

export { SplitComponent as component };
//# sourceMappingURL=_layout-01ip8MQc.mjs.map
