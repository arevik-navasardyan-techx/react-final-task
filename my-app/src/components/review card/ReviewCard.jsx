import "./ReviewCard.css";

export default function ReviewCard({
  question,
  options,
  index,
  correctAnswer,
  chosenAnswer,
  explanation,
}) {
  return (
    <div className="review-card">
      <div className="review-question">
        <span className="question-number">{index + 1}</span>
        <strong>{question}</strong>
      </div>

      <div className="review-options">
        {options.map((option, i) => {
          let className = "review-option";

          if (option === correctAnswer) {
            className += " correct";
          } else if (option === chosenAnswer && option !== correctAnswer) {
            className += " incorrect";
          }

          return (
            <div key={i} className={className}>
              {option}
              {option === correctAnswer ? (
                <span className="icon">✅</span>
              ) : option === chosenAnswer ? (
                <span className="icon">❌</span>
              ) : null}
            </div>
          );
        })}
      </div>

      {explanation && (
        <div className="review-explanation">
          <strong>Explanation</strong>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
