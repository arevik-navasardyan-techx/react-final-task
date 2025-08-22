import { useNavigate } from "react-router-dom";

import "./QuizResults.css";

export default function QuizResult({ quiz, chosenAnswers, difficulty }) {
  const navigate = useNavigate();

  const total = quiz.length;
  const correctCount = quiz.filter(
    (q, i) => q.answer === chosenAnswers[i]
  ).length;
  const percentage = Math.round((correctCount / total) * 100);
  const incorrectCount = total - correctCount;

  return (
    <div className="result-container">
      <div className="result-box">
        <div className="result-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="check-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="result-title">Quiz Complete!</h2>
        <h1 className="result-percentage">{percentage}%</h1>
        <p className="result-score">
          {correctCount} out of {total} correct
        </p>

        <div className="result-stats">
          <div className="stat">
            <p className="stat-number">{correctCount}</p>
            <p className="stat-label">Correct</p>
          </div>
          <div className="stat">
            <p className="stat-number">{incorrectCount}</p>
            <p className="stat-label">Incorrect</p>
          </div>
          <div className="stat">
            <p className="stat-number">{difficulty}</p>
            <p className="stat-label">Difficulty</p>
          </div>
        </div>

        <div className="result-buttons">
          <button className="btn-home" onClick={() => navigate("/")}>
            Return Home
          </button>
          <button className="btn-review" onClick={() => navigate("/review")}>
            Review Answers
          </button>
        </div>
      </div>
    </div>
  );
}
