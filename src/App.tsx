import React, { FC, useEffect, useRef, useState } from "react";

import ComlinkClass from "./class.comlink";

const Worker = require("./test.worker.ts");

const App: FC = () => {
  const workerRef = useRef<Worker>(new Worker());
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const worker = workerRef.current;

    worker.onmessage = e => {
      setMsg(e.data);
    };

    worker.postMessage("call");

    return () => {
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    const promise = async () => {
      const promise: Promise<ComlinkClass> = new ComlinkClass() as any;
      const inst = await promise;
      await inst.setSeed("what");
      const hash = await inst.getHash("a");
      console.log(hash);
    };
    promise();
  }, []);

  return (
    <div>
      <p>{msg}</p>
      <button>button</button>
    </div>
  );
};

export default App;
