import { useState, useContext } from "react";
import { UserContext } from "../../context/ContextProvider";

import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Features from "../../components/features/Features";
import InfoSection from "../../components/bottom section/InfoSection";
import SignInModal from "../../components/signInModal/SignInModal";
import CreateQuiz from "../../components/createQuiz/CreateQuiz";

import "./Home.css";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useContext(UserContext);

  const handleLoginClick = () => {
    if (!user) {
      setShowLoginModal(true);
    }
  };

  const handleCreateClick = () => {
    if (user) {
      setShowCreateModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="home-container">
      <Header email={user?.email} onLoginClick={handleLoginClick}></Header>
      <div className="upper-section">
        <Title
          mainText="Enterprise AI Quiz Platform"
          smallText="Harness the power of artificial intelligence to create, manage, and analyze professional quizzes. Built for enterprise-scale learning and assessment."
        ></Title>
        <Button
          btnContent="Create Quiz"
          classname="btn-create-quiz"
          btnFunction={handleCreateClick}
          icon={
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
              class="lucide lucide-plus h-5 w-5 mr-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          }
        ></Button>
        <Features></Features>
        <InfoSection></InfoSection>
      </div>

      {showLoginModal && (
        <SignInModal onClose={() => setShowLoginModal(false)} />
      )}
      {showCreateModal && (
        <CreateQuiz onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
