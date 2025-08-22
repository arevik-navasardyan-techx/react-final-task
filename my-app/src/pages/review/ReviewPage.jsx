import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import ReviewCard from "../../components/review card/ReviewCard";

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
            question={question}
            userAnswer={chosenAnswers[i]}
            correctAnswer={correctAnswers[i]}
            index={i}
          />
        ))}
      </div>

      <div className="review-footer">
        <p>Your Performance</p>
        <strong>{percentage}%</strong>
        <p>
          {correctCount} Correct | {quizLength - correctCount} Incorrect
        </p>
      </div>
    </div>
  );
}
