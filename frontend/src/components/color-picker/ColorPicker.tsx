import React from "react";
import { SwatchesPicker } from "react-color";

interface ColorPickerProps {
  onChange: (hex) => void;
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const onChangeHandler = (data: { hex: string }) => {
    onChange(data.hex)
  }

  return (
    <SwatchesPicker onChange={onChangeHandler} />
  );
};

export default ColorPicker;
