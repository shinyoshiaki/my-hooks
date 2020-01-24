import { useCallback, useRef } from "react";

export function useConst<T>(): [T | undefined, (v: T) => void] {
  const ref = useRef<T>();

  const setRef = useCallback((v: T) => {
    ref.current = v;
  }, []);

  return [ref.current, setRef];
}
