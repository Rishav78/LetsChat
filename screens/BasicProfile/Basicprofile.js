import React, { useState, useEffect, useContext } from 'react';
import { RSA } from 'react-native-rsa-native';
import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Header from './Header';
import { AuthContext } from '../../src/contexts/AuthContext';

const Basicprofile = ({ navigation }) => {
  const { currentUser, setAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [id, setId] = useState(null);

  const generateKeys = async () => {
    const { private: privateKey, public: publicKey } = await RSA.generateKeys(1024);
    return { privateKey, publicKey };
  }

  const preventGoBack = () => {
    return true;
  }

  useState(() => {
    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', preventGoBack);
    });

    navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', preventGoBack);
    });
  }, []);

  useEffect(() => {

    currentUser()
      .then(({ err, name }) => {
        if (!err) {
          setName(name);
          setId(true);
        }
      })

  }, []);

  const updateInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const { privateKey, publicKey } = await generateKeys();
    await fetch(config.API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            updateUser(name: "${name}", publickey: """${publicKey}""") {
              err
              success
            }
          }
        `
      })
    });
    // const data = await res.json();
    AsyncStorage.setItem('privatekey', privateKey);
    AsyncStorage.setItem('publickey', publicKey);
    AsyncStorage.setItem('status', 'updated');
    AsyncStorage.setItem('username', name);
    setAuthenticated(true);
  }

  const insert = async () => {
    const token = await AsyncStorage.getItem('token');
    const { privateKey, publicKey } = await generateKeys();
    const res = await fetch(config.API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Barrer ${token}`
      },
      body: JSON.stringify({
        query: `
          mutation {
            insertUser(name: "${name}", publickey: """${publicKey}""") {
              err
              success
            }
          }
        `
      })
    });
    const data = await res.json();
    AsyncStorage.setItem('privatekey', privateKey);
    AsyncStorage.setItem('publickey', publicKey);
    AsyncStorage.setItem('status', 'updated');
    AsyncStorage.setItem('username', name);
    setAuthenticated(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Header />
      <View style={{ flex: 1 }}>
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