import { __ } from "@wordpress/i18n";
import "./index.scss";

const InputItem = ({ attribute, value, title, onChange, min = 0, max }) => {
  const handleChange = (e) => {
    let v = e.target.value;
    if (v < min) {
      v = min;
    }
    if (max && v > max) {
      v = max;
    }
    if (v == "" || v == null) {
      v = 0;
    }
    onChange(v);
  };
  return (
    <div className="brandy-editor-spacing__item">
      <input type="number" value={value} onChange={handleChange} min={min} />
      <span>{title}</span>
    </div>
  );
};

const options = [
  {
    key: "top",
    label: __("Top", "brandy"),
  },
  {
    key: "right",
    label: __("Right", "brandy"),
  },
  {
    key: "bottom",
    label: __("Bottom", "brandy"),
  },
  {
    key: "left",
    label: __("Left", "brandy"),
  },
];

export default function Spacing({ value, onChange }) {
  const handleChange = (key) => (v) => {
    if (value.constrain) {
      onChange({
        ...value,
        top: v,
        left: v,
        right: v,
        bottom: v,
      });
    } else {
      onChange({
        ...value,
        [key]: v,
      });
    }
  };

  const toggleConstrain = () => {
    const v = !value.constrain;
    const newSpacing = {
      ...value,
    };
    if (v) {
      newSpacing.right = value.top;
      newSpacing.bottom = value.top;
      newSpacing.left = value.top;
    }
    onChange({
      ...newSpacing,
      constrain: v,
    });
  };
  return (
    <div className="brandy-editor-spacing">
      {options.map((o) => (
        <InputItem
          attribute={o.key}
          value={value[o.key]}
          title={o.label}
          onChange={handleChange(o.key)}
        />
      ))}
      <div
        className={`brandy-editor-spacing__constrain ${
          value.constrain ? "constrain-active" : ""
        }`}
        onClick={toggleConstrain}
      >
        <svg
          width="10"
          height="20"
          viewBox="0 0 10 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 6V14M9 13V15C9 16.0609 8.57857 17.0783 7.82843 17.8284C7.07828 18.5786 6.06087 19 5 19C3.93913 19 2.92172 18.5786 2.17157 17.8284C1.42143 17.0783 1 16.0609 1 15V13M9 7V5C9 3.93913 8.57857 2.92172 7.82843 2.17157C7.07828 1.42143 6.06087 1 5 1C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V7"
            stroke="#5a6d80"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
