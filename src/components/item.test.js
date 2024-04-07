import React from "react";
import { render, screen } from "@testing-library/react";
import Item from "./item";

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