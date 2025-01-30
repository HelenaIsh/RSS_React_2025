import React from 'react';
import { Spinner } from './Spinner';

interface SearchFormState {
  name: string;
  results: string[] | [];
  loading: boolean;
  error: string | null;
}

export class SearchForm extends React.Component<{}, SearchFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: localStorage.getItem('search') || '',
      results: [],
      loading: false,
      error: null,
    };
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) return;

    this.setState({ loading: true, error: null });

    try {
      localStorage.setItem('search', name);
      const response = await fetch(
        `https://stapi.co/api/v1/rest/${name}/search`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      this.setState({ results: data.items || [] });
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message });
      } else {
        this.setState({ error: 'An unknown error occurred' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value.trim() });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="search-form">
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        {this.state.loading && <Spinner />}
      </>
    );
  }
}
