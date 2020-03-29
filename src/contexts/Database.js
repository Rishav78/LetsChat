import React from 'react';
import SQLite from 'react-native-sqlite-storage';

export const DatabseContext = createContext();

const db = SQLite.openDatabase({ 
  name: 'test.db', 
  location: 'default',
  androidDatabaseProvider: 'system'
});

const DatabaseContextProvider = props => {
  return (
    <DatabseContext.Provider value={{ db }}>
        { props.children }
    </DatabseContext.Provider>
  );
}

export default DatabaseContextProvider;