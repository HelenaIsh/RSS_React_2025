import { FC } from 'react';
import { Card } from './Card';

interface CardListProps {
  results: unknown;
  totalPages: string;
}

export const CardList: FC<CardListProps> = ({ results }) => {
  return (
    <>
      {typeof results === 'string' ? (
        <p>{results}</p>
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="results-table">
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
