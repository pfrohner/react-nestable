import { deleteById } from './utils';

it('can remove item from the root', () => {
  const data = [
    {
      id: 'id-1',
    },
    {
      id: 'id-2',
    }
  ]
  const expected = [{
    id: 'id-2',
  }];

  const newItems = deleteById(data, 'id-1');

  expect(newItems).toEqual(expected);
});

it('can remove children from first level', () => {
  const data = [
    {
      id: 'id-1',
      children: [
        {
          id: 'id-11',
          children: [
            {
              id: 'id-111',
            }
          ]
        },
        {
          id: 'id-12',
        }
      ]
    },
    {
      id: 'id-2',
    }
  ];
  const expected = [
    {
      id: 'id-1',
      children: [
        {
          id: 'id-12',
        }
      ]
    },
    {
      id: 'id-2',
    }
  ];

  const newItems = deleteById(data, 'id-11');

  expect(newItems).toEqual(expected);
});

it('can remove deeply nested children', () => {
  const data = [
    {
      id: 'id-1',
      children: [
        {
          id: 'id-11',
          children: [
            {
              id: 'id-111',
            }
          ]
        },
        {
          id: 'id-12',
        }
      ]
    },
    {
      id: 'id-2',
    }
  ];
  const expected = [
    {
      id: 'id-1',
      children: [
        {
          id: 'id-11',
        },
        {
          id: 'id-12',
        }
      ]
    },
    {
      id: 'id-2',
    }
  ];

  const newItems = deleteById(data, 'id-111');

  expect(newItems).toEqual(expected);
});
