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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowId } from "@mui/x-data-grid";
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
import { useState } from "react";

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

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<GridRowId | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const users: User[] = [
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

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    userId: GridRowId,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleEdit = () => {
    console.log("Edit user:", selectedUserId);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete user:", selectedUserId);
    handleMenuClose();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={params.row.avatar}
            alt={params.row.name}
            sx={{ width: 32, height: 32 }}
          />
          <Box>
            <Typography variant="subtitle2" color="text.primary">
              {params.row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
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
              onClick={() => setOpenAddDialog(true)}
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
            {[
              "Engineering",
              "Marketing",
              "Design",
              "Sales",
              "Finance",
              "HR",
            ].map((dept, index) => {
              const deptUsers = users.filter((u) => u.department === dept);
              const percentage =
                deptUsers.length > 0
                  ? Math.round((deptUsers.length / users.length) * 100)
                  : [25, 20, 15, 12, 10, 8][index];
              const userCount =
                deptUsers.length > 0
                  ? deptUsers.length
                  : [3, 2, 1, 1, 1, 1][index];

              return (
                <Box key={dept} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ fontWeight: 500 }}
                    >
                      {dept}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {userCount} users ({percentage}%)
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 6,
                      bgcolor: [
                        "primary.main",
                        "success.main",
                        "warning.main",
                        "error.main",
                        "info.main",
                        "secondary.main",
                      ][index % 6],
                      width: `${percentage}%`,
                      borderRadius: 1,
                      minWidth: "20%",
                    }}
                  />
                </Box>
              );
            })}
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
              height: "calc(600px - 120px)", // Subtract header height
              overflowY: "auto",
              pr: 1,
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
            ].map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2.5,
                  alignItems: "center",
                  py: 4,
                  px: 1.5,
                  borderRadius: 2,
                  bgcolor:
                    index % 2 === 0
                      ? "transparent"
                      : "rgba(255, 255, 255, 0.02)",
                  border: "1px solid transparent",
                  height: "calc((100% - 16px) / 8)", // Distribute equally among 8 items with gap
                  minHeight: 70,
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: "divider",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
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
                    <AddIcon sx={{ fontSize: 18 }} />
                  )}
                  {activity.type === "update" && (
                    <EditIcon sx={{ fontSize: 18 }} />
                  )}
                  {activity.type === "revoke" && (
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  )}
                  {activity.type === "invite" && (
                    <EmailIcon sx={{ fontSize: 18 }} />
                  )}
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {activity.action}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mb: 1.5, fontSize: "0.85rem", lineHeight: 1.4 }}
                  >
                    {activity.user}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      {activity.time}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      •
                    </Typography>
                    <Chip
                      label={activity.department}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: "10px",
                        borderColor: "divider",
                        "& .MuiChip-label": {
                          px: 1,
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
              onClick={() => setOpenAddDialog(true)}
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
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} /> Edit User
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete User
        </MenuItem>
      </Menu>

      {/* Add User Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
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
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              placeholder="Enter email address"
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select defaultValue="" label="Role">
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select defaultValue="" label="Department">
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAddDialog(false)}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
