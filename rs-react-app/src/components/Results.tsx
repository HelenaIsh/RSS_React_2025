import { FC, useState } from 'react';

import { ResultsRow } from './ResultsRow';
import { fetchSingleData } from '../services/fetchSingleData';
import { Spinner } from './Spinner';

interface ResultsProps {
  results: unknown;
  totalPages: string;
  setItemId: (itemId: string | undefined) => void;
  setDetails: (details: string | undefined) => void;
}

export const Results: FC<ResultsProps> = ({
  results,
  setItemId,
  setDetails,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchSingleData(id);
      return JSON.stringify(data, null, 2);
    } catch (err: unknown) {
      return err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const row = target.closest('.row');
    if (row) {
      setItemId(row.id);
      setDetails(await fetchData(row.id));
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
      {loading && <Spinner />}
    </>
  );
};
