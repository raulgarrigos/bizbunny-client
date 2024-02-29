import React, { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeWrapper(props) {
  const [altTheme, setAltTheme] = useState(false);

  const toggleTheme = () => {
    setAltTheme(!altTheme);
  };

  const selectedPageTheme = altTheme ? "alt-page" : "default-page";

  const selectedBtnTheme = altTheme ? "alt-btn" : "default-btn";

  const passedContext = {
    altTheme,
    toggleTheme,
    selectedPageTheme,
    selectedBtnTheme,
  };

  return (
    <ThemeContext.Provider value={passedContext}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeWrapper };
