const { useState } = React;

function App() {
  const [palettes, setPalettes] = useState([]);
  const [paletteName, setPaletteName] = useState("");
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(null);
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [error, setError] = useState("");
  const [viewAllPalettes, setViewAllPalettes] = useState(true);

  const handleAddColor = () => {
    if (selectedPaletteIndex !== null) {
      if (validateHex(hex) && validateRgb(rgb)) {
        const newPalettes = [...palettes];
        newPalettes[selectedPaletteIndex].colors.push({ hex, rgb });
        setPalettes(newPalettes);
        setHex("");
        setRgb("");
        setError("");
      } else {
        setError("Invalid HEX or RGB code.");
      }
    } else {
      setError("Please select a palette.");
    }
  };

  const handleSavePalette = () => {
    if (paletteName) {
      setPalettes([...palettes, { name: paletteName, colors: [] }]);
      setPaletteName("");
    }
  };

  const handleHexChange = (e) => {
    const color = e.target.value;
    setHex(color);
    if (validateHex(color)) {
      const rgb = hexToRgb(color);
      setRgb(rgb);
      setError("");
    } else {
      setRgb("");
      setError("Invalid HEX code.");
    }
  };

  const handleRgbChange = (e) => {
    const color = e.target.value;
    setRgb(color);
    if (validateRgb(color)) {
      const hex = rgbToHex(color);
      setHex(hex);
      setError("");
    } else {
      setHex("");
      setError("Invalid RGB code.");
    }
  };

  const validateHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

  const validateRgb = (rgb) =>
    /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(rgb);

  const hexToRgb = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHex = (rgb) => {
    const result = rgb.match(/\d+/g);
    if (result) {
      let r = parseInt(result[0]).toString(16);
      let g = parseInt(result[1]).toString(16);
      let b = parseInt(result[2]).toString(16);

      r = r.length === 1 ? "0" + r : r;
      g = g.length === 1 ? "0" + g : g;
      b = b.length === 1 ? "0" + b : b;

      return `#${r}${g}${b}`;
    }
    return "";
  };

  return (
    <div className="container">
      <h1>Color Palette Saver</h1>
      <div>
        <input
          type="text"
          placeholder="Palette Name"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
        />
        <button onClick={handleSavePalette}>Create Palette</button>
      </div>
      <div>
        <select
          value={selectedPaletteIndex}
          onChange={(e) => setSelectedPaletteIndex(Number(e.target.value))}
        >
          <option value={null}>Select Palette</option>
          {palettes.map((palette, index) => (
            <option key={index} value={index}>
              {palette.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="HEX Code"
          value={hex}
          onChange={handleHexChange}
        />
        <input
          type="text"
          placeholder="RGB Code"
          value={rgb}
          onChange={handleRgbChange}
        />
        <input
          type="color"
          value={hex}
          onChange={(e) =>
            handleHexChange({ target: { value: e.target.value } })
          }
        />
        <button onClick={handleAddColor}>Add Color</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <button onClick={() => setViewAllPalettes(!viewAllPalettes)}>
          {viewAllPalettes ? "View Selected Palette" : "View All Palettes"}
        </button>
      </div>
      {selectedPaletteIndex !== null && !viewAllPalettes && (
        <div>
          <h2>{palettes[selectedPaletteIndex].name} Palette</h2>
          <div className="palette">
            {palettes[selectedPaletteIndex].colors.map((color, index) => (
              <div
                key={index}
                className="color-box"
                style={{ backgroundColor: color.hex }}
              >
                <div className="color-info">
                  <div>{color.hex}</div>
                  <div>{color.rgb}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {viewAllPalettes && (
        <div>
          <h2>Saved Palettes</h2>
          {palettes.map((palette, index) => (
            <div key={index} className="palette">
              <h3>{palette.name}</h3>
              {palette.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="color-box"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="color-info">
                    <div>{color.hex}</div>
                    <div>{color.rgb}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
