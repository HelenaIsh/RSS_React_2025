import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ResultsRow } from './ResultsRow';
import { Pagination } from './Pagination';

interface ResultsProps {
  results: unknown;
  totalPages: number;
}

export const Results: FC<ResultsProps> = ({ results, totalPages }) => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');

  return typeof results === 'string' ? (
    <p>{results}</p>
  ) : Array.isArray(results) ? (
    <>
      <div className="row">
        <div className="row-name row-name--bold">Title</div>
        <div className="row-description row-description--bold">Description</div>
      </div>
      {results.map((el) => {
        return <ResultsRow element={el} key={el.uid} />;
      })}
      {results.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </>
  ) : null;
};
