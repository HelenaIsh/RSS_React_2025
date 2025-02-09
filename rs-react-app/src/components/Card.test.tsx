import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, describe } from 'vitest';
import { Card } from './Card';
import '@testing-library/jest-dom';

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
});
