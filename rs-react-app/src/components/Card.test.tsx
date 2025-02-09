import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, expect, test, describe } from 'vitest';
import { Card } from './Card';
import '@testing-library/jest-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams('query=test'), vi.fn()]),
    BrowserRouter: actual.BrowserRouter,
  };
});

describe('Card Component', () => {
  test('renders the relevant card data', () => {
    const mockData = { title: 'Card Title' };

    render(
      <BrowserRouter>
        <Card element={mockData} id="1" />
      </BrowserRouter>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders the relevant card data with name', () => {
    const mockData = { name: 'Card Title' };

    render(
      <BrowserRouter>
        <Card element={mockData} id="1" />
      </BrowserRouter>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders the relevant card data without name', () => {
    const mockData = {};

    render(
      <BrowserRouter>
        <Card element={mockData} id="1" />
      </BrowserRouter>
    );

    expect(screen.getByText('name')).toBeInTheDocument();
  });

  test('navigates to the details page on click', () => {
    const mockNavigate = vi.fn();
    const mockSearchParams = new URLSearchParams('query=test');
    const mockSetSearchParams = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    const mockData = { title: 'Card Title' };

    render(
      <BrowserRouter>
        <Card element={mockData} id="1" />
      </BrowserRouter>
    );

    const cardElement = screen.getByText('Card Title');
    fireEvent.click(cardElement);

    expect(mockNavigate).toHaveBeenCalledWith('/details/1?query=test');
  });
});
