import React, { useContext, createContext, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { DatabseContext } from './Database';

export const MessageStateContext = createContext();
export const MessageDispatchContext = createContext();

const MessageContextProvider = ({ children }) => {
  const { db } = useContext(DatabseContext);

  const createAndSaveMessage = async (message, chat) => {
    const { number, countrycode } = JSON.parse(await AsyncStorage.getItem('phone'));
    const name = await AsyncStorage.getItem('username');
    const data = { 
      id: uuidv4(),
      message, 
      sender: {
        name, countrycode, number
      },
      sendbyme: 1,
      createdAt: Date(),
      updatedAt: Date()
    };
    insert({ ...data, chatid: chat.id, message });
    return data;
  }

  const getMessages = (chatid, cb) => {
    db.transaction( tx => { 
      tx.executeSql(`
        SELECT * FROM MESSAGES
        WHERE chatid="${chatid}"
      `, [], (tx, result) => {
        const data = {};
        for(let i=0; i<result.rows.length; i++) {
          const item = result.rows.item(i);
          data[item.id] = item;
        }
        cb(data);
      });
    }, err => console.log(err));
  }

  const insert = data => {
    db.transaction( tx => { 
      tx.executeSql(`
        INSERT INTO 
        MESSAGES (
          id,
          chatid,
          sender,
          message,
          sendbyme,
          createdAt,
          updatedAt
        )
        VALUES (
          "${data.id}", 
          "${data.chatid}", 
          "${`+${data.sender.countrycode}${data.sender.number}`}",
          "${data.message}",
          ${data.sendbyme ? 1 : 0 },
          "${data.createdAt}",
          "${data.updatedAt}"
        )
      `);
    }, err => console.log(err));
  }

  const providerValue = useMemo(() => ({
    insert, getMessages, createAndSaveMessage
  }), []);

  return (
    // <MessageStateContext.Provider>
      <MessageDispatchContext.Provider value={{
        insert, getMessages, createAndSaveMessage
      }}>
        { children }
      </MessageDispatchContext.Provider>
    // </MessageStateContext.Provider>
  );
}

export default MessageContextProvider;