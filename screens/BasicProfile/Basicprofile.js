import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Header from './Header';
import { AuthContext } from '../../src/contexts/AuthContext';

const Basicprofile = ({ navigation, route }) => {
  const { currentUser, setAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

  useEffect( () => {

    currentUser()
      .then( ({err, name}) => {
        if(!err) {
          setName(name);
          setId(true);
        }
      })
    
  }, []);

  const updateInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateUser(name: "${name}") {
              err
              success
            }
          }
        `
      })
    });
    AsyncStorage.setItem('status', 'updated');
    AsyncStorage.setItem('username', name);
    setAuthenticated(true);
  }

  const insert = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch('http://192.168.43.215:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            insertUser(name: "${name}") {
              err
              success
            }
          }
        `
      })
    });
    const data = await res.json();
    AsyncStorage.setItem('status', 'updated');
    setAuthenticated(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Header />
      <View style={{ flex: 1}}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: 150, height: 150, padding: 20 }}
            source={require('../../assets/logo.png')} />
        </View>
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <TextInput
            label="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Display name" />
            
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity
            style={styles.finish}
            activeOpacity={0.6}
            onPress={id ? updateInfo : insert}>
            <Text style={{ color: '#FFF' }}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10,
    borderColor: 'red'
  },
  finish: {
    backgroundColor: '#5cb85c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    borderRadius: 3,
  }
})

export default Basicprofile;