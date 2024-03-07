"use client";
import { React, createContext, useContext, useState } from "react";

const FetchContext = createContext();

export const FetchContextProvider = ({ children }) => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const value = { fetchAgain, setFetchAgain };
  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};
export function useFetchContext() {
  return useContext(FetchContext);
}
