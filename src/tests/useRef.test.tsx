import "@babel/polyfill";
import React, { FC, useEffect, useState } from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { useConst } from "../hooks/useConst";

let constructorCounter = 0;

class Example {
  test = "test";
  id = Math.random().toString();
  constructor() {
    constructorCounter++;
  }
}

const Test: FC = () => {
  const [example, setExample] = useConst<Example>();
  const [num, setNum] = useState(0);

  useEffect(() => {
    setExample(new Example());
  }, [setExample]);

  return (
    <div>
      <div data-testid="constructorCounter">{constructorCounter}</div>
      <div data-testid="num">{num}</div>
      <button data-testid="button" onClick={() => setNum(n => n + 1)}>
        button
      </button>
      <div data-testid="test">{example?.test}</div>
      <div data-testid="id">{example?.id}</div>
    </div>
  );
};

afterEach(cleanup);

test("useRef", async () => {
  const { getByTestId } = render(<Test />);

  const button = getByTestId("button");
  const test = getByTestId("test");
  const counter = getByTestId("constructorCounter");
  const id = getByTestId("id");
  const num = getByTestId("num");

  expect(test.textContent).toBe("");
  expect(counter.textContent).toBe("0");
  fireEvent.click(button);
  expect(test.textContent).toBe("test");
  expect(counter.textContent).toBe("1");
  const s = id.textContent;
  expect(num.textContent).toBe("1");
  fireEvent.click(button);
  expect(test.textContent).toBe("test");
  expect(counter.textContent).toBe("1");
  expect(id.textContent).toBe(s);
  expect(num.textContent).toBe("2");
});
