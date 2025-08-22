import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [quizSettings, setQuizSettings] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [quiz, setQuiz] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(userInfo) {
    const newUser = { ...userInfo, id: Date.now() };
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

   const saveQuizSettings = (settings) => {
    setQuizSettings(settings);

    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");

    const quizToStore = {
      ...settings,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("quizzes", JSON.stringify([quizToStore, ...storedQuizzes]));
  };

    const getAllQuizzes = () => {
    return JSON.parse(localStorage.getItem("quizzes") || "[]");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        quizSettings,
        saveQuizSettings,
        quiz,
        setQuiz,
        correctAnswers,
        setCorrectAnswers,
        chosenAnswers,
        setChosenAnswers,
        getAllQuizzes
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
