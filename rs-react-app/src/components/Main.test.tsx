import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { vi, expect, test, describe } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

vi.mock('./CardList', () => ({
  CardList: ({ results }: { results: unknown }) => (
    <div>{Array.isArray(results) ? results.length : 0} Cards Rendered</div>
  ),
}));

vi.mock('./Pagination', () => ({
  Pagination: ({
    totalPages,
    currentPage,
  }: {
    totalPages: string;
    currentPage: number;
  }) => (
    <div>
      Pagination: {currentPage} / {totalPages}
    </div>
  ),
}));

describe('Main Component', () => {
  test('renders CardList and Pagination when results are passed', () => {
    const mockResults = Array.from({ length: 5 }, (_, i) => ({
      uid: `id-${i + 1}`,
    }));
    const totalPages = '3';

    render(
      <BrowserRouter>
        <Main results={mockResults} totalPages={totalPages} />
      </BrowserRouter>
    );

    expect(screen.getByText('5 Cards Rendered')).toBeInTheDocument();
    expect(screen.getByText('Pagination: 0 / 3')).toBeInTheDocument();
  });

  test('does not render Pagination when there are no results', () => {
    render(
      <BrowserRouter>
        <Main results={[]} totalPages="3" />
      </BrowserRouter>
    );

    expect(screen.queryByText('Pagination:')).not.toBeInTheDocument();
  });

  test('calculates page correctly from searchParams', () => {
    const mockResults = Array.from({ length: 5 }, (_, i) => ({
      uid: `id-${i + 1}`,
    }));

    window.history.pushState({}, '', '?page=2');

    render(
      <BrowserRouter>
        <Main results={mockResults} totalPages="3" />
      </BrowserRouter>
    );

    expect(screen.getByText('Pagination: 2 / 3')).toBeInTheDocument();
  });

  test('limits page to totalPages if page > totalPages', () => {
    const mockResults = Array.from({ length: 5 }, (_, i) => ({
      uid: `id-${i + 1}`,
    }));

    window.history.pushState({}, '', '?page=5');

    render(
      <BrowserRouter>
        <Main results={mockResults} totalPages="3" />
      </BrowserRouter>
    );

    expect(screen.getByText('Pagination: 3 / 3')).toBeInTheDocument();
  });

  test('does not render Outlet when path is not /details/', () => {
    const mockResults = Array.from({ length: 5 }, (_, i) => ({
      uid: `id-${i + 1}`,
    }));

    render(
      <BrowserRouter>
        <Main results={mockResults} totalPages="3" />
      </BrowserRouter>
    );

    expect(screen.queryByText('Outlet')).not.toBeInTheDocument();
  });
});
