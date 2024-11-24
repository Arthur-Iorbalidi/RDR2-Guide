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

export {
  toggleSavedHorse,
  toggleSavedSideQuest,
  toggleSavedStoryQuest,
  toggleSavedWeapon,
};
