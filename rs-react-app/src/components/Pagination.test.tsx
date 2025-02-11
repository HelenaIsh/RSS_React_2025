import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useSearchParams } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useSearchParams: vi.fn(),
    BrowserRouter: actual.BrowserRouter,
  };
});

describe('Pagination Component', () => {
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    (useSearchParams as vi.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
  });

  test('updates URL query parameter when page changes', () => {
    render(
      <BrowserRouter>
        <Pagination totalPages="5" currentPage={2} />
      </BrowserRouter>
    );

    const forwardButton = screen.getByText('Вперед');
    fireEvent.click(forwardButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' });
  });
});
