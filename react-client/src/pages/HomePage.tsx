import React, { useEffect, useState } from "react";
import { addTwoInts, fibonaci } from "../utils/math";
import logo from "../logo.svg";

const HomePage = () => {
  const [wMath, setWMath] = useState<typeof import("wasm-math")>();

  useEffect(() => {
    if (!wMath) {
      console.log("Importing wasm module");
      import("wasm-math").then((module) => setWMath(module));
    }
  }, [wMath]);

  const handleAddNums = () => {
    console.group("Times for adding numbers");
    console.time("WASM");
    wMath?.add_two_ints(1, 2);
    console.timeEnd("WASM");
    addTwoInts(1, 2);
    console.time("JS");
    console.timeEnd("JS");
    console.groupEnd();
  };

  const handleFibonacci = () => {
    console.group("Times for computing Fibonacci number");
    console.time("WASM");
    wMath?.fibonaci(45);
    console.timeEnd("WASM");
    console.time("JS");
    fibonaci(45);
    console.timeEnd("JS");
    console.groupEnd();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleAddNums}>Compare adding numbers</button>
        <button onClick={handleFibonacci}>Compare Fibonacci</button>
      </header>
    </div>
  );
};

export default HomePage;
