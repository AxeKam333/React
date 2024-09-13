import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const event = new Date();
  const first = new Date();
  first.setDate(1);
  const x = new Date();
  x.setDate(40);
  const lastMonthDate = 40 - x.getDate();
  const last = new Date();
  last.setDate(lastMonthDate);

  const [buttonClicked, setButtonClicked] = useState([
    event.getDate(),
    event.getDate(),
  ]);

  function AlertButton({ value, clas, children }) {
    return (
      <button
        className={clas}
        onClick={() => {
          if (buttonClicked[0] === buttonClicked[1]) {
            var newArray = [];
            newArray[0] = buttonClicked[0];
            newArray[1] = value;
            newArray.sort((a, b) => a - b);
            console.log("newArray", newArray);

            setButtonClicked(newArray);
          } else {
            console.log("oldArray", value);
            setButtonClicked([value, value]);
          }
        }}
      >
        {children}
      </button>
    );
  }

  useEffect(() => {
    console.log("e", buttonClicked);
  }, [buttonClicked]);

  const handleSubmit = (event) => {
    alert(buttonClicked);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="parent">
        {[...Array(first.getDay() + 6).keys()].map(() => (
          <div className="child child1"></div>
        ))}
        {[...Array(last.getDate()).keys()].map((val) => {
          const isPies =
            val + 1 >= buttonClicked[0] && val + 1 <= buttonClicked[1];
          console.log("a", isPies);

          const clas = "child " + (isPies ? "active" : "child2");
          return (
            <AlertButton clas={clas} value={val + 1}>
              {val + 1}
            </AlertButton>
          );
        })}
        {[...Array(last.getDay() + 5).keys()].map(() => (
          <div className="child child1"></div>
        ))}
      </div>

      <button type="submit" className="child1" value="Submit">
        Submit
      </button>
    </form>
  );
}

export default App;
