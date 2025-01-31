import React from 'react';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorButton } from './components/ErrorButton';
import { Header } from './components/Header';
import { Main } from './components/Main';

export default class App extends React.Component<object, { results: unknown }> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: undefined,
    };
  }
  render() {
    return (
      <div className="app">
        <ErrorBoundary
          fallback={<h2>Something went wrong. Please try again later.</h2>}
        >
          <Header setResults={(results) => this.setState({ results })} />
          <Main results={this.state.results} />
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}
