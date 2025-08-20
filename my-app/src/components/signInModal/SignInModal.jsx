import { useContext, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import Input from "../input/Input";
import "./SignInModal.css";

export default function SignInModal({ onClose }) {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    setError("");
    login({ email, password });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="signin-modal">
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
        <h2>Sign In</h2>
        <p>Access your QuizMaster Pro account</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            inputType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            inputType="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button className="btn-sign-in" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
