import { screen, fireEvent } from '@testing-library/react';
import { Header, HeaderProps } from './Header';
import { vi, expect, test, describe } from 'vitest';
import '@testing-library/jest-dom';
import { customRender } from './customRender';

vi.mock('./SearchForm', () => ({
  SearchForm: ({ setResults, setTotalPages }: HeaderProps) => (
    <div>
      <button onClick={() => setResults('new results')}>Search</button>
      <button onClick={() => setTotalPages('10')}>Set Pages</button>
    </div>
  ),
}));

describe('Header Component', () => {
  test('renders the SearchForm component', () => {
    const setResults = vi.fn();
    const setTotalPages = vi.fn();

    customRender(
      <Header setResults={setResults} setTotalPages={setTotalPages} />
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Set Pages')).toBeInTheDocument();
  });

  test('passes setResults and setTotalPages props to SearchForm', () => {
    const setResults = vi.fn();
    const setTotalPages = vi.fn();

    customRender(
      <Header setResults={setResults} setTotalPages={setTotalPages} />
    );

    fireEvent.click(screen.getByText('Search'));
    expect(setResults).toHaveBeenCalledWith('new results'); // This should match the value passed

    fireEvent.click(screen.getByText('Set Pages'));
    expect(setTotalPages).toHaveBeenCalledWith('10');
  });
});
