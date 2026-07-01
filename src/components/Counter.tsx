import { useState } from "react";
import CounterButton from "./CounterButton";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState(0);

  function handleCounters(operator: "-" | "+") {
    setCount((c) => (operator === "+" ? c + 1 : c - 1));
    setClicks((c) => c + 1);
  }
  function handleReset() {
    setClicks(0);
    setCount(0);
  }
  return (
    <section>
      <h1>Hello Monika</h1>
      <p>I am preparing for frontend interviews.</p>
      <p> Count: {count}</p>
      <CounterButton label="-" onClick={() => handleCounters("-")} />
      <span style={{ margin: "0 5px" }}></span>
      <CounterButton label="+" onClick={() => handleCounters("+")} />
      <p>You've clicked the buttons {clicks} times.</p>
      <CounterButton label="Reset" onClick={handleReset} />
    </section>
  );
}
