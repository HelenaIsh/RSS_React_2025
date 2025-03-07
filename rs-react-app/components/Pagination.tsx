'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const Pagination: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalPages } = useSelector((state: RootState) => state.results);
  let currentPage = parseInt(searchParams.get('page') || '0', 10);
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

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
