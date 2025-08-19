import "./Input.css";

export default function Input(params) {
  let { label, placeHolder, inputType, value, onChange } = params;

  return (
    <div className="input-container">
      <label htmlFor="input">{label}</label>
      <input
        type={inputType}
        id="input"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
