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

export {
  toggleSavedAnimal,
  toggleSavedChallenge,
  toggleSavedCollectible,
  toggleSavedFish,
  toggleSavedHorse,
  toggleSavedPlant,
  toggleSavedSideQuest,
  toggleSavedStoryQuest,
  toggleSavedWeapon,
};
