import React, { FC } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";

import { useForm } from "../hooks/useForm";

const Test: FC = () => {
  const [_, update, formError, formComplete] = useForm(
    { a: "", b: "" },
    {
      a: ({ a }) => {
        return a === "a";
      },
      b: ({ b }) => {
        return b === "b";
      }
    }
  );

  return (
    <div>
      <input
        data-testid="input-a"
        onChange={e => update({ a: e.target.value })}
      />
      <div data-testid="error-a">{formError.a ? "error" : ""}</div>
      <input
        data-testid="input-b"
        onChange={e => update({ b: e.target.value })}
      />
      <div data-testid="error-b">{formError.b ? "error" : ""}</div>
      <div data-testid="complete">{formComplete ? "complete" : ""}</div>
    </div>
  );
};

afterEach(cleanup);

test("useForm", () => {
  const { getByTestId } = render(<Test />);

  const errorA = getByTestId("error-a");
  const errorB = getByTestId("error-b");
  const inputA = getByTestId("input-a");
  const inputB = getByTestId("input-b");
  const complete = getByTestId("complete");

  expect(complete.textContent).toBe("");

  expect(errorA.textContent).toBe("error");
  expect(errorB.textContent).toBe("error");

  fireEvent.change(inputA, { target: { value: "error" } });
  expect(errorA.textContent).toBe("error");
  expect(errorB.textContent).toBe("error");

  fireEvent.change(inputA, { target: { value: "a" } });
  expect(errorA.textContent).toBe("");
  expect(errorB.textContent).toBe("error");

  fireEvent.change(inputB, { target: { value: "b" } });
  expect(errorA.textContent).toBe("");
  expect(errorB.textContent).toBe("");

  expect(complete.textContent).toBe("complete");
});
