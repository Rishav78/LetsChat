import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import User from '../../src/components/User';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFriends = async () => {
    const token = await AsyncStorage.getItem('token');
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
              user {
                friends {
                  _id
                  firstname
                  lastname
                }
              }
            }
          }
        `
      })
    });
    const { data } = await res.json();
    setFriends(data.currentUser.user.friends);
    setLoading(false);
  }

  useEffect(() => {
    fetchFriends()
  }, []);

  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView>
        <Header
          count={friends.length}
          onChange={() => { }}
          value={"1"} />
        <View>
          <FlatList 
            data={friends}
            renderItem={(data) =>
              <User
                key={data.index}
                data={data.item}
              />}
            keyExtractor={item => item._id}
          />
        </View>
      </SafeAreaView>
  );
}

export default Friends;