import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, expect, test, describe } from 'vitest';
import { CardList } from './CardList';
import '@testing-library/jest-dom';

vi.mock('./Card', () => ({
  Card: ({ element }: { element: { uid: string } }) => (
    <div data-testid="card">{element.uid}</div>
  ),
}));

describe('CardList Component', () => {
  test('renders the correct number of cards', () => {
    const mockResults = Array.from({ length: 20 }, (_, i) => ({
      uid: `id-${i + 1}`,
    }));

    render(
      <BrowserRouter>
        <CardList results={mockResults} totalPages="1" />
      </BrowserRouter>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(20);
  });

  test('displays a message when there are no cards', () => {
    render(
      <BrowserRouter>
        <CardList results={null} totalPages="1" />
      </BrowserRouter>
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(
      <BrowserRouter>
        <CardList results={'error message'} totalPages="1" />
      </BrowserRouter>
    );

    expect(screen.getByText('error message')).toBeInTheDocument();
  });

  test("displays 'No results found' when no results are passed", () => {
    render(
      <BrowserRouter>
        <CardList results={[]} totalPages="1" />
      </BrowserRouter>
    );
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
