import React, { FC, useState } from 'react';
import Nestable from 'react-nestable';
import { uid } from 'react-uid'
import { Formik, ErrorMessage  } from 'formik';
import * as yup from 'yup';
import filterDeep from 'deepdash/filterDeep';

import { TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import logo from './logo.svg';
import './App.css';

type Props = {
  defaultItems?: Item[];
}

type Item = {
  id: string;
  text: string;
  children?: Item[];
}

type FormData = {
  text: string;
}

const validationSchema = yup.object({
  text: yup
    .string()
    .required()
    .min(4)
    .max(50)
});

const initialValues: FormData = {
  text: 'New item'
}

const App: FC<Props> = ({ defaultItems }) => {
  const [items, setItems] = useState<Item[]>(defaultItems ?? []);
  const onSubmit = (data: FormData, actions: { setSubmitting: (state: boolean) => void }) => {
    actions.setSubmitting(true)
    const newItem: Item = {
      id: uid(data),
      text: data.text
    }
    setItems([...items, newItem]);
    data.text = '';
    actions.setSubmitting(false);
  }
  const onDelete = (id: string): void => {
    const isSure: boolean = window.confirm('Are you sure?');
    if (isSure) {
      // TODO: make this work on any level
      const filteredItems: Item[] = filterDeep(items, (value: { id: string; }) => value.id !== id,
      { childrenPath: 'children', pathFormat: 'array' }
      )
      setItems(filteredItems ?? []);
    }
  }
  const onNestableChange = (newState: Item[]) => setItems(newState); // keep state in sync with changes from nestable
  const renderItem = ({ item }: { item: { id: string, text: string, children: [] }}): any => {
    return <span data-testid={`item-${item.id}`}>
      {item.text}
      {item.children.length === 0 && <DeleteIcon
        fontSize="small"
        className="DeleteIcon"
        data-testid={`deleteButton-${item.id}`}
        onClick={() => onDelete(item.id)} />
      }
    </span>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React Nestable demo</p>
      </header>
      <main className="Content">
        <div className="Form">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnChange={false}
            validationSchema={validationSchema}
          >
            {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  placeholder="Add new item"
                  onBlur={handleBlur}  />
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                  data-testid="submitButton"
                >
                  Submit
                </Button>
                <div>
                  <ErrorMessage name="text" />
                </div>
              </form>
            )}
          </Formik>
        </div>
        <Nestable
          items={items}
          renderItem={renderItem}
          maxDepth={3}
          onChange={onNestableChange}
        />
      </main>
    </div>
  );
}

App.defaultProps = {
  defaultItems: [
    {
      id: 'uid-1',
      text: 'Item 1'
    },
    {
      id: 'uid-2',
      text: 'Item 2'
    },
  ]
} as Partial<Props>;

export default App;
