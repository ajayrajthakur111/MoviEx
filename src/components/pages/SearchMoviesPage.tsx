import React, { useState, useCallback } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

import {
  Container,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Modal,
  Button,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  searchMovies,
  clearMovies,
  getMovieDetails,
} from "../../store/slices/moviesSlice";
import { addMovie, removeMovie } from "../../store/slices/watchlistSlice";
import { Loader } from "../common/Loader";

const SearchMoviesPage = () => {
  const dispatch = useAppDispatch();
  const { movies, currentPage, totalResults, status, selectedMovie } =
    useAppSelector((state) => state.movies);
  const { movies: watchlistMovies } = useAppSelector(
    (state) => state.watchlist
  );

  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 3) {
        dispatch(clearMovies());
        dispatch(searchMovies({ query: searchQuery, page: 1 }));
      }
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      debouncedSearch(value);
    } else if (value.length === 0) {
      dispatch(clearMovies());
    }
  };

  const loadMoreMovies = () => {
    if (status !== "loading" && query.length >= 3) {
      dispatch(searchMovies({ query, page: currentPage }));
    }
  };
  const handleMovieClick = (imdbID: string) => {
    dispatch(getMovieDetails(imdbID));
    setModalOpen(true);
  };

  const handleWatchlistToggle = (movie: Movie, event: React.MouseEvent) => {
    event.stopPropagation();

    const isInWatchlist = watchlistMovies.some(
      (m) => m.imdbID === movie.imdbID
    );

    if (isInWatchlist) {
      dispatch(removeMovie(movie.imdbID));
    } else {
      dispatch(
        addMovie({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
        })
      );
    }
  };

  return (
    <>
      <Container sx={{ mt: 2, mb: 5 }}>
        <Typography variant="h4" gutterBottom margin="normal"
        >
          Search Movies
        </Typography>

        <Box component="form" sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search for movies..."
            value={query}
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "rgba(255, 255, 255, 0.6)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "#b1acac" },
              },
            }}
            onChange={handleSearchChange}
          />
        </Box>

        {status === "loading" && movies.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <h4>Loading...</h4>
          </Box>
        )}

        {status === "failed" && (
          <Typography
            color="error"
            variant="h6"
            sx={{ my: 4, textAlign: "center" }}
          >
            No movies found. Try another search term.
          </Typography>
        )}

        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreMovies}
          hasMore={movies.length < totalResults}
          loader={
            status === "loading" && (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <Loader />
              </Box>
            )
          }
        >
          <Grid container spacing={3}>
            {movies.map((movie) => {
              const isInWatchlist = watchlistMovies.some(
                (m) => m.imdbID === movie.imdbID
              );

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4,lg:3 }} key={movie.imdbID}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                    }}
                    onClick={() => handleMovieClick(movie.imdbID)}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 400, objectFit: "cover" }}
                      image={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "/placeholder.jpg"
                      }
                      alt={movie.Title}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      onClick={(e) => handleWatchlistToggle(movie, e)}
                    >
                      {isInWatchlist ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {movie.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.Year}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="movie-details-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "70%" },
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              overflow: "auto",
             backgroundColor:"black"
            }}
          >
            {selectedMovie ? (
              <>
                <Grid container spacing={3} >
                  <Grid size={{ xs: 12, sm: 4, }}>
                    <img
                      src={
                        selectedMovie.Poster !== "N/A"
                          ? selectedMovie.Poster
                          : "/placeholder.jpg"
                      }
                      alt={selectedMovie.Title}
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 8 }}>
                    <Typography variant="h4" gutterBottom>
                      {selectedMovie.Title} ({selectedMovie.Year})
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Rated:</strong> {selectedMovie.Rated}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Released:</strong> {selectedMovie.Released} |{" "}
                      <strong>Runtime:</strong> {selectedMovie.Runtime}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Genre:</strong> {selectedMovie.Genre}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Director:</strong> {selectedMovie.Director}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Writer:</strong> {selectedMovie.Writer}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Actors:</strong> {selectedMovie.Actors}
                    </Typography>

                    <Typography variant="body1" paragraph>
                      <strong>Language:</strong> {selectedMovie.Language}
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Plot
                    </Typography>

                    <Typography variant="body1" paragraph>
                      {selectedMovie.Plot}
                    </Typography>

                    {selectedMovie.Ratings &&
                      selectedMovie.Ratings.length > 0 && (
                        <>
                          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Ratings
                          </Typography>
                          {selectedMovie.Ratings.map(
                            (
                              rating: { Source: string; Value: string },
                              index: number
                            ) => (
                              <Typography key={index} variant="body1">
                                <strong>{rating.Source}:</strong> {rating.Value}
                              </Typography>
                            )
                          )}
                        </>
                      )}

                    <Box
                      sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => setModalOpen(false)}
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          backgroundColor: "grey.700",
                          "&:hover": {
                            backgroundColor: "grey.800",
                          },
                        }}
                      >
                        Close
                      </Button>

                      <Button
                        variant="contained"
                        color={
                          watchlistMovies.some(
                            (m) => m.imdbID === selectedMovie.imdbID
                          )
                            ? "error"
                            : "success"
                        }
                        onClick={(e: React.MouseEvent) =>
                          handleWatchlistToggle(selectedMovie, e)
                        }
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          boxShadow: 2,
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                        startIcon={
                          watchlistMovies.some(
                            (m) => m.imdbID === selectedMovie.imdbID
                          ) ? (
                            <Favorite />
                          ) : (
                            <FavoriteBorder />
                          )
                        }
                      >
                        {watchlistMovies.some(
                          (m) => m.imdbID === selectedMovie.imdbID
                        )
                          ? "Remove from Watchlist"
                          : "Add to Watchlist"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Loader />
              </Box>
            )}
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default SearchMoviesPage;
