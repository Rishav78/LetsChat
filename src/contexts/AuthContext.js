import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('status').then( res => {
      if(res === 'updated') {
        currentUser().then(({ err, user }) => {
          if (!err) {
            setAuthenticated(true);
          }
        })
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
    console.log(data)
    return data.login;
  }

  const logout = () => {
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        query: `
          mutation {
            logout {
              err
              success
            }
          }
        `
      })
    });
    const {data} = await res.json();
    if(data.logout.err) {
      return Alert.alert('Error', data.logout.err); 
    }
    await AsyncStorage.removeItem('status');
    await AsyncStorage.removeItem('phone');
    await AsyncStorage.removeItem('token');
    setAuthenticated(false);
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
              name
              number
              countrycode
            }
          }
        `
      })
    });
    const {data} = await res.json();
    return data.currentUser;
  }

  return (
    <AuthContext.Provider value={{ login, authenticated, currentUser, setAuthenticated, logout }}>
      { props.children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;