import React, { useState, useCallback } from "react";
import type { GridRowId } from "@mui/x-data-grid";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
  avatar: string;
  joinDate: string;
  lastLogin: string;
  department: string;
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  department: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  role?: string;
  department?: string;
}

export const useUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<GridRowId | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "",
    department: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialUsers: User[] = [
    {
      id: "1",
      name: "John Carter",
      email: "john.carter@company.com",
      role: "Admin",
      status: "Active",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/26bd6ffcec002bf455996a05d2b89c3461015451?placeholderIfAbsent=true",
      joinDate: "Jan 15, 2023",
      lastLogin: "2 hours ago",
      department: "Engineering",
    },
    {
      id: "2",
      name: "Sophie Moore",
      email: "sophie.moore@company.com",
      role: "Manager",
      status: "Active",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      joinDate: "Mar 22, 2023",
      lastLogin: "1 day ago",
      department: "Marketing",
    },
    {
      id: "3",
      name: "Matt Cannon",
      email: "matt.cannon@company.com",
      role: "Developer",
      status: "Active",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      joinDate: "May 10, 2023",
      lastLogin: "5 minutes ago",
      department: "Engineering",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.wilson@company.com",
      role: "Designer",
      status: "Inactive",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      joinDate: "Jul 08, 2023",
      lastLogin: "1 week ago",
      department: "Design",
    },
    {
      id: "5",
      name: "James Rodriguez",
      email: "james.rodriguez@company.com",
      role: "Developer",
      status: "Pending",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      joinDate: "Aug 15, 2023",
      lastLogin: "Never",
      department: "Engineering",
    },
  ];

  const [users, setUsers] = useState<User[]>(initialUsers);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Comprehensive form validation
  const validateForm = (data: UserFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Name validation
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(data.email.trim())) {
      errors.email = "Please enter a valid email address";
    } else if (
      users.some(
        (user) => user.email.toLowerCase() === data.email.trim().toLowerCase(),
      )
    ) {
      errors.email = "Email address already exists";
    }

    // Role validation
    if (!data.role) {
      errors.role = "Role is required";
    }

    // Department validation
    if (!data.department) {
      errors.department = "Department is required";
    }

    return errors;
  };

  // Handle form field changes
  const handleFormChange = useCallback(
    (field: keyof UserFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear validation error for this field when user starts typing
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [validationErrors],
  );

  // Handle menu operations
  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>, userId: GridRowId) => {
      setAnchorEl(event.currentTarget);
      setSelectedUserId(userId);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    setSelectedUserId(null);
  }, []);

  // Dialog operations
  const handleOpenAddDialog = useCallback(() => {
    setFormData({ name: "", email: "", role: "", department: "" });
    setValidationErrors({});
    setOpenAddDialog(true);
  }, []);

  const handleCloseAddDialog = useCallback(() => {
    setOpenAddDialog(false);
    setFormData({ name: "", email: "", role: "", department: "" });
    setValidationErrors({});
    setIsSubmitting(false);
  }, []);

  const handleOpenEditDialog = useCallback(() => {
    const user = users.find((u) => u.id === selectedUserId);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      });
      setValidationErrors({});
      setOpenEditDialog(true);
    }
    handleMenuClose();
  }, [selectedUserId, users, handleMenuClose]);

  const handleCloseEditDialog = useCallback(() => {
    setOpenEditDialog(false);
    setFormData({ name: "", email: "", role: "", department: "" });
    setValidationErrors({});
    setIsSubmitting(false);
  }, []);

  // User operations
  const handleAddUser = useCallback(async () => {
    setIsSubmitting(true);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      department: formData.department,
      status: "Pending",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      joinDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      lastLogin: "Never",
    };

    setUsers((prev) => [...prev, newUser]);
    handleCloseAddDialog();
  }, [formData, users, validateForm, handleCloseAddDialog]);

  const handleEditUser = useCallback(async () => {
    if (!selectedUserId) return;

    setIsSubmitting(true);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              name: formData.name.trim(),
              email: formData.email.trim().toLowerCase(),
              role: formData.role,
              department: formData.department,
            }
          : user,
      ),
    );

    handleCloseEditDialog();
  }, [selectedUserId, formData, validateForm, handleCloseEditDialog]);

  const handleDeleteUser = useCallback(() => {
    if (selectedUserId) {
      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
    }
    handleMenuClose();
  }, [selectedUserId, handleMenuClose]);

  // Filtered users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    // State
    users,
    filteredUsers,
    searchTerm,
    anchorEl,
    selectedUserId,
    openAddDialog,
    openEditDialog,
    formData,
    validationErrors,
    isSubmitting,

    // Actions
    setSearchTerm,
    handleFormChange,
    handleMenuOpen,
    handleMenuClose,
    handleOpenAddDialog,
    handleCloseAddDialog,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,

    // Utilities
    validateEmail,
  };
};
