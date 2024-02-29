import React, { createContext, useState } from "react";

const ListThemeContext = createContext();

function ListThemeWrapper(props) {
  const [listThemes, setListThemes] = useState({});

  const toggleListTheme = (listId, theme) => {
    setListThemes((prevThemes) => ({
      ...prevThemes,
      [listId]: theme,
    }));
  };

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
