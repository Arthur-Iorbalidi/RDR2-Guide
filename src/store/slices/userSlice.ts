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

    removeWeaponFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.weapons = state.userInfo.weapons.filter(
          (weapon) => weapon.id !== action.payload,
        );
      }
    },

    addWeaponToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.weapons.some((weapon) => weapon.id === action.payload)
      ) {
        state.userInfo.weapons.push({ id: action.payload });
      }
    },

    removeHorseFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.horses = state.userInfo.horses.filter(
          (horse) => horse.id !== action.payload,
        );
      }
    },

    addHorseToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.horses.some((horse) => horse.id === action.payload)
      ) {
        state.userInfo.horses.push({ id: action.payload });
      }
    },

    removeStoryQuestFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.storyQuests = state.userInfo.storyQuests.filter(
          (storyQuest) => storyQuest.id !== action.payload,
        );
      }
    },

    addStoryQuestToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.storyQuests.some(
          (StoryQuest) => StoryQuest.id === action.payload,
        )
      ) {
        state.userInfo.storyQuests.push({ id: action.payload });
      }
    },

    removeSideQuestFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.sideQuests = state.userInfo.sideQuests.filter(
          (sideQuest) => sideQuest.id !== action.payload,
        );
      }
    },

    addSideQuestToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.sideQuests.some(
          (sideQuest) => sideQuest.id === action.payload,
        )
      ) {
        state.userInfo.sideQuests.push({ id: action.payload });
      }
    },
  },
});

export const {
  changeIsAuthorized,
  changeUserInfo,
  addHorseToSaved,
  addSideQuestToSaved,
  addStoryQuestToSaved,
  addWeaponToSaved,
  removeHorseFromSaved,
  removeSideQuestFromSaved,
  removeStoryQuestFromSaved,
  removeWeaponFromSaved,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
