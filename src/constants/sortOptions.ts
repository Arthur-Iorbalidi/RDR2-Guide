const sortOptions = {
  movies: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
    {
      title: 'Title ASC',
      value: {
        sortBy: 'title',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Title DESC',
      value: {
        sortBy: 'title',
        sortOrder: 'DESC',
      },
    },
    {
      title: 'Creation date ASC',
      value: {
        sortBy: 'creationDate',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Creation date DESC',
      value: {
        sortBy: 'creationDate',
        sortOrder: 'DESC',
      },
    },
    {
      title: 'Budget ASC',
      value: {
        sortBy: 'budget',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Budget DESC',
      value: {
        sortBy: 'budget',
        sortOrder: 'DESC',
      },
    },
  ],
  actors: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
    {
      title: 'Name ASC',
      value: {
        sortBy: 'name',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Name DESC',
      value: {
        sortBy: 'name',
        sortOrder: 'DESC',
      },
    },
    {
      title: 'Birthday ASC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Birthday DESC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'DESC',
      },
    },
    {
      title: 'Height ASC',
      value: {
        sortBy: 'height',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Height DESC',
      value: {
        sortBy: 'height',
        sortOrder: 'DESC',
      },
    },
  ],
  directors: [
    {
      title: 'None',
      value: {
        sortBy: '',
        sortOrder: '',
      },
    },
    {
      title: 'Name ASC',
      value: {
        sortBy: 'name',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Name DESC',
      value: {
        sortBy: 'name',
        sortOrder: 'DESC',
      },
    },
    {
      title: 'Birthday ASC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'ASC',
      },
    },
    {
      title: 'Birthday DESC',
      value: {
        sortBy: 'birthday',
        sortOrder: 'DESC',
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
