import { FC, useState } from 'react';
import { Results } from './Results';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from './Pagination';

interface MainProps {
  results: unknown;
  totalPages: string;
}

export const Main: FC<MainProps> = (props) => {
  const [searchParams] = useSearchParams();
  const [itemId, setItemId] = useState<string | undefined>(undefined);

  let page = parseInt(searchParams.get('page') || '1');
  if (+page > +props.totalPages) {
    page = +props.totalPages;
  }

  return (
    <main>
      <div className="main-container">
        <Results {...props} setItemId={setItemId} />
        <div>{itemId}</div>
      </div>
      {Array.isArray(props.results) && props.results.length > 0 && (
        <Pagination totalPages={props.totalPages} currentPage={page} />
      )}
    </main>
  );
};
