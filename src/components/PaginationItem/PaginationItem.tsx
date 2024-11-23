import styles from './PaginationItem.module.scss';

interface IProps {
  page: number;
  gap: number;
  handleChangePageCallback: (count: number) => void;
}

const PaginationItem = ({ page, gap, handleChangePageCallback }: IProps) => {
  const handleChangePage = () => {
    if (gap === 0) {
      return;
    }

    handleChangePageCallback(gap);
  };

  return (
    <button
      onClick={handleChangePage}
      className={`${styles.pagination_item} ${gap === 0 ? styles.active : ''}`}
    >
      {page}
    </button>
  );
};

export default PaginationItem;
