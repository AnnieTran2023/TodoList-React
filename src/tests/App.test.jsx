import App from "../App";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; 

test("renders App component", () => {
  render(<App />);
  const header = screen.getByText(/Welcome to Todo App!/i);
  expect(header).toBeInTheDocument();
});
