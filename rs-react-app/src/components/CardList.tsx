import { FC } from 'react';

import { Card } from './Card';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface CardListProps {
  results: unknown;
  totalPages: string;
}

export const CardList: FC<CardListProps> = ({ results }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const closeDetails = () => {
    const queryString = searchParams.toString();
    navigate(`/?${queryString}`);
  };

  return (
    <>
      {typeof results === 'string' ? (
        <p>{results}</p>
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="results-table" onClick={closeDetails}>
          {results.map((el) => {
            return (
              <Card element={el} key={el.uid} id={el.uid} data-testid="card" />
            );
          })}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </>
  );
};
