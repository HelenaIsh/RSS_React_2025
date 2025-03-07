import { screen, fireEvent } from '@testing-library/react';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { Card } from './Card';
import '@testing-library/jest-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { customRender } from './customRender';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Card Component', () => {
  const pushMock = vi.fn();

  beforeEach(() => {
    pushMock.mockClear();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('page=2') as unknown as ReturnType<
        typeof useSearchParams
      >
    );
  });

  test('renders the relevant card data', () => {
    const mockData = { title: 'Card Title' };

    customRender(<Card element={mockData} id="1" />);

    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders the relevant card data with name', () => {
    const mockData = { name: 'Card Title' };

    customRender(<Card element={mockData} id="1" />);

    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders the relevant card data without name', () => {
    const mockData = {};

    customRender(<Card element={mockData} id="1" />);

    expect(screen.getByText('name')).toBeInTheDocument();
  });

  test('navigates to the details page on click', () => {
    const mockData = { title: 'Card Title' };

    customRender(<Card element={mockData} id="1" />);

    const cardElement = screen.getByText('Card Title');
    fireEvent.click(cardElement);

    expect(pushMock).toHaveBeenCalledWith('/details/1?page=2');
  });
});
