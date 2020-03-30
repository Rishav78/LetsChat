import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    currentUser().then( ({err, user}) => {
      if(!err) {
        setAuthenticated(true);
        setUser(user._id);
      }
    })
  }, []);

  const login = async phone => {
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query: `
          mutation {
            login(phone: "${phone}") {
              err
              success
            }
          }
        `
      })
    });
    const {data} = await res.json();
    // console.log(data)
    return data.login;
  }

  const currentUser = async _ => {
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
            currentUser {
              err
              user {
                _id
              }
            }
          }
        `
      })
    });
    const { data } = await res.json();
    return data.currentUser
  }

  return (
    <AuthContext.Provider value={{ login, authenticated, currentUser, user }}>
      { props.children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;