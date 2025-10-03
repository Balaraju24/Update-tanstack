import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, User, Mail, Phone } from "lucide-react";
import { CreateWorkspaceAPI } from "@/http/services/ragServices";

interface CreateWorkspaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWorkspaceDialog({
  isOpen,
  onClose,
}: CreateWorkspaceDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const queryClient = useQueryClient();

  const createWorkspaceMutation = useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: async (data: {
      rag_account_id: string;
      rag_id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone?: string;
    }) => {
      const res = await CreateWorkspaceAPI("/users/create-internal-user", data);
      return res;
    },
    onSuccess: (data) => {
      toast.success("Workspace created successfully!");
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      handleClose();
    },
    onError: (response: any) => {
      setErrors(response?.data?.errors);
      toast.error(response?.data?.message || "Failed to create workspace");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors on submit

    const payload = {
      rag_account_id: "9ddc7d0d438e65cedd2ecfd4430277af",
      rag_id: "autorag-sales-table",
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      ...(formData.phone && { phone: formData.phone }),
    };

    createWorkspaceMutation.mutate(payload);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "phone") {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, "");

      // Restrict to 10 digits max
      if (numericValue.length > 10) return;

      value = numericValue;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[
        field === "firstName"
          ? "first_name"
          : field === "lastName"
            ? "last_name"
            : field
      ];
      return newErrors;
    });
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-2 p-2 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-4  border-gray-200">
          <div>
            <h2 className="text-base font-normal text-black">
              Create New Workspace
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Add a new workspace to get started
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={createWorkspaceMutation.isPending}
          >
            <X className="w-4 h-4 text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* First Name and Last Name in one row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 transition-all ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  } `}
                  placeholder="First name"
                  disabled={createWorkspaceMutation.isPending}
                />
              </div>
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-0.5">
                  {errors.first_name[0]}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all ${
                    errors.phone
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Last name"
                  disabled={createWorkspaceMutation.isPending}
                  required
                />
              </div>
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-0.5">
                  {errors.last_name[0]}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3  text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all ${
                  errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Email address"
                disabled={createWorkspaceMutation.isPending}
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-0.5">{errors.email[0]}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full pl-7 pr-2 py-1.5 text-sm border rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent transition-all ${
                  errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
                disabled={createWorkspaceMutation.isPending}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-3 py-2 text-sm border cursor-pointer border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={createWorkspaceMutation.isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-2 text-sm bg-black cursor-pointer text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
              disabled={createWorkspaceMutation.isPending}
            >
              {createWorkspaceMutation.isPending ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Add Workspace"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
