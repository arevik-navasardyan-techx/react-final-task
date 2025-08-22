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

  function saveQuizSettings(settings) {
    setQuizSettings(settings);
    localStorage.setItem("quizSettings", JSON.stringify(settings));
  }

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
