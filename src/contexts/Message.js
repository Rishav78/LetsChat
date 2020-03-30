import React, { useContext, createContext } from 'react';

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  return (
    <MessageContext.Provider>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;