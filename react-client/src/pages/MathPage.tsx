import React, { useEffect, useState } from "react";

const MathPage = () => {
  const [wMath, setWMath] = useState<typeof import("wasm-math")>();

  useEffect(() => {
    if (!wMath) {
      console.log("Importing wasm module");
      import("wasm-math").then((module) => setWMath(module));
    }
  }, [wMath]);

  return <div>I am MathPage</div>;
};

export default MathPage;
