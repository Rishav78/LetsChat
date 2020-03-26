import React, { createContext } from 'react';
import SocketIO from 'socket.io-client';

const socket = SocketIO.connect('http://192.168.43.215:8000');

export const SocketContext = createContext();

const SocketContextProvider = props => {
  return (
    <SocketContext.Provider value={{ socket }}>
      { props.children }
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;