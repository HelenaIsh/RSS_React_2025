import { render, screen, waitFor } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import '@testing-library/jest-dom';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../services/fetchApi');
vi.mock('../hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn().mockReturnValue(['animal', vi.fn()]),
}));
describe('SearchForm Component', () => {
  const setResultsMock = vi.fn();
  const setTotalPagesMock = vi.fn();

  beforeEach(() => {
    setResultsMock.mockClear();
    setTotalPagesMock.mockClear();
  });

  test('renders correctly with default search input', async () => {
    render(
      <BrowserRouter>
        <SearchForm
          setResults={setResultsMock}
          setTotalPages={setTotalPagesMock}
        />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByTestId('form')).toBeInTheDocument());

    expect(screen.getByTestId('search-input')).toHaveValue('animal');
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
