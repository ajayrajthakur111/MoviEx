import { Favorite, Logout, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const goToSearch = () => {
    navigate("/search");
  };

  const goToWatchlist = () => {
    navigate("/watchlist");
  };

  const isWatchlistPage = location.pathname === "/watchlist";

  return (
    <>
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(45deg, #0d0d0d, #1a1a1a)",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
        padding: "0.5rem 1rem",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Brand Name */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: "2px",
            color: "white",
            cursor: "pointer",
            "&:hover": { color: "#ff4444", transition: "0.3s" },
          }}
          onClick={goToSearch}
        >
          Movi<span style={{ color: "#ff4444" }}>Ex</span>
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {!isWatchlistPage ? (
            <>
              <Button
                color="inherit"
                onClick={goToWatchlist}
                startIcon={<Favorite />}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { color: "#ff4444", transition: "0.3s" },
                  display: { xs: "none", sm: "flex" },
                  "&:focus": { outline: "none" },

                }}
              >
                Watchlist
              </Button>

              <IconButton
                color="inherit"
                onClick={goToWatchlist}
                sx={{
                  display: { xs: "flex", sm: "none" }, 
                  "&:hover": { color: "#ff4444", transition: "0.3s" },
                  "&:focus": { outline: "none" },
                }}
              >
                <Favorite />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={goToSearch}
                startIcon={<Search />}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { color: "#b1acac", transition: "0.3s" },
                  display: { xs: "none", sm: "flex" },  
                }}
              >
                Search
              </Button>

              <IconButton
                color="inherit"
                onClick={goToSearch}
                disableRipple
                sx={{
                  display: { xs: "flex", sm: "none" }, 
                  "&:hover": { color: "#b1acac", transition: "0.3s" },
                  "&:focus": { outline: "none" },
                }}
              >
                <Search />
              </IconButton>
            </>
          )}

          {/* Logout Icon (for mobile) */}
          <IconButton
            color="inherit"
            onClick={handleLogout}
            disableRipple
            sx={{
              display: { xs: "flex", sm: "none" },
              "&:hover": { color: "#ff4444", transition: "0.3s" },
              "&:focus": { outline: "none" },
            }}
          >
            <Logout />
          </IconButton>

          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            disableRipple
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { color: "#ff4444", transition: "0.3s" },
              "&:focus": { outline: "none" },
              display: { xs: "none", sm: "flex" },

            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    <Box sx={{height:"80px"}}></Box>
    
    </>
  );
};

export default Header;
