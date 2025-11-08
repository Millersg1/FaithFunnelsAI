import { useState } from "react";
import { ColorPicker } from "../color-picker";

export default function ColorPickerExample() {
  const [color, setColor] = useState("#6366f1");

  return (
    <div className="space-y-4">
      <ColorPicker
        label="Primary Color"
        color={color}
        onChange={(newColor) => {
          console.log("Color changed to:", newColor);
          setColor(newColor);
        }}
      />
      <div className="p-4 rounded-md" style={{ backgroundColor: color }}>
        <p className="text-white font-medium">Preview</p>
      </div>
    </div>
  );
}
