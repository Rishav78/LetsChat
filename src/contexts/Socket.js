import React, { useState, useEffect, createContext, useContext } from 'react';
import SocketIO from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

const SocketContextProvider = props => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const io = SocketIO(config.SOCKET, { 
      transports: ['websocket', 'polling']
    });
    AsyncStorage.getItem('token')
      .then(token => {
        
        io.emit('authentication', { token });
        io.on('unauthorized', function (err) {
          console.log("There was an error with the authentication:", err.message);
        });
        setConnected(true);
        setSocket(io);
      })
    return () => {
      io.removeAllListeners('unauthorized');
      io.disconnect();
    }
  }, []);

  const disconnectSocket = () => {
    socket.disconnect();
    logout();
  }

  return (
    <SocketContext.Provider value={{ socket, disconnectSocket, connected }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;