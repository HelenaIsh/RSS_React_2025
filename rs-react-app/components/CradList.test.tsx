import { render, screen } from '@testing-library/react';
import { vi, expect, test, describe } from 'vitest';
import { CardList } from './CardList';
import '@testing-library/jest-dom';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';

vi.mock('./Card', () => ({
  Card: ({ element }: { element: { uid: string } }) => (
    <div data-testid="card">{element.uid}</div>
  ),
}));

const mockStore = configureStore<RootState, AppDispatch>([]);

describe('CardList Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;

  test('renders the correct number of cards', () => {
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

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(1);
  });

  test('displays a message when there are no cards', () => {
    store = mockStore({
      checks: { selectedIds: [], itemDetails: [] },
      results: {
        results: null,
        totalPages: 5,
        loading: false,
        error: null,
      },
    } as RootState);
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  test('displays error message', () => {
    store = mockStore({
      checks: { selectedIds: [], itemDetails: [] },
      results: {
        results: 'error message',
        totalPages: 5,
        loading: false,
        error: null,
      },
    } as RootState);
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText('error message')).toBeInTheDocument();
  });

  test("displays 'No results found' when no results are passed", () => {
    store = mockStore({
      checks: { selectedIds: [], itemDetails: [] },
      results: {
        results: [],
        totalPages: 5,
        loading: false,
        error: null,
      },
    } as RootState);
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
