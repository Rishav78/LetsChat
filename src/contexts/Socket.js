import React, { useState, useEffect, createContext } from 'react';
import SocketIO from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

export const SocketContext = createContext();

const socket = SocketIO('http://192.168.43.215:8000');

const SocketContextProvider = props => {

  useEffect(() => {
    login();
    return () => {
      socket.removeAllListeners('unauthorized');
      socket.disconnect();
    }
  }, []);

  const login = async () => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('authentication', { token });
    socket.on('unauthorized', function (err) {
      console.log("There was an error with the authentication:", err.message);
    });
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketContextProvider;