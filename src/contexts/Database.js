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
          chatname TEXT,
          imageid TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, [], (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS MEMBERS (
          id TEXT NOT NULL PRIMARY KEY,
          userid TEXT NOT NULL,
          chatid TEXT NOT NULL,
          firstname TEXT NOT NULL,
          lastname TEXT NOT NULL
        )
      `, [],
      (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS MESSAGES (
          id TEXT NOT NULL PRIMARY KEY,
          chatid TEXT NOT NULL,
          message TEXT NOT NULL
        )
      `, [],
      (tx, result) => console.log(result));

      tx.executeSql(`
        CREATE TABLE IF NOT EXISTS CONTACTS (
          number TEXT NOT NULL PRIMARY KEY,
          countrycode TEXT NOT NULL,
          name TEXT NOT NULL,
          status TEXT NOT NULL
        )
      `, [],
      (tx, result) => console.log(result));
    }, 
    err => console.log('err table -> ', err),
    () => console.log('table created'));

  }, []);
  return (
    <DatabseContext.Provider value={{ db }}>
        { props.children }
    </DatabseContext.Provider>
  );
}

export default DatabaseContextProvider;