import { FC } from 'react';
import { CardList } from './CardList';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from './Pagination';
import { useSelector } from 'react-redux';
import { selectAllChecks } from '../../features/check';
import { Flayout } from './Flayout';
import { RootState } from '../../app/store';

export const Main: FC = () => {
  const [searchParams] = useSearchParams();
  const { results, totalPages } = useSelector(
    (state: RootState) => state.results
  );

  let page = parseInt(searchParams.get('page') || '0');
  if (page > totalPages) {
    page = totalPages;
  }
  const checkedItems = useSelector(selectAllChecks);

  return (
    <main>
      <div className="main-container">
        <CardList />
        {location.pathname.startsWith('/details/') && <Outlet />}
      </div>
      {Array.isArray(results) && results.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
      {checkedItems.length > 0 && <Flayout />}
    </main>
  );
};
