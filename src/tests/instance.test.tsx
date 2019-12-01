import { cleanup, fireEvent, render } from "@testing-library/react";

import React from "react";
import { TestInstance } from "./Instance";

afterEach(cleanup);

describe("TestInstance", () => {
  test("", () => {
    const { getByText } = render(<TestInstance />);
    let target = getByText("test");
    expect(target).toBeDefined();

    const button = getByText("update");
    fireEvent.click(button);

    const num = getByText("1");
    expect(num).toBeDefined();

    target = getByText("test");
    expect(target).toBeDefined();
  });
});
