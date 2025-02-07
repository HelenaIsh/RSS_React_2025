import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  totalPages: string;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
}) => {
  const [, setSearchParams] = useSearchParams();

  const changePage = (newPage: number) => {
    if (newPage < 0 || newPage > +totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="pagination">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage < 1}
      >
        Назад
      </button>
      <span> Страница {+currentPage} </span>
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= +totalPages}
      >
        Вперед
      </button>
    </div>
  );
};
