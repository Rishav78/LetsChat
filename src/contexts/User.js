import React, { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const user = async phone => {
    const token = await AsyncStorage.getItem('token');
    if(!token) {
      return { err: 'unauthenticated'};
    }
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          query {
            user(phone: "${phone}") {
              err
              name
              number
              countrycode
              status
            }
          }
        `
      })
    });
    const {data} = await res.json();
    return data.user;
  }

  return (
    <UserContext.Provider value={{ user }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserContextProvider;