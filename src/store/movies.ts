import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../types";

const initialState: { trendingMovies: Movie[]; upcomingMovies: Movie[] } = {
  trendingMovies: [],
  upcomingMovies: [],
};

const slice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addTrendingMovies(state, action) {
      state.trendingMovies = action.payload.trendingMovies;
    },
    addUpcomingMovies(state, action): any {
      state.upcomingMovies = action.payload.upcomingMovies;
    },
  },
});

export default slice;
