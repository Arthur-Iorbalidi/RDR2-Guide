import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import defaultSearchValues from '@src/constants/defaultSearchValues';

const searchSlice = createSlice({
  name: 'search',
  initialState: defaultSearchValues,
  reducers: {
    changeWeaponsSearch: (state, action: PayloadAction<string>) => {
      state.weapons.search = action.payload;
    },
    changeWeaponsPage: (state, action: PayloadAction<number>) => {
      state.weapons.page = action.payload;
    },
    changeWeaponsSort: (state, action: PayloadAction<string>) => {
      state.weapons.sortBy = action.payload;
    },
    changeWeaponsSortOrder: (state, action: PayloadAction<string>) => {
      state.weapons.sortOrder = action.payload;
    },
    resetWeaponsPage: (state) => {
      state.weapons.page = defaultSearchValues.weapons.page;
    },

    changeHorsesSearch: (state, action: PayloadAction<string>) => {
      state.horses.search = action.payload;
    },
    changeHorsesPage: (state, action: PayloadAction<number>) => {
      state.horses.page = action.payload;
    },
    changeHorsesSort: (state, action: PayloadAction<string>) => {
      state.horses.sortBy = action.payload;
    },
    changeHorsesSortOrder: (state, action: PayloadAction<string>) => {
      state.horses.sortOrder = action.payload;
    },
    resetHorsesPage: (state) => {
      state.horses.page = defaultSearchValues.horses.page;
    },

    changeStoryQuestsSearch: (state, action: PayloadAction<string>) => {
      state.storyQuests.search = action.payload;
    },
    changeStoryQuestsPage: (state, action: PayloadAction<number>) => {
      state.storyQuests.page = action.payload;
    },
    changeStoryQuestsSort: (state, action: PayloadAction<string>) => {
      state.storyQuests.sortBy = action.payload;
    },
    changeStoryQuestsSortOrder: (state, action: PayloadAction<string>) => {
      state.storyQuests.sortOrder = action.payload;
    },
    resetStoryQuestsPage: (state) => {
      state.storyQuests.page = defaultSearchValues.storyQuests.page;
    },

    changeSideQuestsSearch: (state, action: PayloadAction<string>) => {
      state.sideQuests.search = action.payload;
    },
    changeSideQuestsPage: (state, action: PayloadAction<number>) => {
      state.sideQuests.page = action.payload;
    },
    changeSideQuestsSort: (state, action: PayloadAction<string>) => {
      state.sideQuests.sortBy = action.payload;
    },
    changeSideQuestsSortOrder: (state, action: PayloadAction<string>) => {
      state.sideQuests.sortOrder = action.payload;
    },
    resetSideQuestsPage: (state) => {
      state.sideQuests.page = defaultSearchValues.sideQuests.page;
    },
  },
});

export const {
  changeWeaponsPage,
  changeWeaponsSearch,
  changeWeaponsSort,
  changeWeaponsSortOrder,
  changeHorsesPage,
  changeHorsesSearch,
  changeHorsesSort,
  changeHorsesSortOrder,
  changeSideQuestsPage,
  changeSideQuestsSearch,
  changeSideQuestsSort,
  changeSideQuestsSortOrder,
  changeStoryQuestsPage,
  changeStoryQuestsSearch,
  changeStoryQuestsSort,
  changeStoryQuestsSortOrder,
  resetHorsesPage,
  resetSideQuestsPage,
  resetStoryQuestsPage,
  resetWeaponsPage,
} = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
