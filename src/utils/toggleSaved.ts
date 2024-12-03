import serverAPI from '@src/services/serverAPI';

const toggleSavedWeapon = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeWeaponFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addWeaponToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedHorse = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeHorseFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addHorseToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedStoryQuest = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeStoryQuestFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addStoryQuestToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedSideQuest = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeSideQuestFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addSideQuestToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedAnimal = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeAnimalFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addAnimalToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedPlant = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removePlantFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addPlantToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedFish = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeFishFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addFishToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedChallenge = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeChallengeFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addChallengeToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedCollectible = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeCollectibleFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addCollectibleToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedFaction = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeFactionFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addFactionToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedMiscellaneou = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeMiscellaneouFromSaved(
      id,
      succesRemove,
      unathorizedCallback,
    );
  } else {
    serverAPI.addMiscellaneouToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedRandomEncounter = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeRandomEncounterFromSaved(
      id,
      succesRemove,
      unathorizedCallback,
    );
  } else {
    serverAPI.addRandomEncounterToSaved(id, succesAdd, unathorizedCallback);
  }
};

const toggleSavedTableGame = (
  id: number,
  isInSaved: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInSaved) {
    serverAPI.removeTableGameFromSaved(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addTableGameToSaved(id, succesAdd, unathorizedCallback);
  }
};

export {
  toggleSavedAnimal,
  toggleSavedChallenge,
  toggleSavedCollectible,
  toggleSavedFaction,
  toggleSavedFish,
  toggleSavedHorse,
  toggleSavedMiscellaneou,
  toggleSavedPlant,
  toggleSavedRandomEncounter,
  toggleSavedSideQuest,
  toggleSavedStoryQuest,
  toggleSavedTableGame,
  toggleSavedWeapon,
};
