import React, { useEffect, useState } from "react";
import circle from "../o.png";
import cross from "../x.png";

const o = <img src={circle} className="sign" />;
const x = <img src={cross} className="sign" />;

export const Game = () => {
  const [isCross, setIsCross] = useState<Boolean>(true);

  const [table, setTable] = useState([
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ]);

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      if (
        (table[i][0] === table[i][1] && table[i][1] === table[i][2]) ||
        (table[0][i] === table[1][i] && table[1][i] === table[2][i]) ||
        (table[0][0] === table[1][1] && table[1][1] === table[2][2]) ||
        (table[0][2] === table[1][1] && table[1][1] === table[2][0])
      ) {
        alert((isCross ? "cross" : "circle") + " win!");
      }
      setIsCross(!isCross);
    }
  }, [table]);

  function setterTable(i: number, j: number) {
    let newTable = table.map((row) => row.slice());
    newTable[i][j] = isCross ? "x" : "o";
    setTable(newTable);
  }

  const drawSign = (i: number, j: number, sign: string) => {
    const turn = () => {
      setterTable(i, j);
    };
    if (sign === "o") return o;
    if (sign === "x") return x;
    return <img src={circle} className="sign-shadow" onClick={turn} />;
  };

  return (
    <>
      {isCross ? x : o}
      <p></p>
      {table.map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((sign, j) => (
            <div key={j}>{drawSign(i, j, sign)}</div>
          ))}
        </div>
      ))}
    </>
  );
};
