import { Box, Paper, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { StatsCard } from "../StatsCard/StatsCard";

// Team data for the table
const teamData = [
  {
    id: 1,
    name: "John Carter",
    email: "john.carter@company.com",
    role: "Frontend Developer",
    department: "Engineering",
    progress: 60,
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Sophie Moore",
    email: "sophie.moore@company.com",
    role: "UI/UX Designer",
    department: "Design",
    progress: 33,
    status: "Active",
    joinDate: "2023-03-20",
  },
  {
    id: 3,
    name: "Matt Cannon",
    email: "matt.cannon@company.com",
    role: "Backend Developer",
    department: "Engineering",
    progress: 75,
    status: "Active",
    joinDate: "2022-11-08",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Product Manager",
    department: "Product",
    progress: 85,
    status: "Active",
    joinDate: "2022-08-12",
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    progress: 45,
    status: "On Leave",
    joinDate: "2023-05-03",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Marketing Specialist",
    department: "Marketing",
    progress: 90,
    status: "Active",
    joinDate: "2022-09-25",
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "QA Engineer",
    department: "Engineering",
    progress: 55,
    status: "Active",
    joinDate: "2023-02-14",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    role: "HR Manager",
    department: "Human Resources",
    progress: 70,
    status: "Active",
    joinDate: "2022-06-10",
  },
];

// Define columns for the DataGrid
const teamColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 180,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    width: 220,
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    width: 140,
    flex: 1,
  },
  {
    field: "progress",
    headerName: "Progress (%)",
    width: 120,
    type: "number",
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>{params.value}%</Typography>
        <Box
          sx={{
            width: 40,
            height: 4,
            bgcolor: "grey.300",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: `${params.value}%`,
              height: "100%",
              bgcolor:
                params.value >= 70
                  ? "success.main"
                  : params.value >= 40
                    ? "warning.main"
                    : "error.main",
            }}
          />
        </Box>
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => (
      <Box
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backgroundColor:
            params.value === "Active" ? "success.light" : "warning.light",
          color: params.value === "Active" ? "success.main" : "warning.main",
          fontSize: "0.75rem",
          fontWeight: 500,
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "joinDate",
    headerName: "Join Date",
    width: 120,
    type: "date",
    valueGetter: (value) => new Date(value),
  },
];

export default function Dashboard() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 2, width: "85%", maxWidth: "100%" }}
    >
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
          title="Save Products"
          value="50.8K"
          icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/12e5903a7437a6622d9d786c782556678c3707ee?placeholderIfAbsent=true"
          trend={{ value: "28.4%", positive: true }}
        />
        <StatsCard
          title="Stock Products"
          value="23.6K"
          icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/42aa344d48d2bef4d72892ceaca37092f37bb2a2?placeholderIfAbsent=true"
          trend={{ value: "12.6%", positive: false }}
        />
        <StatsCard
          title="Sale Products"
          value="756"
          icon="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/4d83799fbee2676e6ce0bc38cc5ddbc996cc0d2f?placeholderIfAbsent=true"
          trend={{ value: "3.1%", positive: true }}
        />
        <StatsCard
          title="Average Revenue"
          value="2.3K"
          trend={{ value: "11.3%", positive: true }}
        />
      </Box>

      {/* Website Visitors and Analytics */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 3,
          mb: 4,
        }}
      >
        {/* Analytics Chart */}
        <Paper
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/cecb0a586d41b199491293c20063d9f661073c1f?placeholderIfAbsent=true"
            alt="Analytics"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </Paper>

        {/* Website Visitors */}
        <Paper sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Website Visitors</Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "background.paper" }}
            >
              Export
            </Button>
          </Box>

          <Typography variant="h3" align="center" sx={{ my: 8 }}>
            150k
          </Typography>

          {["Organic", "Social", "Direct"].map((type, index) => (
            <Box key={type} sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary">{type}</Typography>
                <Typography>{["30%", "50%", "20%"][index]}</Typography>
              </Box>
              <Box
                sx={{
                  height: 4,
                  bgcolor: "primary.main",
                  width: ["30%", "50%", "20%"][index],
                  borderRadius: 1,
                }}
              />
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Products, Team Progress, and Visitors Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          mb: 4,
        }}
      >
        {/* Products */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Products
          </Typography>

          {[
            {
              name: "iPhone 14 Pro Max",
              stock: "524 in stock",
              price: "$ 1,099.00",
              image:
                "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/1a15b566cdcb6072766f934db735e3d51505e66e?placeholderIfAbsent=true",
            },
            {
              name: "Apple Watch S8",
              stock: "320 in stock",
              price: "$ 799.00",
              image:
                "https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/c8521e4f3e8f7b791be1d38b07026be595bec1f5?placeholderIfAbsent=true",
            },
          ].map((product, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 40, height: 40, objectFit: "contain" }}
              />
              <Box>
                <Typography variant="subtitle2">{product.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {product.stock}
                </Typography>
              </Box>
              <Typography sx={{ ml: "auto" }}>{product.price}</Typography>
            </Box>
          ))}
        </Paper>

        {/* Team Progress */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Team progress
          </Typography>

          {[
            {
              name: "John Carter",
              email: "contact@sophiemoore.com",
              progress: "60%",
            },
            {
              name: "Sophie Moore",
              email: "contact@sophiemoore.com",
              progress: "33%",
            },
            {
              name: "Matt Cannon",
              email: "info@mattcannon.com",
              progress: "75%",
            },
          ].map((member, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/991ee9a0afad461fa9386316c87fe366/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true"
                alt={member.name}
                style={{ width: 29, height: 29, borderRadius: "50%" }}
              />
              <Box>
                <Typography variant="subtitle2">{member.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.email}
                </Typography>
              </Box>
              <Typography sx={{ ml: "auto" }}>{member.progress}</Typography>
            </Box>
          ))}
        </Paper>

        {/* Website Visitors Stats */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Website Visitors
          </Typography>

          <Box sx={{ textAlign: "center", my: 8 }}>
            <Typography variant="h3">80%</Typography>
            <Typography color="text.secondary">Transactions</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
            {["Sell", "Distribute", "Return"].map((action) => (
              <Typography key={action} color="text.secondary">
                {action}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Team Table */}
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">Team Overview</Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "primary.main" }}
          >
            Manage Team
          </Button>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={teamData}
            columns={teamColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.default",
                borderBottom: "2px solid",
                borderColor: "divider",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "action.hover",
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
