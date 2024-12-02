const sortOptions = {
  weapons: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
  ],
  horses: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
  ],
  storyQuests: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
  ],
  sideQuests: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
  ],
  challenges: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
  ],
  collectibles: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
  ],
};

interface ISortOption {
  title: string;
  value: {
    sortBy: string;
    sortOrder: string;
  };
}

export type { ISortOption };
export default sortOptions;
