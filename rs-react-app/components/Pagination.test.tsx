import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      query: { page: '2' },
      route: '/',
      pathname: '/',
      asPath: '/',
      basePath: '',
      isLocaleDomain: false,
      isReady: true,
      isPreview: false,
      isFallback: false,
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      reload: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      replace: vi.fn(),
      beforePopState: vi.fn(),
    });
  });

  test('updates URL query parameter when page changes', () => {
    render(<Pagination totalPages={5} currentPage={2} />);

    const forwardButton = screen.getByText('Forward');
    fireEvent.click(forwardButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: '3' },
    });
  });
});
