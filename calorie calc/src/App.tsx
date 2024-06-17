import { useState } from "react";
import { Input } from "./components/Input";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState({
    weight: 0,
    height: 0,
    age: 0,
    gender: "",
  });
  const onsubmit = (formData: any) => {
    formData.preventDefault();
    if (!isAgeValid || !isHeightValid || !isWeightValid) {
      alert("invalid data!!!");
      return;
    }
    const caloriesW =
      10 * data.weight + 6.25 * data.height + 5 * data.age - 161;
    const caloriesM = 10 * data.weight + 6.25 * data.height + 5 * data.age + 5;
    if (data.gender == "male") alert("calories: " + caloriesM);
    else if (data.gender == "female") alert("calories: " + caloriesW);
    else alert("calories: from " + caloriesW + " to " + caloriesM);
    // wzory: test Mifflin-St Jeora
    // dla kobiet: PPM = (10 x masa ciała w kilogramach) + (6,25 x wzrost w centymetrach) + (5 x wiek w latach) – 161
    // dla mężczyzn: PPM = (10 x masa ciała w kilogramach) + (6,25 x wzrost w centymetrach) + (5 x wiek w latach) + 5
    // source: https://odchudzanie.medicover.pl/kalkulatory/kalkulator-podstawowa-przemiana-materii/
  };

  const isWeightValid = data.weight >= 0 && data.weight <= 200;
  const isHeightValid = data.height >= 0 && data.height <= 400;
  const isAgeValid = data.age >= 0 && data.age <= 120;

  return (
    <form onSubmit={onsubmit}>
      <div className="card">
        <h1>Calorie calculator</h1>
      </div>

      <div className="field">
        <label>Your weight: </label>
        <Input
          validation={isWeightValid}
          value={data.weight}
          onChange={(e) => setData({ ...data, weight: +e.target.value })}
        ></Input>
      </div>
      <div className="field">
        <label>Your height: </label>
        <Input
          validation={isHeightValid}
          value={data.height}
          onChange={(e) => setData({ ...data, height: +e.target.value })}
        ></Input>
      </div>
      <div className="field">
        <label>Your age: </label>
        <Input
          validation={isAgeValid}
          value={data.age}
          onChange={(e) => setData({ ...data, age: +e.target.value })}
        ></Input>
      </div>
      <div className="field">
        <label>Your gender:</label>
        <select
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        >
          <option value=""></option>
          <option value="male">Man</option>
          <option value="female">Woman</option>
        </select>
      </div>

      <div className="card">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
