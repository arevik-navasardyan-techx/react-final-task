import "./Button.css";

export default function Button({ btnContent, classname, icon, btnFunction }) {
  return (
    <button className={classname} onClick={btnFunction}>
      {icon}
      {btnContent}
    </button>
  );
}
