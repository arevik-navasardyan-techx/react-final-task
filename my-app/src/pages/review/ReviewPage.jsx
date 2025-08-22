import { useContext } from "react";

import { UserContext } from "../../context/ContextProvider";
import ReviewCard from "../../components/review card/ReviewCard";

import "./ReviewPage.css"

export default function ReviewPage() {
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
