import PaginationItem from '@src/components/PaginationItem/PaginationItem';
import images from '@src/constants/images';
import {
  arrowsGaps,
  firstPageNumber,
  paginationGaps,
} from '@src/constants/paginationSettings';
import { IPagination } from '@src/types/serverAPITypes';
import { memo } from 'react';

import styles from './Pagination.module.scss';

interface IProps {
  pagination: IPagination;
  handleChangePage: (count: number) => void;
}

const Pagination = ({ pagination, handleChangePage }: IProps) => {
  const handlePrevClick = () => {
    handleChangePage(arrowsGaps.back);
  };

  const handleNextClick = () => {
    handleChangePage(arrowsGaps.forward);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {pagination.current_page > firstPageNumber && (
          <button className={styles.previos_btn} onClick={handlePrevClick}>
            <img src={images.arrowBack} alt="previos" />
          </button>
        )}
        {paginationGaps.map((gap) => {
          const page = pagination.current_page + gap;
          if (page >= firstPageNumber && page <= pagination.total_pages) {
            return (
              <PaginationItem
                key={gap}
                page={page}
                gap={gap}
                handleChangePageCallback={handleChangePage}
              />
            );
          }
          return null;
        })}
        {pagination.current_page < pagination.total_pages && (
          <button className={styles.next_btn} onClick={handleNextClick}>
            <img src={images.arrowForward} alt="next" />
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Pagination);
