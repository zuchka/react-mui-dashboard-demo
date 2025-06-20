import { Box, Paper, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { StatsCard } from "../StatsCard/StatsCard";

export default function Dashboard() {
  const orders = [
    {
      id: "1532",
      clientName: "John Carter",
      clientEmail: "hello@johncarter.com",
      date: "Jan 30, 2024",
      status: "Delivered",
      statusColor: "success",
      country: "United States",
      total: "$ 1,099.24",
    },
    {
      id: "1531",
      clientName: "Sophie Moore",
      clientEmail: "contact@sophiemoore.com",
      date: "Jan 27, 2024",
      status: "Canceled",
      statusColor: "error",
      country: "United Kingdom",
      total: "$ 5,870.32",
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order", width: 100 },
    {
      field: "clientName",
      headerName: "Client",
      width: 150,
    },
    {
      field: "clientEmail",
      headerName: "Email",
      width: 200,
    },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            display: "inline-block",
            bgcolor: `${params.row.statusColor}.light`,
            color: `${params.row.statusColor}.main`,
          }}
        >
          <Typography variant="caption">{params.row.status}</Typography>
        </Box>
      ),
    },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "total",
      headerName: "Total",
      width: 130,
      align: "right",
      headerAlign: "right",
    },
  ];

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: "100%", maxWidth: "100%" }}
    >
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Analytics & Reports Dashboard
      </Typography>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          mb: 5,
          width: "100%",
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

      {/* Traffic Sources */}
      <Paper
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "background.default",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Traffic Sources
        </Typography>
        <Box
          sx={{
            height: 350,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">Chart Placeholder</Typography>
        </Box>
      </Paper>

      {/* Website Visitors and Analytics */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 4,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              "@media (max-width: 991px)": {
                flexDirection: "column",
                gap: 0,
              },
            }}
          >
            {/* Website Visitors - Column 1 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                "@media (max-width: 991px)": {
                  width: "100%",
                },
              }}
            >
              <Paper sx={{ p: 3, height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Website Visitors</Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    Export
                  </Button>
                </Box>

                <Typography
                  variant="h3"
                  sx={{ mb: 1, fontWeight: 700, fontSize: "48px" }}
                >
                  150k
                </Typography>

                <Box sx={{ mb: 3 }}>
                  {[
                    {
                      type: "Organic",
                      percentage: "30%",
                      color: "primary.main",
                    },
                    {
                      type: "Social",
                      percentage: "50%",
                      color: "secondary.main",
                    },
                    {
                      type: "Direct",
                      percentage: "20%",
                      color: "success.main",
                    },
                  ].map((item, index) => (
                    <Box
                      key={item.type}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: item.color,
                        }}
                      />
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: "14px" }}
                      >
                        {item.type}
                      </Typography>
                      <Typography sx={{ ml: "auto", fontSize: "14px" }}>
                        {item.percentage}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>

            {/* Column 2 - Empty for now as per diff */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                ml: 2.5,
                "@media (max-width: 991px)": {
                  width: "100%",
                  ml: 0,
                },
              }}
            />
          </Box>
        </Box>

        {/* Analytics Chart */}
        <Box sx={{ flexGrow: 2 }}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography variant="h6">Analytics</Typography>
            </Box>
            <Box
              sx={{
                height: 350,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Analytics Chart Placeholder
              </Typography>
            </Box>
          </Paper>
        </Box>
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

      {/* Orders Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Orders Status</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" sx={{ bgcolor: "background.paper" }}>
              Jan 2024
            </Button>
            <Button variant="contained" color="primary">
              Create order
            </Button>
          </Box>
        </Box>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
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
    </Box>
  );
}
