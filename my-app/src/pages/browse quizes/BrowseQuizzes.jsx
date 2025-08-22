import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/ContextProvider";

import "./BrowseQuizzes.css";

export default function BrowseQuizzes() {
  const { getAllQuizzes } = useContext(UserContext);
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    const stored = getAllQuizzes();
    setQuizzes(stored);
    setFilteredQuizzes(stored);
  }, [getAllQuizzes]);

  useEffect(() => {
    let filtered = quizzes;

    if (searchTerm) {
      filtered = filtered.filter((quiz) =>
        quiz.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (difficultyFilter !== "All") {
      filtered = filtered.filter((quiz) => quiz.difficulty === difficultyFilter);
    }

    filtered = filtered.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

    setFilteredQuizzes(filtered);
  }, [searchTerm, difficultyFilter, sortOrder, quizzes]);

  const handleCardClick = (quiz) => {
    navigate(`/quiz?id=${quiz.id}`);
  };

  return (
    <div className="browse-container">
        <button className="btn-back-search" onClick={() => navigate("/")}>
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
      <h2>Browse Quizzes</h2>
      <p className="browse-subtitle">Discover and take quizzes from our library</p>

      <div className="browse-filters">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Date Created (Newest)</option>
          <option value="asc">Date Created (Oldest)</option>
        </select>

        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="quiz-list">
        {filteredQuizzes.length === 0 ? (
          <p className="no-quizzes">No quizzes found.</p>
        ) : (
          filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card" onClick={() => handleCardClick(quiz)}>
              <div className={`quiz-tag ${quiz.difficulty.toLowerCase()}`}>
                {quiz.difficulty}
              </div>
              <h3 className="quiz-title">{quiz.topic} Assessment</h3>
              <p className="quiz-description">
                A {quiz.difficulty.toLowerCase()} level quiz covering {quiz.topic} in {quiz.language}.
              </p>
              <div className="quiz-footer">
                <span>{quiz.questions} questions</span>
                <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
