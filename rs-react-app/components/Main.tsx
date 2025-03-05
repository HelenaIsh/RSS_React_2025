import { FC } from 'react';
import { CardList } from './CardList';
import { Pagination } from './Pagination';
import { useSelector } from 'react-redux';
import { Flayout } from './Flayout';
import { usePathname, useSearchParams } from 'next/navigation';
import { DetailedCard } from './DetailedCard';
import { RootState } from '../store/store';
import { selectAllChecks } from '../features/check';

export const Main: FC = () => {
  const { results, totalPages } = useSelector(
    (state: RootState) => state.results
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDetailsPage = pathname.startsWith('/details/');

  let page = parseInt(searchParams.get('page') || '0', 10);
  if (page > totalPages) {
    page = totalPages;
  }
  const checkedItems = useSelector(selectAllChecks);

  return (
    <main>
      <div className="main-container">
        <CardList />
        {isDetailsPage && <DetailedCard />}
      </div>
      {Array.isArray(results) && results.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
      {checkedItems.length > 0 && <Flayout />}
    </main>
  );
};
