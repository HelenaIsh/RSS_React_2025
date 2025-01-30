import React from 'react';
import { SearchForm } from './SearchForm';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <SearchForm />
      </header>
    );
  }
}
