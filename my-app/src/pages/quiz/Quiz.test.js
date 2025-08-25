// QuizPage.test.jsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import QuizPage from "./QuizPage";
import { UserContext } from "../../context/ContextProvider";

const mockQuiz = [
  {
    question: "Q1?",
    options: ["A", "B", "C", "D"],
    answer: "A",
  },
  {
    question: "Q2?",
    options: ["A", "B", "C", "D"],
    answer: "B",
  },
];

// Mock child components to avoid rendering complexities
jest.mock("../../components/quiz question/QuizCard", () => (props) => (
  <div>
    <div>QuizCard Mock</div>
    <button onClick={props.onPrev}>Prev</button>
    <button onClick={props.onNext}>Next</button>
  </div>
));

jest.mock("../../components/quiz results/QuizResults", () => (props) => (
  <div>QuizResult Mock - Difficulty: {props.difficulty}</div>
));

jest.mock("../loading/GeneratingQuiz", () => () => <div>Loading...</div>);

describe("QuizPage", () => {
  let contextValue;
  const setQuiz = jest.fn();
  const setCorrectAnswers = jest.fn();
  const setChosenAnswers = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    contextValue = {
      quizSettings: {
        questions: 2,
        topic: "Science",
        language: "English",
        difficulty: "Easy",
        requirements: "",
      },
      setCorrectAnswers,
      chosenAnswers: [null, null],
      setChosenAnswers,
      quiz: null,
      setQuiz,
    };
  });

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  test("shows loading initially", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [
          { content: { parts: [{ text: JSON.stringify(mockQuiz) }] } },
        ],
      }),
    });

    render(
      <UserContext.Provider value={contextValue}>
        <QuizPage />
      </UserContext.Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(setQuiz).toHaveBeenCalledWith(mockQuiz));
  });

  test("shows error if no quizSettings", async () => {
    render(
      <UserContext.Provider value={{ ...contextValue, quizSettings: null }}>
        <QuizPage />
      </UserContext.Provider>
    );

    expect(
      await screen.findByText(/No quiz settings found/)
    ).toBeInTheDocument();
  });

  test("shows error if fetch fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(
      <UserContext.Provider value={contextValue}>
        <QuizPage />
      </UserContext.Provider>
    );

    expect(await screen.findByText(/Failed to fetch quiz/)).toBeInTheDocument();
  });

  test("renders QuizCard and navigates", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [
          { content: { parts: [{ text: JSON.stringify(mockQuiz) }] } },
        ],
      }),
    });

    render(
      <UserContext.Provider value={contextValue}>
        <QuizPage />
      </UserContext.Provider>
    );

    await waitFor(() => expect(setQuiz).toHaveBeenCalled());

    // QuizCard should be visible
    expect(screen.getByText("QuizCard Mock")).toBeInTheDocument();

    // Test clicking Next button (increments current)
    fireEvent.click(screen.getByText("Next"));

    // Click Next again to finish quiz
    fireEvent.click(screen.getByText("Next"));

    // After finishing quiz, QuizResult should render
    expect(await screen.findByText(/QuizResult Mock/)).toBeInTheDocument();
    expect(screen.getByText(/Difficulty: Easy/)).toBeInTheDocument();
  });

  test("renders 'No quiz generated' if quiz is null and not loading", () => {
    render(
      <UserContext.Provider value={{ ...contextValue, quiz: null }}>
        <QuizPage />
      </UserContext.Provider>
    );

    expect(screen.getByText("No quiz generated")).toBeInTheDocument();
  });
});
