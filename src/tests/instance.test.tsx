import { cleanup, fireEvent, render } from "@testing-library/react";

import React from "react";
import { TestInstance } from "./Instance";

afterEach(cleanup);

describe("TestInstance", () => {
  test("", () => {
    const { getByText, getByRole } = render(<TestInstance />);
    const target = getByRole("test").textContent;

    const button = getByText("update");
    fireEvent.click(button);
    const num = getByText("1");
    expect(num).toBeDefined();

    expect(target).toBe(getByRole("test").textContent);
  });
});
