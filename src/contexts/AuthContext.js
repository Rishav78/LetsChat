import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (email, password) => {
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              err
              token
              expiresIn
            }
          }
        `
      })
    });
    const { data } = await res.json();
    if(!data.login.err) {
      AsyncStorage.setItem('token', data.login.token);
      setAuthenticated(true);
    }
    return data.login;
  }

  const currentUser = async _ => {
    const token = AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      }
    });
    const { data } = await res.json();
    return data.currentUser;
  }

  return (
    <AuthContext.Provider value={{ login, authenticated, currentUser }}>
      { props.children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;