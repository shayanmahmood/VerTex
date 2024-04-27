import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/Admin";
import Settings from "./pages/settings";
import Users from "./pages/Users";
import Account from "./pages/Account";
import PageNotFOund from "./pages/PageNotFOund";
import AppLayout from "./ui/AppLayout";
import GlobalStyle from "./styles/GlobalStyle";
import Shares from "./pages/Shares";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stocks from "./pages/Stocks";
import { Toaster } from "react-hot-toast";
import Share from "./pages/share";
import CheckShares from "./features/Check/CheckinShares";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/shares/:shareId" element={<Share />} />
              <Route path="/check/:shareId" element={<CheckShares />} />
              <Route path="/shares" element={<Shares />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFOund />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
