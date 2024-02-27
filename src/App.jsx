import React, { useEffect } from "react";
import "./styles/App.css";

import { Routes, Route } from "react-router";

import Boards from "./pages/boards/Boards";
import BoardDetails from "./pages/boards/BoardDetails";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";

import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import { Button } from "react-bootstrap";

function App() {
  const { toggleTheme, selectedPageTheme, selectedBtnTheme } =
    useContext(ThemeContext);

  const handleThemeToggle = () => {
    toggleTheme();
    document.body.style.background = selectedPageTheme.includes("default-page")
      ? "linear-gradient(to bottom, #ffed8a, #fffaa9 )"
      : "linear-gradient(to bottom, #60b6d7, #a6dcef)";
  };

  return (
    <div className={selectedPageTheme}>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardDetails />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Button className={selectedBtnTheme} onClick={handleThemeToggle}>
        Theme
      </Button>
    </div>
  );
}

export default App;
