import React, { FC } from 'react';

interface ResultsRowProps {
  element: unknown;
  id: string;
}

export const ResultsRow: FC<ResultsRowProps> = ({ element, id }) => {
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
      <div className="row-description">{`Description of ${title}`}</div>
    </div>
  );
};
