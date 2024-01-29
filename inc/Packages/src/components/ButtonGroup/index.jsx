import { ButtonGroup as WpButtonGroup, Button } from "@wordpress/components";
import "./index.scss";

export default function ButtonGroup({
  options = [],
  selected,
  onChange,
  className = "",
}) {
  const handleChange = (v) => {
    onChange(v);
  };
  return (
    <WpButtonGroup className={`brandy-editor-btn-group ${className}`}>
      {options.map((o) => (
        <Button
          onClick={() => {
            handleChange(o.value);
          }}
          className={selected === o.value ? "selected" : ""}
        >
          {o.label}
        </Button>
      ))}
    </WpButtonGroup>
  );
}
