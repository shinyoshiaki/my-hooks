import { useState } from "react";

export default function useInput(): [string, (e: any) => void] {
  const [value, setValue] = useState("");
  const input = (e: any) => {
    setValue(e.target.value);
  };

  return [value, input];
}
