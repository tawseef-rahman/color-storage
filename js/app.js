const { useState } = React;

function App() {
  const [palettes, setPalettes] = useState([]);
  const [paletteName, setPaletteName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [selectedPalette, setSelectedPalette] = useState(null);

  const addPalette = () => {
    if (paletteName.trim()) {
      setPalettes([...palettes, { name: paletteName, colors: [] }]);
      setPaletteName("");
    }
  };

  const addColor = () => {
    if (selectedPalette !== null && colorCode.trim()) {
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
      setColorCode("");
    }
  };

  const viewPalette = (index) => {
    setSelectedPalette(index);
  };

  const viewAllPalettes = () => {
    setSelectedPalette(null);
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
            type="text"
            placeholder="Enter HEX or RGB Color Code"
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
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
