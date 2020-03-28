import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const ChatsContext = createContext();

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([]);

  useEffect(() => {
    chats();
  }, []);

  const chats = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          query {
            chats {
              err
              chats {
                _id
                chattype
                chatname
                imageid
                createdAt
                updatedAt
              }
            }
          }
        `
      })
    });
    const {data} = await res.json();
    setAvailableChats(data.chats);
  }

  

  return (
    <ChatsContext.Provider value={{ availableChats }}>
      { children }
    </ChatsContext.Provider>
  );
}

export default ChatsContextProvider;