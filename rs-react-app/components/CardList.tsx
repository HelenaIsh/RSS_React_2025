import { FC } from 'react';
import { Card } from './Card';

export const CardList: FC<{ results: unknown }> = ({ results }) => {
  return (
    <>
      {typeof results === 'string' ? (
        <p data-testid="card-list">{results}</p>
      ) : Array.isArray(results) && results.length > 0 ? (
        <div className="results-table" data-testid="card-list">
          {results.map((el) => {
            return (
              <Card element={el} key={el.uid} id={el.uid} data-testid="card" />
            );
          })}
        </div>
      ) : (
        <p data-testid="card-list">No results found</p>
      )}
    </>
  );
};
