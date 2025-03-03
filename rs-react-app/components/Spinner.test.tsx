import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';
import '@testing-library/jest-dom';
import { expect, test, describe } from 'vitest';

describe('Spinner Component', () => {
  test('renders the spinner elements correctly', () => {
    render(<Spinner />);

    const spinnerOverlay = screen.getByTestId('spinner-overlay');
    expect(spinnerOverlay).toBeInTheDocument();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
