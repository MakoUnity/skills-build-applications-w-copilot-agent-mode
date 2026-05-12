import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders OctoFit Tracker brand', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const brandElement = screen.getByText(/Welcome to OctoFit Tracker/i);
  expect(brandElement).toBeInTheDocument();
});
