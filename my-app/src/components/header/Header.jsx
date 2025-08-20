import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";

import Button from "../button/Button";

import "./Header.css";

export default function Header({ email, onLoginClick }) {
  const { logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    // navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="left-side">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-brain h-8 w-8 text-primary-foreground"
            >
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
              <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
              <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
            </svg>

            <div className="quiz-master">
              <h1>QuizMaster Pro</h1>
            </div>
          </div>
          {email ? (
            <div className="right-side">
              <div className="right-text">
                <div className="search-quiz">
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
                    class="lucide lucide-search h-4 w-4 mr-2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <p className="search-text">Browse Quizzes</p>
                </div>
                <p>Welcome, {email}</p>
              </div>
              <Button
                btnContent="Logout"
                btnFunction={handleLogout}
                classname="log out"
              ></Button>
            </div>
          ) : (
            <div className="right-side">
              <Button
                btnContent="Login"
                btnFunction={onLoginClick}
                classname="log in"
              ></Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
