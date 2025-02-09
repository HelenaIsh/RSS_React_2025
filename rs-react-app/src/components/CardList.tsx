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

  const handleRowClick = async (e: React.MouseEvent) => {
    if (!location.pathname.startsWith('/details/')) {
      e.stopPropagation();
    }
    const target = e.target as HTMLElement;
    const row = target.closest('.row');
    const queryString = searchParams.toString();
    if (row) {
      navigate(`/details/${row.id}?${queryString}`);
    }
  };

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
          <div onClick={handleRowClick}>
            {results.map((el) => {
              return (
                <Card
                  element={el}
                  key={el.uid}
                  id={el.uid}
                  data-testid="card"
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p>No results found</p>
      )}
    </>
  );
};
