import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";
import Item from "./components/item";
import List from "./components/list";

test("renders list of items", () => {
  const data = [
    { name: "Province 1", capital: "Capital 1", flagUrl: "url1" },
    { name: "Province 2", capital: "Capital 2", flagUrl: "url2" },
  ];

  // Render the List component with the mock data
  render(<List data={data} />);

  // Retrieve elements for each item in the data array
  const item1Element = screen.getByText(/Province 1/i);
  const item2Element = screen.getByText(/Province 2/i);

  // Assert that the elements for each item are present in the document
  expect(item1Element).toBeInTheDocument();
  expect(item2Element).toBeInTheDocument();
});

test("renders item name", () => {
  render(
    <Item name="Test Province" capital="Test Capital" flagUrl="test-url" />
  );

  // Check if the item name is rendered correctly
  const itemNameElement = screen.getByText(/Test Province/i);
  expect(itemNameElement).toBeInTheDocument();

  // Check if the item flag image is rendered correctly
  const flagImageElement = screen.getByAltText(/Test Province's Flag/i);
  expect(flagImageElement).toBeInTheDocument();
});


test('toggles capital visibility when "Show/Hide Capital" button is clicked', () => {
  render(
    <Item name="Test Province" capital="Test Capital" flagUrl="test-url" />
  );

  // Get the "Show Capital" button and click the button
  const capitalButton = screen.getByText(/Show Capital/i);
  fireEvent.click(capitalButton);

  // Check if the capital is rendered and the button text changes to "Hide Capital"
  const itemCapitalElement = screen.getByText(/Test Capital/i);
  expect(itemCapitalElement).toBeInTheDocument();
  expect(capitalButton.textContent).toBe('Hide Capital');

  // Click the "Hide Capital" button
  fireEvent.click(capitalButton);
  
  // Check if the captial is no longer rendered and the button text changes to "Show Capital"
  expect(itemCapitalElement).not.toBeInTheDocument();
  expect(capitalButton.textContent).toBe('Show Capital');
});

test('Triggers fetching provinces data when the app is rendered', async () => {
  // Mock the fetch function
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([])
  });

  // Render the App component
  await act(async () => {render(<App />)});

  // Wait for the component to fetch data and update
  await waitFor(() => {
    // Check if the fetchData function is called with the correct URL for provinces
    expect(fetchMock).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/simonachkar/demo-canada-api-server/provinces'
    );
  });

  // Clean up the mock
  fetchMock.mockRestore();
});

test('clicking "Territories" button triggers fetching territories data', async () => {
  // Mock the fetch function
  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([])
  });

  // Render the App component
  await act(async () => {render(<App />)});

  // Find and click the "Territories" button inside the act() function
  await act(async () => {
    const territoriesButton = screen.getByText(/Territories/i);
    userEvent.click(territoriesButton);
  });

  // Wait for the component to fetch data and update
  await waitFor(() => {
    // Check if the fetchData function is called with the correct URL for territories
    expect(fetchMock).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/simonachkar/demo-canada-api-server/territories'
    );
  });
  
  // Clean up the mock
  fetchMock.mockRestore();
});