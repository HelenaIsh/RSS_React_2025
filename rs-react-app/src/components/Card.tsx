import { FC } from 'react';

interface CardProps {
  element: unknown;
  id: string;
}

export const Card: FC<CardProps> = ({ element, id }) => {
  let title = '';
  if (element && typeof element === 'object') {
    title =
      'name' in element
        ? (element.name as string)
        : 'title' in element
          ? (element.title as string)
          : 'name';
  }

  return (
    <div className="row" id={id}>
      <div className="row-name">{title}</div>
    </div>
  );
};
