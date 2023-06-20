import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/Theme";
import App from "./App.js";
import Home from "./views/Home.js";
import Trade from "./views/Trade.js";
import Profile from "./views/Profile";
import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./components/RequireAuth";

const ele = document.getElementById("root");
const root = ReactDOM.createRoot(ele);

const roles = ["survivor", "admin", "infected"];

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={<App />}
            />
            {/* Secure Route */}
            <Route element={<RequireAuth allowedRoles={roles} />}>
              <Route
                path="/home"
                element={<Home />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
            </Route>
            <Route element={<RequireAuth allowedRoles={[roles[0]]} />}>
              <Route
                path="/trade"
                element={<Trade />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
