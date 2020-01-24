import React, { FC, useState } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import { useInstance } from "../hooks/useInstance";

class Some {
  constructor(public s: string) {}
}

const TestInstance: FC = () => {
  const [num, setNum] = useState(0);
  const [some] = useInstance(new Some(Math.random().toString()));

  return (
    <div>
      <span>{num.toString()}</span>
      <p role="test">{some.s}</p>
      <button onClick={() => setNum(prev => prev + 1)}>update</button>
    </div>
  );
};

afterEach(cleanup);

describe("TestInstance", () => {
  test("test", () => {
    const { getByText, getByRole } = render(<TestInstance />);
    const target = getByRole("test").textContent;

    const button = getByText("update");
    fireEvent.click(button);
    const num = getByText("1");
    expect(num).toBeDefined();

    expect(target).toBe(getByRole("test").textContent);
  });
});
