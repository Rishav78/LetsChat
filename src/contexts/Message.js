import React, { useContext, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { DatabseContext } from './Database';

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const { db } = useContext(DatabseContext);

  const createAndSaveMessage = async (message, chat) => {
    const { number, countrycode } = JSON.parse(await AsyncStorage.getItem('phone'));
    const sender = `+${countrycode}${number}`;
    const data = { 
      id: uuidv4(),
      message: chat.members.map( e => message), 
      sender,
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
        MESSAGES
        VALUES (
          "${data.id}", 
          "${data.chatid}", 
          "${data.sender}", 
          "${data.message}",
          "${data.createdAt}",
          "${data.updatedAt}"
        )
      `, [], err => console.log(err));
    }, err => console.log(err));
  }

  return (
    <MessageContext.Provider value={{ getMessages, insert, createAndSaveMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;