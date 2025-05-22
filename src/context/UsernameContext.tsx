// This context file defines one to handle the username state in a React application

"use client";

import React, { createContext, useContext, useState } from "react";

const UsernameContext = createContext<{
  username: string;
  setUsername: (name: string) => void;
}>({
  username: "User-Name Jake",
  setUsername: () => {},
});

export const UsernameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("User-Name Jake");
  return (
    <UsernameContext.Provider value = {{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => useContext(UsernameContext);
