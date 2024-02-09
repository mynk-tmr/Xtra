import { createContext, useContext } from "react";

const AppContext = createContext(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};
