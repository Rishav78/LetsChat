import React, { useEffect, createContext } from 'react';
import SQLite from 'react-native-sqlite-storage';

export const DatabseContext = createContext();

const db = SQLite.openDatabase({ 
  name: 'test.db',  
  location: 'default',
  androidDatabaseProvider: 'system'
},
() => {
  console.log('connected')
},
(err) => {
  console.log('err -> ', err);
});

const DatabaseContextProvider = props => {

  useEffect( () => {
    
    db.transaction( tx => { 
      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS CHATS (
          id TEXT NOT NULL PRIMARY KEY,
          chattype TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, [], (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS MEMBERS (
          number TEXT NOT NULL,
          countrycode TEXT NOT NULL,
          name TEXT NOT NULL,
          chatid TEXT NOT NULL,
          publickey TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, [],
      (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS MESSAGES (
          id TEXT NOT NULL PRIMARY KEY,
          chatid TEXT NOT NULL,
          sender TEXT NOT NULL,
          message TEXT NOT NULL,
          sendbyme INTEGER NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, [],
      (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS CONTACTS (
          number TEXT NOT NULL PRIMARY KEY,
          countrycode TEXT NOT NULL,
          name TEXT NOT NULL,
          status TEXT NOT NULL,
          publickey TEXT NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, [],
      (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS GROUPS (
          id TEXT NOT NULL PRIMARY KEY,
          name TEXT NOT NULL,
          image TEXT
        )
      `, [],
      (tx, result) => console.log(result));
    }, 
    err => console.log('err table -> ', err),
    () => console.log('table created'));

    return () => {deleteAllData()};

  }, []);

  const deleteAllData = () => {
    db.transaction( tx => {
      tx.executeSql(`DELETE FROM CHATS`);
      // tx.executeSql(`DELETE FROM CONTACTS`);
      tx.executeSql(`DELETE FROM MEMBERS`);
      tx.executeSql(`DELETE FROM MESSAGES`);
    }, err => console.log(err));
  }

  return (
    <DatabseContext.Provider value={{ db, deleteAllData }}>
        { props.children }
    </DatabseContext.Provider>
  );
}

export default DatabaseContextProvider;