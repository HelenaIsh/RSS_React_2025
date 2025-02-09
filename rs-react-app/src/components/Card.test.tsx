import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, test, describe } from 'vitest';
import { Card } from './Card';
import '@testing-library/jest-dom';

const fetchDetails = vi.fn().mockResolvedValue({
  description: 'This is a detailed description.',
});

describe('Card Component', () => {
  test('renders the relevant card data', () => {
    const mockData = { title: 'Card Title' };

    render(<Card element={mockData} id="1" />);

    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders the relevant card data with name', () => {
    const mockData = { name: 'Card Title' };

    render(<Card element={mockData} id="1" />);

    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  test('renders the relevant card data without name', () => {
    const mockData = { };

    render(<Card element={mockData} id="1" />);

    expect(screen.getByText('name')).toBeInTheDocument();
  });
});