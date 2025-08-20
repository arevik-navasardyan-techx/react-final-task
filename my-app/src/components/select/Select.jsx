import "./Select.css";

export default function Select({
  label,
  options = [],
  value,
  onChange = () => {},
}) {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select
        className="custom-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
