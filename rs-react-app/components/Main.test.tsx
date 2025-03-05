import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Main } from './Main';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import { AppDispatch, RootState } from '../store/store';
import '@testing-library/jest-dom';
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
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
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('page=2') as unknown as ReturnType<
        typeof useSearchParams
      >
    );
    vi.mocked(usePathname).mockReturnValue('/');

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
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
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
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(usePathname).mockReturnValue('/details/');

    vi.mocked(useParams).mockReturnValue({
      id: '123',
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
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(useParams).mockReturnValue({
      id: '123',
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
