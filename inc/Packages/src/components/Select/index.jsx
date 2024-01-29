import "./index.scss";

export default function Select({ options = [], selected, onChange }) {
  const handleChange = (v) => {
    onChange(v.target.value);
  };
  return (
    <select
      className="brandy-editor-select"
      value={selected}
      onChange={handleChange}
      onfocus="this.size=10;"
      onblur="this.size=1;"
    >
      {options.map((o) => (
        <option value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
