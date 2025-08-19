import "./InfoCard.css";

export default function InfoCard(params) {
  let { text, number } = params;
  return (
    <div className="info-card">
      <div className="number">{number}</div>
      <p>{text}</p>
    </div>
  );
}
