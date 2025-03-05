import { render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';
import '@testing-library/jest-dom';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { fetchSingleData } from '../services/fetchSingleData';
import { ThemeProvider } from '../context/ThemeContext';
import { useRouter, useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../services/fetchSingleData', () => ({
  fetchSingleData: vi.fn(),
}));

describe('DetailedCard', () => {
  const pushMock = vi.fn();

  const renderDetailedCard = () => {
    return render(
      <ThemeProvider>
        <DetailedCard />
      </ThemeProvider>
    );
  };

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

    vi.mocked(useSearchParams).mockReturnValue({
      get: (key: string) => (key === 'id' ? '123' : null),
    } as any);
  });

  test('should display a loading spinner initially', () => {
    renderDetailedCard();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should display data after fetching', async () => {
    const mockData = {
      name: 'Test Data',
      description: 'Some details about the data',
    };
    vi.mocked(fetchSingleData).mockResolvedValue(mockData);

    renderDetailedCard();

    const nameElement = await screen.findByText((content) =>
      content.includes('Test Data')
    );
    const descriptionElement = await screen.findByText((content) =>
      content.includes('Some details about the data')
    );

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
