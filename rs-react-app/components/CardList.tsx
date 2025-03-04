import { FC } from 'react';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const CardList: FC = () => {
  const { results } = useSelector((state: RootState) => state.results);

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
