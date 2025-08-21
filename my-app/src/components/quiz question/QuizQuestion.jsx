import React from "react";
import "./QuizQuestion.css";

const QuizQuestion = ({ question, currentIndex, total, onNext, onPrev }) => {
  if (!question) {
    return <p>Loading question...</p>;
  }

  const options = question.options || [];

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">
        {question.question} (Question {currentIndex + 1} of {total})
      </h2>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        ></div>
      </div>

      <ul className="answers-list">
        {options.length > 0 ? (
          <li className="answer-option">
            <label>
              <input type="radio" name={`q-${currentIndex}`} value={opt} />
              {opt}
            </label>
          </li>
        ) : (
          <p>No options available</p>
        )}
      </ul>

      <div className="navigation-buttons">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="nav-btn"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className="nav-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
