import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { Button } from "react-bootstrap";
import { ThemeContext } from "./context/theme.context";
import "./styles/App.css";
import Boards from "./pages/boards/Boards";
import BoardDetails from "./pages/boards/BoardDetails";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";

function App() {
  const { toggleTheme, selectedPageTheme } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(selectedPageTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
      setCurrentTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.style.background = currentTheme.includes("alt-page")
      ? "linear-gradient(to bottom, #ffed8a, #fffaa9)"
      : "linear-gradient(to bottom, #60b6d7, #a6dcef)";
  }, [currentTheme]);

  const handleThemeToggle = () => {
    const newTheme =
      currentTheme === "default-page" ? "alt-page" : "default-page";
    setCurrentTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  return (
    <div className={currentTheme}>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardDetails />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Button className="theme-btn" onClick={handleThemeToggle}>
        Theme
      </Button>
    </div>
  );
}

export default App;
