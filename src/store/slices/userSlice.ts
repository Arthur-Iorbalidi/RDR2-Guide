import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@src/types/serverAPITypes';

interface UserState {
  isAuthorized: boolean | undefined;
  userInfo?: IUser;
}

const initialState: UserState = {
  isAuthorized: undefined,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },

    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    // removeMovieFromFavorites: (state, action: PayloadAction<number>) => {
    //   if (state.userInfo) {
    //     state.userInfo.movies = state.userInfo.movies.filter(
    //       (movie) => movie.id !== action.payload,
    //     );
    //   }
    // },

    // addMovieToFavorites: (state, action: PayloadAction<number>) => {
    //   if (
    //     state.userInfo &&
    //     !state.userInfo.movies.some((movie) => movie.id === action.payload)
    //   ) {
    //     state.userInfo.movies.push({ id: action.payload });
    //   }
    // },
  },
});

export const { changeIsAuthorized, changeUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
