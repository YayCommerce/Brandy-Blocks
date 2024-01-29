import { RangeControl } from "@wordpress/components";

import "./index.scss";

export default function Slider({ value, onChange, min, max, label = "" }) {
  return (
    <RangeControl
      label={label}
      className="brandy-editor-slider"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  );
}
