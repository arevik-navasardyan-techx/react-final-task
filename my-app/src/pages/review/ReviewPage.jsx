import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/ContextProvider";
import ReviewCard from "../../components/review card/ReviewCard";

import "./ReviewPage.css"

export default function ReviewPage() {
  const navigate = useNavigate();
  const { quiz, correctAnswers, chosenAnswers, quizSettings } =
    useContext(UserContext);

  if (!quiz || !correctAnswers || !chosenAnswers) {
    return <p>Loading review data...</p>;
  }
  const quizLength = correctAnswers.length;
  const correctCount = correctAnswers.filter(
    (ans, i) => ans === chosenAnswers[i]
  ).length;

  const percentage = Math.round((correctCount / quizLength) * 100);

  return (
    <div className="review-container">
      <button className="btn-back-search" onClick={() => navigate("/search")}>
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
        Back To Search
      </button>
      <h2 className="review-title">
        {quizSettings?.topic || "Quiz"} Assessment Review
      </h2>
      <p className="review-subtitle">
        Difficulty: {quizSettings?.difficulty || "Unknown"} | Language:{" "}
        {quizSettings?.language || "N/A"}
      </p>

      <div className="review-cards-wrapper">
        {quiz.map((question, i) => (
          <ReviewCard
  key={i}
  question={question.question}
  options={question.options}
  chosenAnswer={chosenAnswers[i]}
  correctAnswer={correctAnswers[i]}
  index={i}
/>

        ))}
      </div>

      <div className="review-footer">
  <h3 className="review-footer-title">Your Performance</h3>
  <div className="review-stats">
    <div className="review-stat">
      <p className="review-value review-blue">{percentage}%</p>
      <p className="review-label">Overall Score</p>
    </div>
    <div className="review-stat">
      <p className="review-value review-green">{correctCount}</p>
      <p className="review-label">Correct</p>
    </div>
    <div className="review-stat">
      <p className="review-value review-red">{quizLength - correctCount}</p>
      <p className="review-label">Incorrect</p>
    </div>
    <div className="review-stat">
      <p className="review-value">{quizLength}</p>
      <p className="review-label">Total Questions</p>
    </div>
  </div>
  <p className="review-timestamp">
    Completed on {new Date().toLocaleString()}
  </p>
</div>
</div>
  );
}
