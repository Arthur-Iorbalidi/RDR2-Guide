import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultSearchValues from '@src/constants/defaultSearchValues';

const searchSlice = createSlice({
  name: 'search',
  initialState: defaultSearchValues,
  reducers: {
    changeMoviesSearch: (state, action: PayloadAction<string>) => {
      state.movies.search = action.payload;
    },
    // changeMoviesPage: (state, action: PayloadAction<number>) => {
    //   state.movies.page = action.payload;
    // },
    // changeMoviesSort: (state, action: PayloadAction<string>) => {
    //   state.movies.sortBy = action.payload;
    // },
    // changeMoviesSortOrder: (state, action: PayloadAction<string>) => {
    //   state.movies.sortOrder = action.payload;
    // },
    // resetMoviesPage: (state) => {
    //   state.movies.page = defaultSearchValues.movies.page;
    // },
  },
});

export const { changeMoviesSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
