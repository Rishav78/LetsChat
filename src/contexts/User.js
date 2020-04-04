import React, { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const user = async phone => {
    const token = await AsyncStorage.getItem('token');
    if(!token) {
      return { err: 'unauthenticated'};
    }
    const res = await fetch(config.API, {
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