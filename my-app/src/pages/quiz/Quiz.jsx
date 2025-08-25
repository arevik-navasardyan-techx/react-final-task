import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { API_URL } from "../../key/AI-API-KEY";
import QuizCard from "../../components/quiz question/QuizCard";
import QuizResult from "../../components/quiz results/QuizResults";
import GeneratingQuiz from "../loading/GeneratingQuiz";

export default function QuizPage() {
  const {
    quizSettings,
    setCorrectAnswers,
    chosenAnswers,
    setChosenAnswers,
    quiz,
    setQuiz,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    if (!quizSettings) {
      setError("No quiz settings found. Go back and create a quiz.");
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const prompt = `
Generate a quiz with ${quizSettings.questions}.
Topic: ${quizSettings.topic}
Language: ${quizSettings.language}
Difficulty: ${quizSettings.difficulty}
Requirements: ${quizSettings.requirements || "None"}

Return JSON in this format ONLY:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "string"
  }
]
  example:
  "question": "Which type of cell lacks a nucleus and membrane-bound organelles?", 
  "options": ["A. Eukaryotic cell", "B. Prokaryotic cell", "C. Animal cell", "D. Plant cell"], 
  "answer": "B. Prokaryotic cell"
`;

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch quiz");

        const data = await response.json();

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(text);

        if (!text) {
          setError("No response from AI.");
          return;
        }
        console.log(text);

        let parsed;
        try {
          const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          parsed = JSON.parse(cleaned);
        } catch (e) {
          throw new Error("Invalid quiz format received");
        }

        setQuiz(parsed);
        setCorrectAnswers(parsed.map((q) => q.answer));
        setChosenAnswers(new Array(parsed.length).fill(null));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizSettings]);

  const handleNext = () => {
    if (current === quiz.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  if (loading) return <GeneratingQuiz></GeneratingQuiz>;
  if (error) return <p>Error: {error}</p>;
  if (!quiz) return <p>No quiz generated</p>;

  return (
    <div>
      {isQuizFinished ? (
        <QuizResult
          quiz={quiz}
          chosenAnswers={chosenAnswers}
          difficulty={quizSettings.difficulty}
        />
      ) : (
        <QuizCard
          question={quiz[current]}
          index={current}
          total={quiz.length}
          onNext={handleNext}
          onPrev={handlePrev}
          chosenAnswers={chosenAnswers}
          setChosenAnswers={setChosenAnswers}
        />
      )}
    </div>
  );
}
