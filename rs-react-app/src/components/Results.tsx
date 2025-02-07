import React, { FC } from 'react';
import { ResultsRow } from './ResultsRow';

interface ResultsProps {
  results: unknown;
}

export const Results: FC<ResultsProps> = ({ results }) => {
    return typeof results === 'string' ? (
      <p>{results}</p>
    ) : Array.isArray(results) ? (
      <>
        <div className="row">
          <div className="row-name row-name--bold">Title</div>
          <div className="row-description row-description--bold">
            Description
          </div>
        </div>
        {results.map((el) => (
          <ResultsRow element={el} key={el.toString()} />
        ))}
      </>
    ) : null;
}
