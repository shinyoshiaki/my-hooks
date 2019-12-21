import { useState } from "react";

type Validator<T> = (v: T) => boolean;
type ErrorState<T> = { [key in keyof T]: boolean };

export function useForm<T extends { [key: string]: any }>(
  initialState: T,
  validation: Partial<{ [key in keyof T]: Validator<T> }> = {}
): [T, (next: Partial<T>) => void, ErrorState<T>, boolean] {
  const [state, setState] = useState(initialState);

  const updateError = (state: T) =>
    Object.keys(validation).reduce((acc, cur) => {
      (acc as any)[cur] = true;
      const func = validation[cur];
      if (func) {
        (acc as any)[cur] = !func(state);
      }
      return acc;
    }, {} as ErrorState<T>);

  const [error, setError] = useState(updateError(state));

  const update = (next: Partial<T>) => {
    const newState = { ...state, ...next };
    setState(newState);

    setError(updateError(newState));
  };

  const complete = Object.values(error).find(v => v === true) ? false : true;

  return [state, update, error, complete];
}
