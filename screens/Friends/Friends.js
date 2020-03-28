import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import User from '../../src/components/User';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          count={friends.length}
          onChange={setSearch}
          value={search} />
        <View style={{ flex: 1 }}>
          <FlatList 
            style={{ flex: 1, backgroundColor: '#FFF'}}
            data={ !search ? friends : friends.filter( e => new RegExp(search, 'i').test(`${e.firstname} ${e.lastname}`))}
            renderItem={(data) =>
              <User
                key={data.index}
                data={data.item}
                onPress={() => navigation.navigate('Chat', { user: data.item._id })}
              />}
            keyExtractor={item => item._id}
          />
        </View>
      </SafeAreaView>
  );
}

export default Friends;