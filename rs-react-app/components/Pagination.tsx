import { useRouter } from 'next/router';
import { FC } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
}) => {
  const router = useRouter();

  const changePage = (newPage: number) => {
    const { query } = router;

    const updatedQuery = { ...query, page: newPage.toString() };

    router.push({
      pathname: router.pathname,
      query: updatedQuery,
    });
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
