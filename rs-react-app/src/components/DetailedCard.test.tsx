import { render, screen } from '@testing-library/react';
import { DetailedCard } from './DetailedCard';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { fetchSingleData } from '../services/fetchSingleData';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../services/fetchSingleData', () => ({
  fetchSingleData: vi.fn(),
}));

describe('DetailedCard', () => {
  const setSearchParamsMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    setSearchParamsMock.mockClear();
    navigateMock.mockClear();
    (useNavigate as vi.Mock).mockReturnValue(navigateMock);
    (useParams as vi.Mock).mockReturnValue({ id: '123' });
    (useSearchParams as vi.Mock).mockReturnValue([
      new URLSearchParams(),
      setSearchParamsMock,
    ]);
  });

  test('should display a loading spinner initially', () => {
    render(<DetailedCard />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should display data after fetching', async () => {
    const mockData = {
      name: 'Test Data',
      description: 'Some details about the data',
    };
    (fetchSingleData as vi.Mock).mockResolvedValue(mockData);

    render(<DetailedCard />);

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
