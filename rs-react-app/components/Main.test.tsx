import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Main } from './Main';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import { AppDispatch, RootState } from '../../app/store';
import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockStore = configureStore<RootState, AppDispatch>([]);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

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
    const mockSearchParams = new URLSearchParams('page=1');
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  test('renders Flayout when items are checked', () => {
    const mockSearchParams = new URLSearchParams('page=1');
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('flayout')).toBeInTheDocument();
  });

  test('renders Outlet when on details page', () => {
    const mockSearchParams = new URLSearchParams('page=1');
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter initialEntries={['/details/123']}>
            <Routes>
              <Route
                path="/details/:id"
                element={<div data-testid="outlet">Outlet</div>}
              />
              <Route path="/" element={<Main />} />
            </Routes>
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
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

    const mockSearchParams = new URLSearchParams('page=1');
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light' }}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
