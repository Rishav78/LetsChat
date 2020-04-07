//@ts-check
import React, { createContext, useState, useEffect, useContext } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import { DatabseContext } from './Database';
import { ContactsContext } from './Contacts';
import { SocketContext } from './Socket';
import { MessageDispatchContext } from './Message';

export const ChatsStateContext = createContext();
export const ChatsDispatchContext = createContext();


// const inittialState = {};
// const reducer = db => {
//   return function(state, action) {
//     switch(action.type) {
//       case 'createGroupChat':
//         const a = 12;
//         break;
//       case 'createPersonalChat':
//         const b = 12;
//         break;
//       case 'refresh':
//         const c = 12;
//         break;
//       default:
//         throw new Error('unknown action');
//     }
//   }
// }

const ChatsContextProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState({});
  // const [state, dispatch] = useReducer(,)
  const { db } = useContext(DatabseContext);
  const { socket } = useContext(SocketContext);
  const { insert, deleteMessages, updateNotified } = useContext(MessageDispatchContext);
  const { contacts, loading } = useContext(ContactsContext);

  const chats = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM CHATS`, [], async (tx, result) => {
        const data = {};
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          item.lastmessage = await new Promise((resolve, reject) => lastMessage(item.id, resolve));
          if (item.chattype === 'personal') {

            item.name = contacts[item.id] ? contacts[item.id].name : item.id;
            console.log(item.id)
          }
          else {
            item.group = await new Promise((resolve, reject) => groupInfo(item.id, resolve));
          }
          data[item.id] = item;
        }
        setAvailableChats(data);
      });
    },
      (err) => console.log(err));
  }

  const createPersonalChatData = (id, member) => {
    const key = `+${member.countrycode}${member.number}`;
    return {
      id,
      name: member.name,
      chattype: 'personal',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      members: {
        [key]: {
          ...member,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString()
        }
      }
    }
  }

  const createAndSaveGroupChat = async (selected, name, cb) => {
    const { countrycode, number } = JSON.parse(await AsyncStorage.getItem('phone'));
    const username = await AsyncStorage.getItem('username');
    const id = uuidv4();
    const data = {
      id,
      chattype: 'group',
      createdAt: Date().toString(),
      updatedAt: Date().toString(),
      members: selected.map(e => ({
        number: e.number,
        countrycode: e.countrycode,
        name: e.name
      })),
      group: {
        id,
        name,
        owner: {
          countrycode: countrycode,
          number: number,
          name: username
        }
      }
    }
    // console.log(data);
    createGroupChat(data, cb);
    return data;
  }

  const updateLastMessage = (chatid, message) => {
    setAvailableChats(prevSatate => {
      const chat = prevSatate[chatid];
      if (!chat) return prevSatate;
      chat.lastmessage = message;
      return { ...prevSatate, [chat.id]: chat };
    });
  }

  const lastMessage = (chatid, cb) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM 
        MESSAGES WHERE chatid="${chatid}" 
        ORDER BY updatedAt DESC 
        LIMIT 1
      `, [], (tx, result) => {
        const message = result.rows.raw();
        if (message.length !== 0) {
          return cb(message[0]);
        }
        return cb(null);
      });
    }, err => console.log(err));
  }

  const chatMembers = (chatid, cb) => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM MEMBERS WHERE chatid="${chatid}"`, [],
        (tx, result) => {
          const data = {};
          for (let i = 0; i < result.rows.length; i++) {
            const item = result.rows.item(i);
            const key = `+${item.countrycode}${item.number}`;
            data[key] = item;
          }
          cb(data);
        });
    });
  }

  const groupInfo = (chatid, cb) => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT * FROM GROUPS WHERE id="${chatid}"
      `, [], (tx, result) => cb(result.rows.raw()[0]));
    }, err => console.log(err));
  }

  const createGroupChat = React.useCallback((data, cb) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO
        CHATS (
          id,
          chattype,
          createdAt,
          updatedAt
        )
        VALUES (
          "${data.id}",
          "group",
          "${data.createdAt}",
          "${data.updatedAt}"
        )
      `, [], (tx, result) => console.log(result));

      tx.executeSql(`
          INSERT INTO 
          GROUPS (
            id,
            name
          )
          VALUES (
            "${data.id}",
            "${data.group.name}"
          )
      `, [], (tx, result) => console.log(result));

      for (let i = 0; i < data.members.length; i++) {
        tx.executeSql(`
          INSERT INTO
          MEMBERS (
            countrycode,
            number,
            name,
            chatid,
            createdAt,
            updatedAt
          )
          VALUES (
            "${data.members[i].countrycode}",
            "${data.members[i].number}", 
            "${data.members[i].name}",
            "${data.id}",
            "${data.members[i].createdAt}",
            "${data.members[i].updatedAt}"
          )
        `, [], (tx, result) => console.log(result));
      }
    },
      err => console.log(err),
      () => {
        if (cb) cb(data);
        setAvailableChats(prevState => ({ ...prevState, [data.id]: data }));
      });
  }, [db]);

  const createPersonalChat = (chat, member, cb) => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO 
        CHATS (
          id, 
          chattype, 
          createdAt, 
          updatedAt
        )
        VALUES (
          "${chat.id}", 
          "personal",
          "${chat.createdAt}",
          "${chat.updatedAt}"
        )
      `, [], (tx, result) => console.log(result));

      tx.executeSql(`
        INSERT INTO
        MEMBERS (
          countrycode,
          number,
          name,
          chatid,
          publickey,
          createdAt,
          updatedAt
        )
        VALUES ( 
          "${member.countrycode}",
          "${member.number}", 
          "${member.name}",
          "${chat.id}",
          "${member.publickey}",
          "${member.createdAt}",
          "${member.updatedAt}"
        )
      `, [],
        (tx, result) => console.log(result));
    },
      (err) => { if (cb) cb(err) },
      () => {
        setAvailableChats(prevState => {
          const name = contacts[chat.id] ? contacts[chat.id].name : chat.id;
          return {
            ...prevState, [chat.id]: { ...chat, name }
          }
        });
        if (cb) cb(null);
      });
  }

  const newMessage = async data => {
    console.log('yess', data);
    const { chat, message } = data;
    const key = `+${message.sender.countrycode}${message.sender.number}`;
    const chatid = chat.chattype === 'personal' ? key : chat.id;
    if (!availableChats[chatid]) {
      if (chat.chattype === 'personal') {
        const { members, ...chat } = createPersonalChatData(chatid, message.sender);
        await new Promise((resolve, reject) =>
          createPersonalChat(chat, members[key], err => err ?
            reject(err) : resolve(null)));
      }
      else {

      }
    }
    socket.emit('message-received', {
      chat: chat.id,
      message: { ...message, sender: key }
    });
    insert({ ...message, chatid });
    updateLastMessage(chatid, message);
  }

  const deleteMessage = async data => {
    console.log(data);
    deleteMessages(data.messages);
  }

  useEffect(() => {
    if (!socket) return;

    socket.on('new-message', newMessage);
    socket.on('delete-messages', deleteMessage);

    return () => {
      socket.off('new-message', newMessage);
      socket.off('delete-messages', deleteMessage);
    }
  }, [availableChats, socket]);

  useEffect(() => {
    if (!loading) chats();
  }, [loading]);

  const providerValue = React.useMemo(() => ({
    createPersonalChat,
    createGroupChat,
    updateLastMessage,
    createAndSaveGroupChat,
    createPersonalChatData,
    chatMembers
  }), [contacts]);

  return (
    <ChatsStateContext.Provider value={availableChats}>
      <ChatsDispatchContext.Provider value={providerValue}>
        {children}
      </ChatsDispatchContext.Provider>
    </ChatsStateContext.Provider>
  );
}

export default ChatsContextProvider;