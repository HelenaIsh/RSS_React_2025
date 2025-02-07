import { FC } from 'react';

import { ResultsRow } from './ResultsRow';

interface ResultsProps {
  results: unknown;
  totalPages: string;
  setItemId: (itemId: string | undefined) => void;
}

export const Results: FC<ResultsProps> = ({ results, setItemId }) => {
  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const row = target.closest('.row');
    if (row) {
      setItemId(row.id);
    }
  };

  return typeof results === 'string' ? (
    <p>{results}</p>
  ) : Array.isArray(results) ? (
    <div className="results-table">
      <div className="row">
        <div className="row-name row-name--bold">Title</div>
        <div className="row-description row-description--bold">Description</div>
      </div>
      <div onClick={handleRowClick}>
        {results.map((el) => {
          return <ResultsRow element={el} key={el.uid} id={el.uid} />;
        })}
      </div>
    </div>
  ) : null;
};
