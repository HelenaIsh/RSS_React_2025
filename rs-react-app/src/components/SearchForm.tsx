import React from 'react';
import { Spinner } from './Spinner';
import { fetchResults } from '../services/fetchApi';

interface SearchFormProps {
  setResults: (results: unknown) => void;
}

interface SearchFormState {
  name: string;
  results: string[] | [];
  loading: boolean;
  error: string | null;
}

export class SearchForm extends React.Component<
  SearchFormProps,
  SearchFormState
> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      name: localStorage.getItem('search') || '',
      results: [],
      loading: false,
      error: null,
    };
  }

  async componentDidMount(): Promise<void> {
    const name = localStorage.getItem('search') || '';
    this.setState({ loading: true, name });
    try {
      const data = await fetchResults(name);
      this.setState({ results: data || [] });
      this.props.setResults(data[`${name}s`] || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message });
        this.props.setResults(err.message);
      } else {
        this.setState({ error: 'An unknown error occurred' });
        this.props.setResults('An unknown error occurred');
      }
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) return;

    this.setState({ loading: true, error: null });

    try {
      localStorage.setItem('search', name);
      const data = await fetchResults(name);
      this.setState({ results: data || [] });
      this.props.setResults(data[`${name}s`] || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message });
        this.props.setResults(err.message);
      } else {
        this.setState({ error: 'An unknown error occurred' });
        this.props.setResults('An unknown error occurred');
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
            list="search"
          />
          <datalist id="search">
            <option value="animal" />
            <option value="astronomicalObject" />
            <option value="book" />
            <option value="character" />
          </datalist>
          <button type="submit">Search</button>
        </form>
        {this.state.loading && <Spinner />}
      </>
    );
  }
}
