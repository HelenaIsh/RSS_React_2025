import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { SearchForm } from './SearchForm';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import { AppDispatch, RootState } from '../../app/store';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockStore = configureStore<RootState, AppDispatch>([]);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('SearchForm Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;
  let mockSearchParams: URLSearchParams;
  let mockSetSearchParams = vi.fn();

  beforeEach(() => {
    store = mockStore({
      results: {
        loading: false,
      },
    } as RootState);

    store.dispatch = vi.fn((action) =>
      typeof action === 'function'
        ? action(store.dispatch, store.getState)
        : action
    );

    mockSearchParams = new URLSearchParams('page=1');
    mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  test('renders search input and submit button', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter>
            <SearchForm />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter>
            <SearchForm />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'lion' } });
    expect(input).toHaveValue('lion');
  });

  test('submits form and dispatches actions', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter>
            <SearchForm />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    const form = screen.getByTestId('form');
    fireEvent.submit(form);
    expect(store.dispatch).toHaveBeenCalled();
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });
});
