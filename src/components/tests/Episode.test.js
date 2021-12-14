import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
  id: 1,
  name: "",
  image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80",
  season: 1,
  number: 1,
  summary: "This is a summary statement for the test.",
  runtime: 1
}

const testEpisodeWithoutImage = {
  id: 1,
  name: "",
  image: null,
  season: 1,
  number: 1,
  summary: "This is a summary statement for the test.",
  runtime: 1
}

test("renders without error", () => {
  render(<Episode episode={testEpisode}/>);
});

test("renders the summary test passed as prop", ()=>{
  render(<Episode episode={testEpisode}/>);

  const summary = screen.queryByText(/this is a summary statement for the test./i);

  expect(summary).toBeInTheDocument();
  expect(summary).toHaveTextContent(/this is a summary statement for the test/i);
  expect(summary).toBeTruthy();
  expect(summary).not.toBeFalsy();
});

test("renders default image when image is not defined", ()=>{
  render(<Episode episode={testEpisodeWithoutImage}/>);

  const image = screen.queryByAltText(/stranger-things.png/i)

  expect(image).toBeInTheDocument();
});
