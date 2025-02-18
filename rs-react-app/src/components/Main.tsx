import { FC } from 'react';
import { CardList } from './CardList';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Pagination } from './Pagination';
import { useSelector } from 'react-redux';
import { selectAllChecks } from '../../features/check';
import { Flayout } from './Flayout';

interface MainProps {
  results: unknown;
  totalPages: string;
}

export const Main: FC<MainProps> = (props) => {
  const [searchParams] = useSearchParams();

  let page = parseInt(searchParams.get('page') || '0');
  if (page > +props.totalPages) {
    page = +props.totalPages;
  }
  const checkedItems = useSelector(selectAllChecks);

  return (
    <main>
      <div className="main-container">
        <CardList {...props} />
        {location.pathname.startsWith('/details/') && <Outlet />}
      </div>
      {Array.isArray(props.results) && props.results.length > 0 && (
        <Pagination totalPages={props.totalPages} currentPage={page} />
      )}
      {checkedItems.length > 0 && <Flayout />}
    </main>
  );
};
