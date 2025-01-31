import React from 'react';
import { SearchForm } from './SearchForm';

interface HeaderProps {
  setResults: (results: unknown) => void;
}

export class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header>
        <SearchForm setResults={this.props.setResults} />
      </header>
    );
  }
}
