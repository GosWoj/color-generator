import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";
import Values from "values.js";

function App() {
  const [color, setColor] = useState("#06D6A0");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#06D6A0").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const randomColor = () => {
    const random =
      "#" +
      Math.round(0xffffff * Math.random())
        .toString(16)
        .padStart(6, "0");
    setColor(random);
  };

  useEffect(() => {
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, [color]);

  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#06D6A0"
            className={`${error ? "error" : null}`}
          />
          <button type="submit" className="btn" onClick={() => randomColor()}>
            Random
          </button>
        </form>
        {error && <p className="error">Input correct value</p>}
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
