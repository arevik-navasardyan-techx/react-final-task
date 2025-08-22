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
                <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big h-4 w-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg></span>
              ) : option === chosenAnswer ? (
                <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x h-4 w-4 text-red-600"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg></span>
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
