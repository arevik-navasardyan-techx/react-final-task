import "./QuizCard.css";

export default function QuizCard({
  question,
  index,
  total,
  onNext,
  onPrev,
  chosenAnswers,
  setChosenAnswers,
}) {
  if (!question || !question.options || question.options.length === 0)
    return null;

  const selected = chosenAnswers[index];

  const handleSelect = (answer) => {
    const updated = [...chosenAnswers];
    updated[index] = answer;
    setChosenAnswers(updated);
  };

  console.log(chosenAnswers);
  return (
    <div className="quiz-card">
      <button className="btn-back-home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-left h-4 w-4 mr-2"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        Back To Home
      </button>
      <div className="quiz-header">
        <h2 className="quiz-title">
          Question {index + 1} of {total}
        </h2>
        <p className="quiz-question">{question.question}</p>
      </div>

      <div className="quiz-options">
        {question.options.map((opt, i) => (
          <label className="quiz-option" key={i}>
            <input
              type="radio"
              name={`q${index}`}
              value={opt}
              checked={selected === opt}
              onChange={() => handleSelect(opt)}
            />
            <span className="option-text">{opt}</span>
          </label>
        ))}
      </div>

      <div className="quiz-navigation">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="btn btn-prev"
        >
          Previous
        </button>

        <button onClick={onNext} className="btn btn-next">
          {index === total - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
