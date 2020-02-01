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

type Item = {
  id: string;
  text: string;
  children?: Item[]
}

type FormData = {
  text: string;
}

const initialValues: FormData = {
  text: 'John'
}

const validationSchema = yup.object({
  text: yup
    .string()
    .required()
    .min(4)
    .max(50)
});

const App: FC = () => {
  const [items, setItems] = useState<Item[]>([]);

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
      const filteredItems: Item[] = filterDeep(items, (value: { id: string; }) => value.id !== id,
      { childrenPath: 'children', pathFormat: 'array' }
      )
      setItems(filteredItems ?? []);
    }
  }
  const onNestableChange = (newState: Item[]) => setItems(newState);
  const renderItem = ({ item }: { item: { id: string, text: string, children: [] }}): any => {
    return <>
      {item.text}
      {item.children.length === 0 && <DeleteIcon
        fontSize="small"
        className="DeleteIcon"
        onClick={() => onDelete(item.id)} />
      }
    </>
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
                  className="SubmitButton"
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
          onChange={onNestableChange}
          items={items}
          renderItem={renderItem}
          maxDepth={3}
        />
      </main>
    </div>
  );
}

export default App;
