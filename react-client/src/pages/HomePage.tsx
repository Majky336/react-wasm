import React, { useEffect, useState } from "react";
import reactLogo from "../react-logo.svg";
import rustLogo from "../rust-logo.svg";
import { useHistory } from "react-router-dom";
import { MATH_PATH, PATHFINDER_PATH } from "../routing/constants/RoutePaths";

const HomePage = () => {
  const [wMath, setWMath] = useState<typeof import("wasm-math")>();
  const history = useHistory();

  useEffect(() => {
    if (!wMath) {
      console.log("Importing wasm module");
      import("wasm-math").then((module) => setWMath(module));
    }
  }, [wMath]);

  const handleRedirectToMath = () => history.push(MATH_PATH);

  const handleRedirectToPathfinder = () => history.push(PATHFINDER_PATH);

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex justify-center items-center gap-5">
          <img src={reactLogo} alt="react logo" width="35%" height="35%" />
          +
          <img src={rustLogo} alt="rust logo" width="35%" height="35%" />
        </div>
        <p>Where would you like to go?</p>
        <div className="flex flex-col gap-2">
          <button
            className="border p-2 rounded-lg text-sm"
            onClick={handleRedirectToMath}
          >
            Take me to math playground
          </button>
          <button
            className="border p-2 rounded-lg text-sm"
            onClick={handleRedirectToPathfinder}
          >
            Take me to pathfinder playground
          </button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
