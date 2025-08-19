import Header from "./components/header/Header";
import Card from "./components/cards/Card.jsx";
import Home from "./pages/home/Home.jsx";

import { UserContext } from "./context/ContextProvider";
import { UserProvider } from "./context/ContextProvider.jsx";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <Home></Home>
    </UserProvider>
  );
}

export default App;
