import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface CardProps {
  element: unknown;
  id: string;
}

export const Card: FC<CardProps> = ({ element, id }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let title = '';
  if (element && typeof element === 'object') {
    title =
      'name' in element
        ? (element.name as string)
        : 'title' in element
          ? (element.title as string)
          : 'name';
  }

  const handleCardClick = async (e: React.MouseEvent) => {
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

  return (
    <div className="row" id={id}>
      <div className="row-name" onClick={handleCardClick}>
        {title}
      </div>
    </div>
  );
};
