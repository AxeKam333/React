import { log } from "console";
import React, { useEffect } from "react";
import { useState } from "react";

export function Calculator() {
  const [input, setInput] = useState("2+2");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (history.length > 4) {
      let newHistory = [...history];
      newHistory.shift();
      setHistory(newHistory);
    }
  }, [history]);

  function parser(input: string) {
    return eval(input.valueOf());
  }

  function onSubmit(formData: any) {
    formData.preventDefault();
    console.log("log", input);
    const sum = parser(input);
    const newRecord = input + "=" + sum;
    setHistory([...history, newRecord]);
    setInput(sum);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        {history.map((record) => (
          <p>{record}</p>
        ))}
        <input
          type="text"
          name="itemName"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </>
  );
}
