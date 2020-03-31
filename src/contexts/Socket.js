import React, { useState, useEffect, createContext, useContext } from 'react';
import SocketIO from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

// const socket = SocketIO('http://192.168.43.215:8000');

const SocketContextProvider = props => {
  const [socket, setSocket] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    console.log('connect socket call');
    ConnectSocket();
  }, []);

  const ConnectSocket = async () => {
    const io = SocketIO('http://192.168.43.215:8000');
    const token = await AsyncStorage.getItem('token');
    io.emit('authentication', { token });
    io.on('unauthorized', function (err) {
      console.log("There was an error with the authentication:", err.message);
      io.removeAllListeners('unauthorized');
    });
    setSocket(io);
  }

  const disconnectSocket = () => {
    socket.disconnect();
    logout();
  }

  return (
    <SocketContext.Provider value={{ socket, disconnectSocket }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;