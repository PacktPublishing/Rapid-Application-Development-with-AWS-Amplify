import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("render app", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Create post/i);
  expect(titleElement).toBeInTheDocument();
});
