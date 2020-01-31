import React from 'react';
import Nestable from 'react-nestable';

import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  type ItemType = {
    id: number;
    text: string;
    children?: ItemType[]
  }
  const items: (ItemType[]) = [
    {
      id: 0,
      text: 'John',
      children: [
        {
          id: 1,
          text: 'Sarah'
        }
      ]
    },
    {
      id: 2,
      text: 'Jack',
      children: [
        {
          id: 3,
          text: 'David'
        },
        {
          id: 4,
          text: 'Peter'
        }
      ]
    },
    {
      id: 5,
      text: 'Lisa'
    }
  ];
  const renderItem = ({ item }: { item: { text: string, children: [] }}) => item.text

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React Nestable demo</p>
      </header>
      <main className="Content">
        <Nestable
          items={items}
          renderItem={renderItem}
          maxDepth={3}
        />
      </main>
    </div>
  );
}

export default App;
