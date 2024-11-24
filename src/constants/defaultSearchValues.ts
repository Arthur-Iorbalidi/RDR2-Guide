import { ISearch } from '@src/types/serverAPITypes';

const defaultSearchValues: {
  weapons: ISearch;
  horses: ISearch;
  storyQuests: ISearch;
  sideQuests: ISearch;
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
};
const debounceInterval = 500;

export default defaultSearchValues;
export { debounceInterval };
