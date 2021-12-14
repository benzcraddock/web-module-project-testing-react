import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
  name: "test show",
  summary: "test summary",
  seasons: [{
    id: 0,
    name: "test season 1",
    episodes: []
  },
  {
    id: 1,
    name: "test season 2",
    episodes: []
  }
]
}

test('renders without errors with no props', ()=>{
  render(<Display />)
});

test('renders Show component when the button is clicked ', async ()=>{
  // mock of fetch using spy
  mockFetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);

  const button = screen.getByRole('button');
  userEvent.click(button);

  // async await for api (add async to test line)
  // findByTestId is for promise, renders show-container
  const show = await screen.findByTestId('show-container');
  expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
  // mock of fetch using spy
  mockFetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);

  const button = screen.getByRole('button');
  userEvent.click(button);

  // async await waitFor for api
  // use query since find returns promise
  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(2);
  })
});

test('displayFunc is called when the fetch button is pressed', async () => {
  // mock of fetch using spy
  mockFetchShow.mockResolvedValueOnce(testShow);

  // create new displayfunc and pass into Display component
  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc}/>);

  const button = screen.getByRole('button');
  userEvent.click(button);

  // not looking for individual show container, season options, rather a particular function to be called
  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  })
})
