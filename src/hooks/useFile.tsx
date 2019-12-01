import { useState } from "react";

export default function useFile(): [
  File,
  (setFile: any) => void,
  (onSetFile: (a: File) => void) => void
] {
  const [value, setValue] = useState();
  let cb: any;
  const setFile = (e: any) => {
    const file = e.target.files[0];
    setValue(file);
    if (cb) cb(file);
  };

  const onSetFile = (_cb: (a: File) => void) => (cb = _cb);
  return [value, setFile, onSetFile];
}
