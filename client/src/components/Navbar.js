import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Search from "./Search";

const pages = [
  { name: "Home", path: "/home", access: ["survivor", "admin"] },
  { name: "Trade", path: "/trade", access: ["survivor"] },
  { name: "Report", path: "/report", access: ["admin"] },
];

const Title = "ProjectX";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const settings = [
    {
      name: "Profile",
      operation: function () {
        navigate("/profile");
        handleCloseUserMenu();
      },
    },
    {
      name: "Signout",
      operation: function () {
        setAuth(null);
        localStorage.removeItem("token");
        localStorage.removeItem("_id");
        handleCloseUserMenu();
      },
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      {auth?.isInfected && (
        <span
          style={{
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
          }}
        >
          You are Infected
        </span>
      )}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            {Title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(
                (page) =>
                  page.access.includes(auth.role) && (
                    <MenuItem
                      key={page.name}
                      onClick={() => navigate(page.path)}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            {Title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(
              (page) =>
                page.access.includes(auth.role) && (
                  <Button
                    key={page.name}
                    onClick={() => navigate(page.path)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                )
            )}
          </Box>
          {auth.role === "survivor" && <Search />}
          <Typography
            variant="h6"
            component="h3"
            mr={2}
            sx={{
              color: "white",
              letterSpacing: ".2rem",
              fontFamily: "monospace",
            }}
          >
            {auth?.name}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={auth?.name}
                  src={
                    auth?.profile_image
                      ? `data:image/*;base64,${auth.profile_image}`
                      : ""
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={setting.operation}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
