import { createContext, useContext, useState } from "react";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [table, setTable] = useState("");
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleToggle = () => setOpenMenu((prev) => !prev);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        open,
        table,
        setTable,
        handleClick,
        openMenu,
        setOpenMenu,
        handleToggle,
        setOpen,
        editData,
        edit,
        setEditData,
        setEdit,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
