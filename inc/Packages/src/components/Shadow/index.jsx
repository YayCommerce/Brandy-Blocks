import Select from "../Select";

const options = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Shadow 1",
    value: "shadow_1",
  },
  {
    label: "Shadow 2",
    value: "shadow_2",
  },
  {
    label: "Shadow 3",
    value: "shadow_3",
  },
  {
    label: "Shadow 4",
    value: "shadow_4",
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
        color: "#000000",
      });
    }
    if (v == "shadow_1") {
      onChange({
        type: v,
        x: 0,
        y: 4,
        blur: 16,
        spread: 0,
        color: "rgba(0, 0, 0, 0.06)",
      });
    }
    if (v == "shadow_2") {
      onChange({
        type: v,
        x: 0,
        y: 4,
        blur: 16,
        spread: 0,
        color: "rgba(0, 0, 0, 0.05)",
      });
    }
    if (v == "shadow_3") {
      onChange({
        type: v,
        x: 0,
        y: 6,
        blur: 20,
        spread: 0,
        color: "rgba(0, 0, 0, 0.10)",
      });
    }
    if (v == "shadow_4") {
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
