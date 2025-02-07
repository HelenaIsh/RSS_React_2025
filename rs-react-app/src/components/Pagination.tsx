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
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div>
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Назад
      </button>
      <span> Страница {currentPage} </span>
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Вперед
      </button>
    </div>
  );
};
