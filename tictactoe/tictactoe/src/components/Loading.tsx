import React from "react";
import logo from "../play.png";

export const Loading = (props: { startGame: any }) => {
  function start() {
    props.startGame(true);
  }
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" onClick={start} />
      <p>Click to play tic tac toe!</p>
    </>
  );
};
