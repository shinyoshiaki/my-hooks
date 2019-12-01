import React, { FC, useState } from "react";

import { useInstance } from "../hooks/useInstance";

class Some {
  constructor(public s: string) {}
}

export const TestInstance: FC = () => {
  const [num, setNum] = useState(0);
  const [some] = useInstance(new Some("test"));

  return (
    <div>
      <p>{num.toString()}</p>
      <p>{some.s}</p>
      <button onClick={() => setNum(prev => prev + 1)}>update</button>
    </div>
  );
};
