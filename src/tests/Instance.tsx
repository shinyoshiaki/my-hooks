import React, { FC, useState } from "react";

import { useInstance } from "../hooks/useInstance";

class Some {
  constructor(public s: string) {}
}

export const TestInstance: FC = () => {
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
