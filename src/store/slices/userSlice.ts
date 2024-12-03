import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@src/types/serverAPITypes';

interface UserState {
  isAuthorized: boolean | undefined;
  userInfo?: IUser;
}

const mockUserInfo = {
  id: 1,
  name: 'A',
  surname: 'A',
  email: 'A',
  weapons: [],
  horses: [],
  storyQuests: [],
  sideQuests: [],
  animals: [],
  plants: [],
  fishes: [],
  challenges: [],
  collectibles: [],
  factions: [],
  miscellaneous: [],
  randomEncounters: [],
  tableGames: [],
};

const initialState: UserState = {
  isAuthorized: undefined,
  // userInfo: undefined,
  userInfo: mockUserInfo,
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

    removeAnimalFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.animals = state.userInfo.animals.filter(
          (animal) => animal.id !== action.payload,
        );
      }
    },

    addAnimalToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.animals.some((animal) => animal.id === action.payload)
      ) {
        state.userInfo.animals.push({ id: action.payload });
      }
    },

    removePlantFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.plants = state.userInfo.plants.filter(
          (plant) => plant.id !== action.payload,
        );
      }
    },

    addPlantToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.plants.some((plant) => plant.id === action.payload)
      ) {
        state.userInfo.plants.push({ id: action.payload });
      }
    },

    removeFishFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.plants = state.userInfo.plants.filter(
          (plant) => plant.id !== action.payload,
        );
      }
    },

    addFishToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.fishes.some((fish) => fish.id === action.payload)
      ) {
        state.userInfo.fishes.push({ id: action.payload });
      }
    },

    removeChallengeFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.challenges = state.userInfo.challenges.filter(
          (plant) => plant.id !== action.payload,
        );
      }
    },

    addChallengeToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.challenges.some(
          (challenge) => challenge.id === action.payload,
        )
      ) {
        state.userInfo.challenges.push({ id: action.payload });
      }
    },

    removeCollectibleFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.collectibles = state.userInfo.collectibles.filter(
          (plant) => plant.id !== action.payload,
        );
      }
    },

    addCollectibleToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.collectibles.some(
          (collectible) => collectible.id === action.payload,
        )
      ) {
        state.userInfo.collectibles.push({ id: action.payload });
      }
    },

    removeFactionFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.factions = state.userInfo.factions.filter(
          (faction) => faction.id !== action.payload,
        );
      }
    },

    addFactionToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.factions.some(
          (faction) => faction.id === action.payload,
        )
      ) {
        state.userInfo.factions.push({ id: action.payload });
      }
    },

    removeMiscellaneouFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.miscellaneous = state.userInfo.miscellaneous.filter(
          (miscellaneou) => miscellaneou.id !== action.payload,
        );
      }
    },

    addMiscellaneouToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.miscellaneous.some(
          (miscellaneou) => miscellaneou.id === action.payload,
        )
      ) {
        state.userInfo.miscellaneous.push({ id: action.payload });
      }
    },

    removeRandomEncounterFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.randomEncounters =
          state.userInfo.randomEncounters.filter(
            (randomEncounter) => randomEncounter.id !== action.payload,
          );
      }
    },

    addRandomEncounterToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.randomEncounters.some(
          (randomEncounter) => randomEncounter.id === action.payload,
        )
      ) {
        state.userInfo.randomEncounters.push({ id: action.payload });
      }
    },

    removeTableGameFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.tableGames = state.userInfo.tableGames.filter(
          (tableGame) => tableGame.id !== action.payload,
        );
      }
    },

    addTableGameToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.tableGames.some(
          (tableGame) => tableGame.id === action.payload,
        )
      ) {
        state.userInfo.tableGames.push({ id: action.payload });
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
  removeAnimalFromSaved,
  addAnimalToSaved,
  removePlantFromSaved,
  addPlantToSaved,
  removeFishFromSaved,
  addFishToSaved,
  removeChallengeFromSaved,
  addChallengeToSaved,
  removeCollectibleFromSaved,
  addCollectibleToSaved,
  removeFactionFromSaved,
  addFactionToSaved,
  removeMiscellaneouFromSaved,
  addMiscellaneouToSaved,
  removeRandomEncounterFromSaved,
  addRandomEncounterToSaved,
  removeTableGameFromSaved,
  addTableGameToSaved,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
