import React, { useEffect, useContext, createContext, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { DatabseContext } from './Database';
import { SocketContext } from './Socket';

export const MessageStateContext = createContext();
export const MessageDispatchContext = createContext();

const MessageContextProvider = ({ children }) => {
  const { db } = useContext(DatabseContext);
  const { socket } = useContext(SocketContext);

  const createAndSaveMessage = async (message, chat) => {
    const { number, countrycode } = JSON.parse(await AsyncStorage.getItem('phone'));
    const name = await AsyncStorage.getItem('username');
    const data = { 
      id: uuidv4(),
      message, 
      notified: 0,
      deliveredTo: [],
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
      `, [], 
      async (tx, result) => {
        const data = {};
        for(let i=0; i<result.rows.length; i++) {
          const item = result.rows.item(i);
          item.deliveredTo = await new Promise((resolve, reject) => deliveredTo(item.id, resolve));
          data[item.id] = item;
        }
        cb(data);
      });
    }, err => console.log(err));
  }

  const deliveredTo = (id, cb) => {
    db.transaction( tx => {
      tx.executeSql(`
        SELECT * FROM DELIVERED
        WHERE id="${id}"
      `, [],
      (tx, result) => cb(result.rows.raw()));
    })
  }

  const deleteMessages = data => {
    db.transaction( tx => { 
      for(let i=0;i<data.length;i++) {
        tx.executeSql(`
          DELETE FROM MESSAGES WHERE id="${data[i]}"
        `);
      }
    },
    err => console.log(err));
  }

  const updateNotified = id => {
    db.transaction( tx => {
      tx.executeSql(`
        UPDATE MESSAGES SET
        notified=1
        WHERE id="${id}"
      `);
    },
    err => console.log(err));
  }

  const messageDelivered = data => {
    db.transaction( tx => {
      tx.executeSql(`
        INSERT INTO
        DELIVERED (
          id,
          chat,
          user,
          createdAt,
          updatedAt
        )
        VALUES (
          "${data.message.id}",
          "${data.chat}",
          "${data.user}",
          "${new Date().toString()}",
          "${new Date().toString()}"
        )
      `)
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

  useEffect(() => {

    if(!socket) return;

    socket.on('message-delivered', messageDelivered);

    return () => socket.off('message-delivered', messageDelivered);

  }, [socket]);

  const providerValue = useMemo(() => ({
    insert, getMessages, createAndSaveMessage,
    deleteMessages, updateNotified
  }), []);

  return (
    // <MessageStateContext.Provider>
      <MessageDispatchContext.Provider value={providerValue}>
        { children }
      </MessageDispatchContext.Provider>
    // </MessageStateContext.Provider>
  );
}

export default MessageContextProvider;