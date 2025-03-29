import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ISavedAnimalsResponse,
  ISavedChallengesResponse,
  ISavedCollectibleResponse,
  ISavedFactionsResponse,
  ISavedFishesResponse,
  ISavedHorsesResponse,
  ISavedMiscellaneousResponse,
  ISavedPlantsResponse,
  ISavedRandomEncountersResponse,
  ISavedSideQuestsResponse,
  ISavedStoryQuestsResponse,
  ISavedTableGamesResponse,
  ISavedWeaponsResponse,
  IUser,
} from '@src/types/serverAPITypes';

interface UserState {
  isAuthorized: boolean | undefined;
  userInfo?: IUser;
}

// const mockUserInfo = {
//   id: 1,
//   name: 'A',
//   surname: 'A',
//   email: 'A',
//   weapons: [],
//   horses: [],
//   storyQuests: [],
//   sideQuests: [],
//   animals: [],
//   plants: [],
//   fishes: [],
//   challenges: [],
//   collectibles: [],
//   factions: [],
//   miscellaneous: [],
//   randomEncounters: [],
//   tableGames: [],
// };

const initialState: UserState = {
  isAuthorized: undefined,
  userInfo: undefined,
  // userInfo: mockUserInfo,
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

    setSavedWeapons: (
      state,
      action: PayloadAction<ISavedWeaponsResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.weapons = action.payload;
      }
    },

    setSavedHorses: (
      state,
      action: PayloadAction<ISavedHorsesResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.horses = action.payload;
      }
    },

    setSavedStoryQuests: (
      state,
      action: PayloadAction<ISavedStoryQuestsResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.storyQuests = action.payload;
      }
    },

    setSavedSideQuests: (
      state,
      action: PayloadAction<ISavedSideQuestsResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.sideQuests = action.payload;
      }
    },

    setSavedAnimals: (
      state,
      action: PayloadAction<ISavedAnimalsResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.animals = action.payload;
      }
    },

    setSavedChallenges: (
      state,
      action: PayloadAction<ISavedChallengesResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.challenges = action.payload;
      }
    },

    setSavedCollectibles: (
      state,
      action: PayloadAction<ISavedCollectibleResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.collectibles = action.payload;
      }
    },

    setSavedFactions: (
      state,
      action: PayloadAction<ISavedFactionsResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.factions = action.payload;
      }
    },

    setSavedFishes: (
      state,
      action: PayloadAction<ISavedFishesResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.fishes = action.payload;
      }
    },

    setSavedMiscellaneous: (
      state,
      action: PayloadAction<ISavedMiscellaneousResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.miscellaneous = action.payload;
      }
    },

    setSavedPlants: (
      state,
      action: PayloadAction<ISavedPlantsResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.plants = action.payload;
      }
    },

    setSavedRandomEncounter: (
      state,
      action: PayloadAction<ISavedRandomEncountersResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.randomEncounters = action.payload;
      }
    },

    setSavedTableGames: (
      state,
      action: PayloadAction<ISavedTableGamesResponse['data'] | undefined>,
    ) => {
      if (state.userInfo) {
        state.userInfo.tableGames = action.payload;
      }
    },

    removeWeaponFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.weapons = state.userInfo.weapons?.filter(
          (weapon) => weapon.weaponId !== action.payload,
        );
      }
    },

    addWeaponToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.weapons?.some(
          (weapon) => weapon.weaponId === action.payload,
        )
      ) {
        state.userInfo.weapons?.push({ weaponId: action.payload });
      }
    },

    removeHorseFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.horses = state.userInfo.horses?.filter(
          (horse) => horse.horseId !== action.payload,
        );
      }
    },

    addHorseToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.horses?.some(
          (horse) => horse.horseId === action.payload,
        )
      ) {
        state.userInfo.horses?.push({ horseId: action.payload });
      }
    },

    removeStoryQuestFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.storyQuests = state.userInfo.storyQuests?.filter(
          (storyQuest) => storyQuest.storyquestId !== action.payload,
        );
      }
    },

    addStoryQuestToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.storyQuests?.some(
          (StoryQuest) => StoryQuest.storyquestId === action.payload,
        )
      ) {
        state.userInfo.storyQuests?.push({ storyquestId: action.payload });
      }
    },

    removeSideQuestFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.sideQuests = state.userInfo.sideQuests?.filter(
          (sideQuest) => sideQuest.sidequestId !== action.payload,
        );
      }
    },

    addSideQuestToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.sideQuests?.some(
          (sideQuest) => sideQuest.sidequestId === action.payload,
        )
      ) {
        state.userInfo.sideQuests?.push({ sidequestId: action.payload });
      }
    },

    removeAnimalFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.animals = state.userInfo.animals?.filter(
          (animal) => animal.animalId !== action.payload,
        );
      }
    },

    addAnimalToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.animals?.some(
          (animal) => animal.animalId === action.payload,
        )
      ) {
        state.userInfo.animals?.push({ animalId: action.payload });
      }
    },

    removePlantFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.plants = state.userInfo.plants?.filter(
          (plant) => plant.plantId !== action.payload,
        );
      }
    },

    addPlantToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.plants?.some(
          (plant) => plant.plantId === action.payload,
        )
      ) {
        state.userInfo.plants?.push({ plantId: action.payload });
      }
    },

    removeFishFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.fishes = state.userInfo.fishes?.filter(
          (fish) => fish.fishId !== action.payload,
        );
      }
    },

    addFishToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.fishes?.some((fish) => fish.fishId === action.payload)
      ) {
        state.userInfo.fishes?.push({ fishId: action.payload });
      }
    },

    removeChallengeFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.challenges = state.userInfo.challenges?.filter(
          (challenge) => challenge.challengeId !== action.payload,
        );
      }
    },

    addChallengeToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.challenges?.some(
          (challenge) => challenge.challengeId === action.payload,
        )
      ) {
        state.userInfo.challenges?.push({ challengeId: action.payload });
      }
    },

    removeCollectibleFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.collectibles = state.userInfo.collectibles?.filter(
          (collectible) => collectible.collectibleId !== action.payload,
        );
      }
    },

    addCollectibleToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.collectibles?.some(
          (collectible) => collectible.collectibleId === action.payload,
        )
      ) {
        state.userInfo.collectibles?.push({ collectibleId: action.payload });
      }
    },

    removeFactionFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.factions = state.userInfo.factions?.filter(
          (faction) => faction.factionId !== action.payload,
        );
      }
    },

    addFactionToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.factions?.some(
          (faction) => faction.factionId === action.payload,
        )
      ) {
        state.userInfo.factions?.push({ factionId: action.payload });
      }
    },

    removeMiscellaneouFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.miscellaneous = state.userInfo.miscellaneous?.filter(
          (miscellaneou) => miscellaneou.miscellaneouId !== action.payload,
        );
      }
    },

    addMiscellaneouToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.miscellaneous?.some(
          (miscellaneou) => miscellaneou.miscellaneouId === action.payload,
        )
      ) {
        state.userInfo.miscellaneous?.push({ miscellaneouId: action.payload });
      }
    },

    removeRandomEncounterFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.randomEncounters =
          state.userInfo.randomEncounters?.filter(
            (randomEncounter) =>
              randomEncounter.randomencounterId !== action.payload,
          );
      }
    },

    addRandomEncounterToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.randomEncounters?.some(
          (randomEncounter) =>
            randomEncounter.randomencounterId === action.payload,
        )
      ) {
        state.userInfo.randomEncounters?.push({
          randomencounterId: action.payload,
        });
      }
    },

    removeTableGameFromSaved: (state, action: PayloadAction<number>) => {
      if (state.userInfo) {
        state.userInfo.tableGames = state.userInfo.tableGames?.filter(
          (tableGame) => tableGame.tablegameId !== action.payload,
        );
      }
    },

    addTableGameToSaved: (state, action: PayloadAction<number>) => {
      if (
        state.userInfo &&
        !state.userInfo.tableGames?.some(
          (tableGame) => tableGame.tablegameId === action.payload,
        )
      ) {
        state.userInfo.tableGames?.push({ tablegameId: action.payload });
      }
    },
  },
});

export const {
  changeIsAuthorized,
  changeUserInfo,
  setSavedWeapons,
  setSavedAnimals,
  setSavedChallenges,
  setSavedCollectibles,
  setSavedFactions,
  setSavedFishes,
  setSavedHorses,
  setSavedMiscellaneous,
  setSavedPlants,
  setSavedRandomEncounter,
  setSavedSideQuests,
  setSavedStoryQuests,
  setSavedTableGames,
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
