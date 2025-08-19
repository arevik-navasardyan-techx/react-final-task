import Input from "../input/Input";

import "./SignInModal.css";

export default function SignInModal() {
  return (
    <div className="signin-modal">
      <h2>Sign In</h2>
      <p>Access your QuizMaster Pro account</p>
      <Input label="Email" inputType="email"></Input>
      <Input label="Password" inputType="password"></Input>
      <button className="btn-sign-in">Sign In</button>
    </div>
  );
}
