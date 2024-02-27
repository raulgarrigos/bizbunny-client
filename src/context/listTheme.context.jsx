import React, { createContext, useState } from "react";

const ListThemeContext = createContext();

function ListThemeWrapper(props) {
  const [listThemes, setListThemes] = useState({});

  // Function to toggle the theme of a list identified by its ID
  const toggleListTheme = (listId, theme) => {
    setListThemes((prevThemes) => ({
      ...prevThemes,
      [listId]: theme,
    }));
  };

  // Function to get the theme of a list by its ID
  const getListTheme = (listId) => {
    return listThemes[listId] || "default-list";
  };

  const passedListContext = {
    toggleListTheme,
    getListTheme,
  };

  return (
    <ListThemeContext.Provider value={passedListContext}>
      {props.children}
    </ListThemeContext.Provider>
  );
}

export { ListThemeContext, ListThemeWrapper };
