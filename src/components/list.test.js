import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import List from "./list";

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