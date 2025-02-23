import { screen, render, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { vi, expect, test, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { useTheme } from '../context/ThemeContext';

vi.mock('./SearchForm', () => ({
  SearchForm: () => <div data-testid="search-form">SearchForm</div>,
}));

vi.mock('../context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

describe('Header Component', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders SearchForm and theme toggle button', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<Header />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Switch to Dark Theme/i })
    ).toBeInTheDocument();
  });

  test('calls toggleTheme when the theme toggle button is clicked', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<Header />);

    const themeToggleButton = screen.getByRole('button', {
      name: /Switch to Dark Theme/i,
    });
    fireEvent.click(themeToggleButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  test('displays "Switch to Light Theme" when the current theme is dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<Header />);

    expect(
      screen.getByRole('button', { name: /Switch to Light Theme/i })
    ).toBeInTheDocument();
  });
});
