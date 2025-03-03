import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { SearchForm } from './SearchForm';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import '@testing-library/jest-dom';
import { AppDispatch, RootState } from '../app/store';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore<RootState, AppDispatch>([]);

describe('SearchForm Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;
  const mockPush = vi.fn();

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

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      query: { page: '1' },
      route: '/',
      pathname: '/',
      asPath: '/',
      basePath: '',
      isLocaleDomain: false,
      isReady: true,
      isPreview: false,
      isFallback: false,
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      reload: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      replace: vi.fn(),
      beforePopState: vi.fn(),
    });
  });

  test('renders search input and submit button', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <SearchForm />
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
          <SearchForm />
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
          <SearchForm />
        </ThemeContext.Provider>
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'a' } });

    const form = screen.getByTestId('form');
    fireEvent.submit(form);

    expect(store.dispatch).toHaveBeenCalled();
  });
});
