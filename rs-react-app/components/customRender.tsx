import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../app/store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

export const customRender = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper });
};
