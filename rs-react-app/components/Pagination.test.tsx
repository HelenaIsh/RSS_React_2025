import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  test('updates URL query parameter when page changes', () => {
    render(<Pagination totalPages={5} currentPage={2} />);

    const forwardButton = screen.getByText('Forward');
    fireEvent.click(forwardButton);

    expect(mockPush).toHaveBeenCalledWith('/?page=3');
  });
});