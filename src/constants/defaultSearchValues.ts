import { ISearch } from '@src/types/serverAPITypes';

const defaultSearchValues: {
  weapons: ISearch;
  horses: ISearch;
  storyQuests: ISearch;
  sideQuests: ISearch;
  animals: ISearch;
  plants: ISearch;
  fishes: ISearch;
  challenges: ISearch;
  collectibles: ISearch;
} = {
  weapons: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  horses: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  storyQuests: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  sideQuests: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  animals: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  plants: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  fishes: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
  challenges: {
    sortBy: '',
    sortOrder: '',
  },

  collectibles: {
    search: '',
    sortBy: '',
    sortOrder: '',
    page: undefined,
    limit: undefined,
  },
};
const debounceInterval = 500;

export default defaultSearchValues;
export { debounceInterval };
