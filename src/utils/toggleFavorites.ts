import serverAPI from '@src/services/serverAPI';

const toggleFavoriteMovie = (
  id: number,
  isInFavorites: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInFavorites) {
    serverAPI.removeMovieFromFavorites(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addMovieToFavorites(id, succesAdd, unathorizedCallback);
  }
};

const toggleFavoriteActor = (
  id: number,
  isInFavorites: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInFavorites) {
    serverAPI.removeActorFromFavorites(id, succesRemove, unathorizedCallback);
  } else {
    serverAPI.addActorToFavorites(id, succesAdd, unathorizedCallback);
  }
};

const toggleFavoriteDirector = (
  id: number,
  isInFavorites: boolean,
  succesAdd: (id: number) => void = () => {},
  succesRemove: (id: number) => void = () => {},
  unathorizedCallback: () => void = () => {},
) => {
  if (isInFavorites) {
    serverAPI.removeDirectorFromFavorites(
      id,
      succesRemove,
      unathorizedCallback,
    );
  } else {
    serverAPI.addDirectorToFavorites(id, succesAdd, unathorizedCallback);
  }
};

export { toggleFavoriteActor, toggleFavoriteDirector, toggleFavoriteMovie };
