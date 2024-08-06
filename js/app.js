const { useState } = React;

function App() {
  const [palettes, setPalettes] = useState([]);
  const [paletteName, setPaletteName] = useState("");
  const [colorCode, setColorCode] = useState("#ffffff");
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [error, setError] = useState("");

  const addPalette = () => {
    if (paletteName.trim()) {
      setPalettes([...palettes, { name: paletteName, colors: [] }]);
      setPaletteName("");
      setError("");
    } else {
      setError("Please enter a palette name.");
    }
  };

  const addColor = () => {
    if (selectedPalette !== null) {
      if (colorCode.trim()) {
        const updatedPalettes = palettes.map((palette, index) => {
          if (index === selectedPalette) {
            return {
              ...palette,
              colors: [...palette.colors, colorCode],
            };
          }
          return palette;
        });
        setPalettes(updatedPalettes);
        setColorCode("#ffffff");
        setError("");
      } else {
        setError("Please enter a valid color code.");
      }
    } else {
      setError("Please select a palette first.");
    }
  };

  const viewPalette = (index) => {
    setSelectedPalette(index);
    setError("");
  };

  const viewAllPalettes = () => {
    setSelectedPalette(null);
    setError("");
  };

  return (
    <div className="container">
      <h1>Color Palette Storage App</h1>
      <input
        type="text"
        placeholder="Enter Palette Name"
        value={paletteName}
        onChange={(e) => setPaletteName(e.target.value)}
      />
      <button onClick={addPalette}>Add Palette</button>
      {palettes.length > 0 && (
        <div className="palette-list">
          <button onClick={viewAllPalettes}>View All Palettes</button>
          {palettes.map((palette, index) => (
            <div key={index} className="palette">
              <h2>{palette.name}</h2>
              <button onClick={() => viewPalette(index)}>View Palette</button>
            </div>
          ))}
        </div>
      )}
      {selectedPalette !== null && (
        <div className="palette-view">
          <h2>{palettes[selectedPalette].name}</h2>
          <input
            type="color"
            value={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
          />
          <button onClick={addColor}>Add Color</button>
          <div className="colors">
            {palettes[selectedPalette].colors.map((color, index) => (
              <div
                key={index}
                className="color"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
