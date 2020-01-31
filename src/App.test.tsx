import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('rendering one item', () => {
  const { getByText } = render(<App />);
  const testElement = getByText(/john/i);
  
  expect(testElement).toBeInTheDocument();
});
