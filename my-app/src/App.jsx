import Header from "./components/header/Header";
import Card from "./components/cards/Card.jsx";
import Home from "./pages/home/Home.jsx";
import QuizPage from "./pages/quiz/Quiz.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./context/ContextProvider";
import { UserProvider } from "./context/ContextProvider.jsx";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/quiz", element: <QuizPage /> },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
