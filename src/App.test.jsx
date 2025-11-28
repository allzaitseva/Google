/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { test, expect } from "vitest";

test("search input renders and can be cleared", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search google/i);
  fireEvent.change(input, { target: { value: "test" } });
  expect(input.value).toBe("test");

  fireEvent.submit(input.form);

  const clearButton = await screen.findByText(/clear/i);
  fireEvent.click(clearButton);
  expect(input.value).toBe("");
});
