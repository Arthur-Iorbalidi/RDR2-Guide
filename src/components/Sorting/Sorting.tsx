import styles from './Sorting.module.scss';

interface IProps {
  sortOptions: string[];
  currentSortOptionIndex: number;
  handleChangeSorting: (index: number) => void;
}

const Sorting = ({
  sortOptions,
  currentSortOptionIndex,
  handleChangeSorting,
}: IProps) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeSorting(Number(event.target.value));
  };

  return (
    <div className={styles.select_wrapper}>
      <select
        className={styles.select}
        name="sorting"
        onChange={onChange}
        value={currentSortOptionIndex}
      >
        {sortOptions.map((sortOption, index) => (
          <option value={index} key={sortOption}>
            {sortOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
