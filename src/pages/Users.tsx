import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { StatsCard } from "../components/StatsCard/StatsCard";
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { useUserManagement } from "../hooks/useUserManagement";

const Users = () => {
  const {
    users,
    filteredUsers,
    searchTerm,
    anchorEl,
    openAddDialog,
    openEditDialog,
    formData,
    validationErrors,
    isSubmitting,
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
  } = useUserManagement();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <AdminIcon sx={{ fontSize: 16 }} />;
      case "Manager":
        return <GroupIcon sx={{ fontSize: 16 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 16 }} />;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={params.row.avatar}
            alt={params.row.name}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="subtitle2" color="text.primary">
            {params.row.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.row.email}
        </Typography>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {getRoleIcon(params.row.role)}
          <Typography variant="body2">{params.row.role}</Typography>
        </Box>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={getStatusColor(params.row.status) as any}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "joinDate",
      headerName: "Join Date",
      width: 130,
    },
    {
      field: "lastLogin",
      headerName: "Last Login",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(event) => handleMenuOpen(event, params.row.id)}
          aria-label={`More actions for ${params.row.name}`}
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 2, width: "85%", maxWidth: "100%" }}
    >
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="text.primary" gutterBottom>
          Users Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your team members and their access permissions
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          mb: 4,
        }}
      >
        <StatsCard
          title="Total Users"
          value={users.length.toString()}
          icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/12e5903a7437a6622d9d786c782556678c3707ee?placeholderIfAbsent=true"
          trend={{ value: "12.5%", positive: true }}
        />
        <StatsCard
          title="Active Users"
          value={users.filter((u) => u.status === "Active").length.toString()}
          icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/42aa344d48d2bef4d72892ceaca37092f37bb2a2?placeholderIfAbsent=true"
          trend={{ value: "8.2%", positive: true }}
        />
        <StatsCard
          title="New This Month"
          value="12"
          icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/4d83799fbee2676e6ce0bc38cc5ddbc996cc0d2f?placeholderIfAbsent=true"
          trend={{ value: "3.1%", positive: false }}
        />
        <StatsCard
          title="Pending Approval"
          value={users.filter((u) => u.status === "Pending").length.toString()}
          trend={{ value: "5.4%", positive: false }}
        />
      </Box>

      {/* User Management Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 3,
          mb: 4,
          alignItems: "start",
        }}
      >
        {/* Quick Actions */}
        <Paper
          sx={{ p: 3, display: "flex", flexDirection: "column", height: 600 }}
        >
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Add New User
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Send Invitations
            </Button>
            <Button
              variant="outlined"
              startIcon={<GroupIcon />}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Manage Permissions
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Department Overview
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {["Engineering", "Marketing", "Design"].map((dept, index) => {
              const deptUsers = users.filter((u) => u.department === dept);
              const percentage =
                deptUsers.length > 0
                  ? Math.round((deptUsers.length / users.length) * 100)
                  : [60, 25, 15][index];
              const userCount =
                deptUsers.length > 0 ? deptUsers.length : [3, 2, 1][index];

              return (
                <Box key={dept} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      {dept}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {userCount} users
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 6,
                      bgcolor: ["primary.main", "success.main", "warning.main"][
                        index % 3
                      ],
                      width: `${percentage}%`,
                      borderRadius: 1,
                      minWidth: "20%",
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    {percentage}% of total users
                  </Typography>
                </Box>
              );
            })}

            <Box
              sx={{
                mt: "auto",
                p: 1.5,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                sx={{ display: "block" }}
              >
                Total: {users.length} users
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Recent Activity */}
        <Paper
          sx={{ p: 3, display: "flex", flexDirection: "column", height: 600 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Recent Activity</Typography>
            <Button variant="text" size="small" color="primary">
              View All
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              pr: 1,
              gap: 0.5,
            }}
          >
            {[
              {
                action: "New user joined",
                user: "James Rodriguez",
                time: "2 hours ago",
                type: "join",
                department: "Engineering",
              },
              {
                action: "User updated profile",
                user: "Sophie Moore",
                time: "5 hours ago",
                type: "update",
                department: "Marketing",
              },
              {
                action: "User access revoked",
                user: "Emma Wilson",
                time: "1 day ago",
                type: "revoke",
                department: "Design",
              },
              {
                action: "New user invitation sent",
                user: "Alex Thompson",
                time: "2 days ago",
                type: "invite",
                department: "Sales",
              },
              {
                action: "Password reset requested",
                user: "Michael Chen",
                time: "3 days ago",
                type: "update",
                department: "Engineering",
              },
              {
                action: "User role changed to Admin",
                user: "Sarah Johnson",
                time: "4 days ago",
                type: "update",
                department: "Management",
              },
              {
                action: "New user joined",
                user: "David Kim",
                time: "5 days ago",
                type: "join",
                department: "Design",
              },
              {
                action: "User deactivated",
                user: "Lisa Wang",
                time: "6 days ago",
                type: "revoke",
                department: "Marketing",
              },
              {
                action: "Bulk invitation sent",
                user: "HR Team",
                time: "1 week ago",
                type: "invite",
                department: "Human Resources",
              },
              {
                action: "User login from new device",
                user: "Tom Wilson",
                time: "1 week ago",
                type: "update",
                department: "Sales",
              },
              {
                action: "Account verification completed",
                user: "Anna Garcia",
                time: "1 week ago",
                type: "join",
                department: "Finance",
              },
              {
                action: "User permissions updated",
                user: "Chris Brown",
                time: "2 weeks ago",
                type: "update",
                department: "Engineering",
              },
              {
                action: "Security alert resolved",
                user: "Security Team",
                time: "2 weeks ago",
                type: "update",
                department: "IT Security",
              },
              {
                action: "New department created",
                user: "Admin",
                time: "3 weeks ago",
                type: "join",
                department: "Operations",
              },
            ].map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  py: 2.5,
                  px: 1.5,
                  borderRadius: 1,
                  bgcolor:
                    index % 2 === 0
                      ? "transparent"
                      : "rgba(255, 255, 255, 0.02)",
                  border: "1px solid transparent",
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: "divider",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor:
                      activity.type === "join"
                        ? "success.main"
                        : activity.type === "revoke"
                          ? "error.main"
                          : activity.type === "invite"
                            ? "warning.main"
                            : "primary.main",
                  }}
                >
                  {activity.type === "join" && (
                    <AddIcon sx={{ fontSize: 16 }} />
                  )}
                  {activity.type === "update" && (
                    <EditIcon sx={{ fontSize: 16 }} />
                  )}
                  {activity.type === "revoke" && (
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  )}
                  {activity.type === "invite" && (
                    <EmailIcon sx={{ fontSize: 16 }} />
                  )}
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 0.5, fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    {activity.action}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mb: 0.5, fontSize: "0.8rem" }}
                  >
                    {activity.user}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      {activity.time}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      •
                    </Typography>
                    <Chip
                      label={activity.department}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 18,
                        fontSize: "9px",
                        borderColor: "divider",
                        "& .MuiChip-label": {
                          px: 0.8,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Users Table */}
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography variant="h6">All Users</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Add User
            </Button>
          </Box>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderColor: "divider",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderColor: "divider",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenEditDialog}>
          <EditIcon sx={{ mr: 1 }} /> Edit User
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete User
        </MenuItem>
      </Menu>

      {/* Add User Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              disabled={isSubmitting}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              disabled={isSubmitting}
            />
            <FormControl fullWidth error={!!validationErrors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => handleFormChange("role", e.target.value)}
                disabled={isSubmitting}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
              </Select>
              {validationErrors.role && (
                <FormHelperText>{validationErrors.role}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={!!validationErrors.department}>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                label="Department"
                onChange={(e) => handleFormChange("department", e.target.value)}
                disabled={isSubmitting}
              >
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
              {validationErrors.department && (
                <FormHelperText>{validationErrors.department}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddUser}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? <CircularProgress size={20} /> : <AddIcon />
            }
          >
            {isSubmitting ? "Adding..." : "Add User"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Full Name"
              fullWidth
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              disabled={isSubmitting}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              disabled={isSubmitting}
            />
            <FormControl fullWidth error={!!validationErrors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => handleFormChange("role", e.target.value)}
                disabled={isSubmitting}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
              </Select>
              {validationErrors.role && (
                <FormHelperText>{validationErrors.role}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={!!validationErrors.department}>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                label="Department"
                onChange={(e) => handleFormChange("department", e.target.value)}
                disabled={isSubmitting}
              >
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
              {validationErrors.department && (
                <FormHelperText>{validationErrors.department}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEditUser}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? <CircularProgress size={20} /> : <EditIcon />
            }
          >
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
