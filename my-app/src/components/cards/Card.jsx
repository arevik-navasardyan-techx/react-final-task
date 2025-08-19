import "./Card.css";

export default function Card(params) {
  let { title, text, icon } = params;
  return (
    <div className="card-container">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
