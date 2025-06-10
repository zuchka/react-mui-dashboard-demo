import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { theme } from "./theme/theme";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import AllPages from "./pages/AllPages";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Task from "./pages/Task";
import Features from "./pages/Features";
import Users from "./pages/Users";
import Pricing from "./pages/Pricing";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import Templates from "./pages/Templates";
import Buoys from "./pages/Buoys";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "background.default",
            gap: "20px",
            width: "100vw",
            margin: 0,
            padding: 0,
            overflowX: "hidden",
          }}
        >
          <Sidebar />
          <Box sx={{ flexGrow: 1, minWidth: 0, width: "100%" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/all-pages" element={<AllPages />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/products" element={<Products />} />
              <Route path="/task" element={<Task />} />
              <Route path="/features" element={<Features />} />
              <Route path="/users" element={<Users />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/buoys" element={<Buoys />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/templates" element={<Templates />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
