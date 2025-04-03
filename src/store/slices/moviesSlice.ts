import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  imdbID: string;
  imdbRating: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

const baseURL = import.meta.env.VITE_BASE_URL;
const apikey = import.meta.env.VITE_OMDB_API_KEY;
export const searchMovies = createAsyncThunk<SearchResponse, { query: string; page: number }, { rejectValue: string }>(
  "movies/searchMovies",
  async ({ query, page }, { rejectWithValue }) => {

    try {

      const response = await fetch(`${baseURL}?apikey=${apikey}&s=${query}&page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data: SearchResponse = await response.json();
      if (data.Response === "False") return rejectWithValue(data.Error || "No movies found");
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to search movies");
    }
  }
);

export const getMovieDetails = createAsyncThunk<MovieDetails, string, { rejectValue: string }>(
  "movies/getMovieDetails",
  async (imdbID, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}?apikey=${apikey}&i=${imdbID}&plot=full`);
      if (!response.ok) throw new Error("Failed to fetch movie details");
      const data = await response.json();
      if (data.Response === "False") return rejectWithValue(data.Error || "Movie details not found");
      return data as MovieDetails;
    } catch (error: unknown) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to get movie details");
    }
  }
);

interface MoviesState {
  movies: Movie[];
  currentPage: number;
  totalResults: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedMovie: MovieDetails | null;
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MoviesState = {
  movies: [],
  currentPage: 1,
  totalResults: 0,
  status: "idle",
  error: null,
  selectedMovie: null,
  detailsStatus: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies(state) {
      state.movies = [];
      state.currentPage = 1;
      state.totalResults = 0;
      state.status = "idle";
      state.error = null;
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
        state.status = "succeeded";
        if (state.currentPage === 1) {
          state.movies = action.payload.Search;
        } else {
          const newMovies = action.payload.Search.filter(
            (movie) => !state.movies.some((m) => m.imdbID === movie.imdbID)
          );
          state.movies = [...state.movies, ...newMovies];
        }
        state.totalResults = parseInt(action.payload.totalResults, 10);
        state.currentPage += 1;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch movies";
      })

      .addCase(getMovieDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getMovieDetails.fulfilled, (state, action: PayloadAction<MovieDetails>) => {
        state.detailsStatus = "succeeded";
        state.selectedMovie = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || "Failed to fetch movie details";
      });
  },
});

export const { clearMovies, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;