import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/ContextProvider.jsx";

import Home from "./pages/home/Home.jsx";
import QuizPage from "./pages/quiz/Quiz.jsx";
import ReviewPage from "./pages/review/ReviewPage.jsx";

import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/quiz", element: <QuizPage /> },
  { path: "/review", element: <ReviewPage /> },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
