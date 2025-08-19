import "./Title.css";

export default function Title({ mainText, smallText }) {
  return (
    <div className="title-container">
      <h1>{mainText}</h1>
      <p>{smallText}</p>
    </div>
  );
}
