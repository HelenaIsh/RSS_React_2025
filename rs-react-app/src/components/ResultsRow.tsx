import React, { FC } from 'react';

interface ResultsRowProps {
  element: unknown;
}

export const ResultsRow: FC <ResultsRowProps> = ({element}) => {
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
      <div className="row">
        <div className="row-name">{title}</div>
        <div className="row-description">{`Description of ${title}`}</div>
      </div>
    );
}
