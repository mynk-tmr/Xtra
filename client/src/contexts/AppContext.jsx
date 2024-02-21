import * as apiClient from "@/libs/utils/apiClient";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const AppContext = createContext(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { isSuccess, isLoading, data } = useQuery({
    queryKey: "validateToken",
    queryFn: () => apiClient.get("authorize/validate-token"),
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <AppContext.Provider
      value={{ isLoggedIn: isSuccess, isVerifying: isLoading, user: data }}>
      {children}
    </AppContext.Provider>
  );
};
