import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import ReduxProvider from "context/store";

function setup() {
  render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
  const inputElement: HTMLInputElement = screen.getByLabelText(/Username/i);

  return inputElement;
}

test("renders", () => {
  const inputElement = setup();
  expect(inputElement).toBeInTheDocument();
});

it("allows input", async () => {
  const inputElement = await waitFor(setup);
  expect(inputElement.value).toBe("");
});
