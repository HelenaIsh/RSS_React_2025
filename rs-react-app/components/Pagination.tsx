import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('page', newPage.toString());
    router.push(`?${updatedParams.toString()}`);
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
