import Select from "../Select";

const options = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Regular",
    value: "regular",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Large",
    value: "large",
  },
];

export default function Shadow({ selected, onChange, ...rest }) {
  const handleChange = (v) => {
    if (v === "none") {
      onChange({
        type: v,
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: "#ffffff",
      });
    }
    if (v == "small") {
      onChange({
        type: v,
        x: 0,
        y: 4,
        blur: 16,
        spread: 0,
        color: "rgba(0, 0, 0, 0.06)",
      });
    }
    if (v == "regular") {
      onChange({
        type: v,
        x: 0,
        y: 4,
        blur: 16,
        spread: 0,
        color: "rgba(0, 0, 0, 0.05)",
      });
    }
    if (v == "medium") {
      onChange({
        type: v,
        x: 0,
        y: 6,
        blur: 20,
        spread: 0,
        color: "rgba(0, 0, 0, 0.10)",
      });
    }
    if (v == "large") {
      onChange({
        type: v,
        x: 0,
        y: 10,
        blur: 26,
        spread: 0,
        color: "rgba(0, 0, 0, 0.16)",
      });
    }
  };
  return (
    <div className="brandy-editor-shadow">
      <Select
        options={options}
        selected={selected}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
}
