import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import User from '../../src/components/User';

const AddFriend = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async _ => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          query{
            users {
              err
              users {
                _id
                firstname
                lastname
                email
              }
            }
          }
        `
      })
    });
    const { data } = await res.json();
    // console.log(data.users.users)
    setUsers(data.users.users);
    setLoading(false);
  }

  useEffect(() => {

    fetchUsers()

  }, []);

  return (
    loading ?
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView> :
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#FFF'}}>
          <FlatList
            data={users}
            renderItem={(data) => <User key={data.index} data={data.item} />}
            keyExtractor={item => item._id}
          />
        </View>
      </SafeAreaView>
  );
}

export default AddFriend;