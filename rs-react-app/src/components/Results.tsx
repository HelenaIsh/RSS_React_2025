import React from 'react';
import { ResultsRow } from './ResultsRow';

interface ResultsProps {
  results: unknown;
}

export class Results extends React.Component<ResultsProps> {
  constructor(props: ResultsProps) {
    super(props);
  }

  render(): React.ReactNode {
    return typeof this.props.results === 'string' ? (
      <p>{this.props.results}</p>
    ) : Array.isArray(this.props.results) ? (
      <>
        <div className="row">
          <div className="row-name row-name--bold">Title</div>
          <div className="row-description row-description--bold">
            Description
          </div>
        </div>
        {this.props.results.map((el) => (
          <ResultsRow element={el} />
        ))}
      </>
    ) : null;
  }
}
