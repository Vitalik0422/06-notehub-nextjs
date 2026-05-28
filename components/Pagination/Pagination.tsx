import css from './Pagination.module.css';
import type { ReactPaginateProps } from 'react-paginate';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  setPage: (value: number) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  const handlePageChange: ReactPaginateProps['onPageChange'] = ({
    selected,
  }) => {
    setPage(selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageChange}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={page - 1}
      previousLabel="<"
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
