import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  Tooltip,
  Grid,
  Fab,
} from "@mui/material";
import { Add as Delete, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeMovie } from "../../store/slices/watchlistSlice";

const WatchlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.watchlist);
  const { user } = useAppSelector((state) => state.auth);

  const handleRemoveMovie = (imdbID: string) => {
    dispatch(removeMovie(imdbID));
  };

  const goToSearch = () => {
    navigate("/search");
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Watchlist
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: { xs: "100%", sm: "auto" },
          }}
        >
          {user?.userName ? `${user.userName}'s saved movies` : "My Saved Movies"}
        </Typography>
      </Box>

      {/* If Watchlist is Empty */}
      {movies.length === 0 ? (
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Your watchlist is empty
          </Typography>
          <Fab
            variant="extended"
            color="primary"
            onClick={goToSearch}
            sx={{
              mt: 2,
              textTransform: "none",
            }}
          >
            <Search sx={{ mr: 1 }} />
            Discover Movies
          </Fab>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 4,lg:3 }} key={movie.imdbID}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 400, objectFit: "cover" }}
                  image={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
                  alt={movie.Title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.Year}
                  </Typography>
                </CardContent>

                {/* Modern Remove Button (Icon Only) */}
                <Tooltip title="Remove from Watchlist">
                  <IconButton
                    onClick={() => handleRemoveMovie(movie.imdbID)}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "rgba(255,255,255,0.7)",
                      "&:hover": { bgcolor: "rgba(255,0,0,0.8)", color: "white" },
                    }}
                  >
                  <Delete sx={{ transform: "rotate(45deg)" }}/>
                  </IconButton>
                </Tooltip>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchlistPage;
