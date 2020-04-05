import React, { useState, useEffect, createContext, useContext } from 'react';
import SocketIO from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

const SocketContextProvider = props => {
  const [socket, setSocket] = useState(null);
  const [logedin, setLogedin] = useState(false);
  const [logedout, setLogedout] = useState(true);
  const [connected, setConnected] = useState(false);
  const { logout } = useContext(AuthContext);

  const connect = async () => {
    const token = await AsyncStorage.getItem('token');
    const socket = SocketIO(config.SOCKET, {
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      query: { token }
    });
    setSocket(socket);
    setConnected(true);
    setLogedout(false);
  }

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('connect', function () {
      console.log('connected')
    });
    socket.on('disconnect', function () {
      if(logedin || logout) {
        return;
      }
      socket.connect();
    });
    return () => {
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('connect')
      socket.removeAllListeners('unauthorized');
      socket.disconnect();
    }
  }, [socket, logedin, logout]);

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