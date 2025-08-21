import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { API_URL } from "../../key/AI-API-KEY";
import QuizQuestion from "../../components/quiz question/QuizQuestion";

export default function QuizPage() {
  const { quizSettings } = useContext(UserContext);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);

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
        console.log(data);
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          setError("No response from AI.");
          return;
        }
        console.log(text);

        // const jsonMatch = text.match(/\[.*\]/s);
        // if (!jsonMatch) {
        //   setError("AI did not return JSON.");
        //   return;
        // }

        // const parsedQuiz = JSON.parse(jsonMatch[0]);
        setQuiz(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizSettings]);

  if (loading) return <p>Generating your quiz...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!quiz) return <p>No quiz generated</p>;

  const handleNext = (answer) => {
    console.log("User answered:", answer);
    if (current < quiz.length - 1) setCurrent(current + 1);
    else alert("Quiz finished!");
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="p-6">
      <QuizQuestion
        question={quiz[current]}
        index={current}
        total={quiz.length}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
