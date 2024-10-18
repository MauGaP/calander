import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithGoogle, logoutUser } from "../services/authService";
import LogoutModal from "./LogoutModal";

// Material UI components
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null); // For the dropdown menu
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setShowModal(false); // Close modal
      handleMenuClose(); // Close dropdown menu
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Calander
          </Typography>

          {currentUser ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar src={currentUser.photoURL} alt="User Avatar" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose} // Closes the menu when clicked outside
              >
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/settings"
                  onClick={handleMenuClose}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setShowModal(true);
                    handleMenuClose(); // Close the menu when clicking on "Logout"
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={loginWithGoogle}>
              Login with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Header;
