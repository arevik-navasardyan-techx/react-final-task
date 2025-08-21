import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";

import Button from "../button/Button";
import Select from "../select/Select";
import Input from "../input/Input";

import "./CreateQuiz.css";

export default function CreateQuiz({ onClose }) {
  const { saveQuizSettings } = useContext(UserContext);
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [questions, setQuestions] = useState("5");
  const [difficulty, setDifficulty] = useState("Medium");
  const [requirements, setRequirements] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    const quizData = { topic, language, questions, difficulty, requirements };
    saveQuizSettings(quizData);
    navigate("/quiz");
    onClose();
    // console.log(quizData);
  };

  return (
    <div className="modal-backdrop">
      <div className="create-quiz-container">
        <button className="close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <h2>Create New Quiz</h2>
        <p>Configure your AI-generated quiz parameters</p>

        <Input
          label="Topic"
          placeHolder="e.g. JavaScript Fundaments, Biology"
          inputType="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        ></Input>
        <Select
          label="Language"
          options={["Armenian", "Russian", "English", "French"]}
          value={language}
          onChange={setLanguage}
        ></Select>
        <div className="two-questions">
          <Select
            label="Number of questions"
            options={[5, 10, 15, 20].map(String)} // show as strings in UI
            value={String(questions)}
            onChange={(val) => setQuestions(Number(val))} // <- convert to number
          ></Select>
          <Select
            label="Difficulty"
            options={["Medium", "Easy", "Hard"]}
            value={difficulty}
            onChange={setDifficulty}
          ></Select>
        </div>
        <Input
          label="Special Requirments"
          placeHolder="Any specific focus areas, question types, or requirements..."
          inputType="text"
          value={requirements}
          onChange={setRequirements}
        ></Input>
        <Button
          btnContent="Generate Quiz"
          classname="btn-generate-quiz"
          btnFunction={handleGenerate}
        ></Button>
      </div>
    </div>
  );
}
