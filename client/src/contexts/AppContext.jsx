/* eslint-disable react-refresh/only-export-components */
import * as apiClient from "@/libs/utils/apiClient";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const AppContext = createContext(undefined);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { isSuccess, isLoading, isFetching, isError, data, refetch } = useQuery(
    {
      queryKey: ["user"],
      queryFn: () => apiClient.get("authorize/validate-token"),
      retry: false,
    }
  );
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: isSuccess,
        isVerifying: isLoading || isFetching,
        user: isError ? null : data,
        verifyUser: refetch,
      }}>
      {children}
    </AppContext.Provider>
  );
};
