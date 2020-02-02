import React from 'react';
import { render, fireEvent, act, waitForElement } from '@testing-library/react';

import App from './App';

test('adding new item', async () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(<App />);
  const inputField = getByPlaceholderText('Add new item'); // TODO: find a way to replace placeholder match
  const submitButton = getByTestId('submitButton');
  const input = 'New item';

  act(() => {
    fireEvent.change(inputField, { target: { value: input }});
    fireEvent.click(submitButton);
  })

  const newItem = await waitForElement(() => getByText(input));
  expect(newItem).toBeDefined();
});

test('deleting an item', async () => {
  const testId = 'uid-1';
  const defaultItems = [
    {
      id: testId,
      text: 'Test text'
    }
  ];
  const { queryByTestId, getByTestId } = render(<App defaultItems={defaultItems} />);
  const deleteButton = getByTestId(`deleteButton-${testId}`);
  window.confirm = jest.fn(() => true); // always click 'yes'

  expect(queryByTestId(`item-${testId}`)).toBeDefined();

  act(() => {
    fireEvent.click(deleteButton);
  })

  expect(window.confirm).toBeCalledTimes(1);
  expect(queryByTestId(`item-${testId}`)).toBeNull();
});
