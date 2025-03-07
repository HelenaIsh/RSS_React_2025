import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import '@testing-library/jest-dom';

vi.mock('./CardList', () => ({
  CardList: () => <div data-testid="card-list">CardList</div>,
}));

vi.mock('./Pagination', () => ({
  Pagination: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock('./DetailedCardWrapper', () => ({
  DetailedCardWrapper: () => (
    <div data-testid="detailed-card-wrapper">DetailedCardWrapper</div>
  ),
  FlayoutWrapper: () => <div data-testid="flayout-wrapper">FlayoutWrapper</div>,
}));

vi.mock('../services/fetchApi', () => ({
  fetchResults: vi.fn().mockResolvedValue({
    animals: [
      { id: 1, name: 'Animal 1' },
      { id: 2, name: 'Animal 2' },
    ],
  }),
}));

describe('Main Component', () => {
  test('renders the Main component with mocked data', async () => {
    const { container } = render(await Main({ name: 'a', page: '0' }));

    expect(screen.getByTestId('card-list')).toBeInTheDocument();

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    expect(screen.getByTestId('detailed-card-wrapper')).toBeInTheDocument();

    expect(screen.getByTestId('flayout-wrapper')).toBeInTheDocument();

    expect(container.querySelector('.main-container')).toBeInTheDocument();
  });
});
