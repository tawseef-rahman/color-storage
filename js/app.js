const { useState } = React;

function App() {
  const [palettes, setPalettes] = useState([]);
  const [paletteName, setPaletteName] = useState("");
  const [colorCode, setColorCode] = useState("#ffffff");
  const [rgbColor, setRgbColor] = useState("");
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
      const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(colorCode);
      const isRgb = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/i.test(rgbColor);

      if (isHex || isRgb) {
        const colorValue = isHex ? colorCode : rgbColor;
        const updatedPalettes = palettes.map((palette, index) => {
          if (index === selectedPalette) {
            return {
              ...palette,
              colors: [...palette.colors, colorValue],
            };
          }
          return palette;
        });
        setPalettes(updatedPalettes);
        setColorCode("#ffffff");
        setRgbColor("");
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

  const getColorInfo = (color) => {
    if (color.startsWith("#")) {
      const hex = color;
      const rgb = hexToRgb(color);
      return { hex, rgb };
    } else {
      const rgb = color;
      const hex = rgbToHex(color);
      return { hex, rgb };
    }
  };

  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHex = (rgb) => {
    let result = rgb.match(/\d+/g).map((num) => {
      let hex = parseInt(num).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    });
    return `#${result.join("")}`;
  };

  return (
    <div className="container">
      <h1>ColorStorage</h1>
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
          <input
            type="text"
            placeholder="Enter RGB Color Code"
            value={rgbColor}
            onChange={(e) => setRgbColor(e.target.value)}
          />
          <button onClick={addColor}>Add Color</button>
          <div className="colors">
            {palettes[selectedPalette].colors.map((color, index) => {
              const { hex, rgb } = getColorInfo(color);
              return (
                <div
                  key={index}
                  className="color"
                  style={{ backgroundColor: color }}
                >
                  <span>
                    {hex}
                    <br />
                    {rgb}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
