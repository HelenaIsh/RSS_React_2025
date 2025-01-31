import React from 'react';
import { Results } from './Results';

interface MainProps {
  results: unknown;
}

export class Main extends React.Component<MainProps> {
  render(): React.ReactNode {
    return (
      <main>
        <Results results={this.props.results} />
      </main>
    );
  }
}
