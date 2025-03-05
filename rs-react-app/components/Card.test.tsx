import { screen, fireEvent } from '@testing-library/react';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import { Card } from './Card';
import '@testing-library/jest-dom';
import { useRouter } from 'next/compat/router';
import { customRender } from './customRender';

vi.mock('next/compat/router', () => ({
  useRouter: vi.fn(),
}));

describe('Card Component', () => {
  let mockPush: ReturnType<typeof vi.fn>;
  let mockRouter: ReturnType<typeof createMockRouter>;

  const createMockRouter = () => ({
    push: vi.fn(),
    query: { query: 'test' },
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

  beforeEach(() => {
    mockPush = vi.fn();
    mockRouter = createMockRouter();
    mockRouter.push = mockPush;
    vi.mocked(useRouter).mockImplementation(() => mockRouter);
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

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/details/1',
      query: { query: 'test' },
    });
  });
});
