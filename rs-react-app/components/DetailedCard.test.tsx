import { render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';
import '@testing-library/jest-dom';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { fetchSingleData } from '../services/fetchSingleData';
import { ThemeProvider } from '../context/ThemeContext';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../services/fetchSingleData', () => ({
  fetchSingleData: vi.fn(),
}));

describe('DetailedCard', () => {
  const pushMock = vi.fn();
  const setSearchParamsMock = vi.fn();

  const renderDetailedCard = () => {
    return render(
      <ThemeProvider>
        <DetailedCard />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    pushMock.mockClear();
    setSearchParamsMock.mockClear();
    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      query: { id: '123' },
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
