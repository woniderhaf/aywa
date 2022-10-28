import React, {createContext, FC, useMemo, useState} from 'react';

// interface {
// activeStories: string[] | null
// setActiveStories: Dispatch<string[]|null>
// }

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [activeStories, setActiveStories] = useState(null);
  const value = useMemo(
    () => ({
      setActiveStories,
      activeStories,
    }),
    [activeStories],
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
