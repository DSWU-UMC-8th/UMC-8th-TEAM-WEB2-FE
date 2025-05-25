import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface ISearchContext {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useState("");

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) throw new Error("useSearch를 사용하기 위해서는 SearchProvider 필요");

  return context;
};
