import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface WatchlistState {
  movies: Movie[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addMovie(state, action: PayloadAction<Movie>) {
      if (!state.movies.find((movie) => movie.imdbID === action.payload.imdbID)) {
        state.movies.push(action.payload);
      }
    },
    removeMovie(state, action: PayloadAction<string>) {
      state.movies = state.movies.filter((movie) => movie.imdbID !== action.payload);
    },
  },
});

export const { addMovie, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;
