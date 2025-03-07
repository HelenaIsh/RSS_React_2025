import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch, RootState } from '../store/store';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockStore = configureStore<RootState, AppDispatch>([]);

describe('Pagination Component', () => {
  const mockPush = vi.fn();
  let store: MockStoreEnhanced<RootState, AppDispatch>;

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

    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams('page=2') as unknown as ReturnType<
        typeof useSearchParams
      >
    );
  });

  test('updates URL query parameter when page changes', () => {
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
        <Pagination />
      </Provider>
    );

    const forwardButton = screen.getByText('Forward');
    fireEvent.click(forwardButton);

    expect(mockPush).toHaveBeenCalledWith('?page=3');
  });
});
