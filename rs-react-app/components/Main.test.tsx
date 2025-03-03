import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Main } from './Main';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import { AppDispatch, RootState } from '../app/store';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore<RootState, AppDispatch>([]);

describe('Main Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;

  beforeEach(() => {
    store = mockStore({
      checks: { selectedIds: ['ANMA0000044745'], itemDetails: [] },
      results: {
        results: [
          {
            uid: 'ANMA0000044745',
            name: 'Ghergher beast',
            earthAnimal: false,
            earthInsect: false,
            avian: false,
            canine: false,
            feline: false,
          },
        ],
        totalPages: 5,
        loading: false,
        error: null,
      },
    } as RootState);
    store.dispatch = vi.fn((action) =>
      typeof action === 'function'
        ? action(store.dispatch, store.getState)
        : action
    );
  });

  test('renders correctly with results and pagination', () => {
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      pathname: '/',
      query: { page: '1' },
      route: '/',
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

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Main />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('renders Flayout when items are checked', () => {
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      pathname: '/',
      query: { page: '1' },
      route: '/',
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

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Main />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('flayout')).toBeInTheDocument();
  });

  test('renders DetailedCard when on details page', () => {
    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      pathname: '/details/123',
      query: { id: '123', page: '1' },
      route: '/details/[id]',
      asPath: '/details/123',
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

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Main />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
  });

  test('does not render Pagination when results are empty', () => {
    store = mockStore({
      checks: { selectedIds: [], itemDetails: [] },
      results: {
        results: [],
        totalPages: 0,
        loading: false,
        error: null,
      },
    } as RootState);

    const pushMock = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      pathname: '/',
      query: { page: '1' },
      route: '/',
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

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <Main />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
