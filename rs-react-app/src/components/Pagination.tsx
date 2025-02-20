import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
}) => {
  const [, setSearchParams] = useSearchParams();

  const changePage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="pagination" data-testid="pagination">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={+currentPage < 1}
      >
        Back
      </button>
      <span>
        Page {+currentPage} / {totalPages - 1}
      </span>
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={+currentPage >= totalPages - 1}
      >
        Forward
      </button>
    </div>
  );
};
