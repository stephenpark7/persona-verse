import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { App } from '../../App';

test('renders without crashing', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Twitter/i, { selector: 'h1' });
  expect(linkElement).toBeInTheDocument();
});

test('renders paragraph', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Create an account or log in./i, { selector: 'p' });
  expect(linkElement).toBeInTheDocument();
});

test('renders sign up button', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Sign up/i, { selector: 'button' });
  expect(linkElement).toBeInTheDocument();
});

test('renders log in button', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Log in/i, { selector: 'button' });
  expect(linkElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Create an account or log in./i, { selector: 'p' });
  expect(linkElement).toBeInTheDocument();
});

test('does not render tweet container', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Tweets/i, { selector: 'h2' });
  expect(linkElement).toBeNull();
});

test('does not render log out button', () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/Log out/i, { selector: 'button' });
  expect(linkElement).toBeNull();
});
