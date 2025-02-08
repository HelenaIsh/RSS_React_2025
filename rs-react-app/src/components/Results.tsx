import { FC } from 'react';

import { ResultsRow } from './ResultsRow';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ResultsProps {
  results: unknown;
  totalPages: string;
}

export const Results: FC<ResultsProps> = ({ results }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleRowClick = async (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const row = target.closest('.row');
    const queryString = searchParams.toString();
    if (row) {
      navigate(`/details/${row.id}?${queryString}`);
    }
  };

  return (
    <>
      {typeof results === 'string' ? (
        <p>{results}</p>
      ) : Array.isArray(results) ? (
        <div className="results-table">
          <div onClick={handleRowClick}>
            {results.map((el) => {
              return <ResultsRow element={el} key={el.uid} id={el.uid} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
