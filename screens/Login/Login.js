import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { TextInput, Provider, FAB } from 'react-native-paper';
import Header from './Header';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider>
        <Header />
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 30 }}>
            <TextInput
              label='Email'
              value={email}
              style={styles.input}
              onChangeText={setEmail}
            />
            <TextInput
              label='Password'
              value={password}
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.login}
              activeOpacity={0.6}>
              <Text style={{ color: '#FFF' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FAB
          small
          dark={false}
          style={styles.signup}
          icon="plus"
          onPress={() => { }}
        />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10
  },
  footer: {
    marginBottom: 40,
    alignItems: 'center'
  },
  signup: {
    backgroundColor: '#2ab9a4',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
    margin: 25,
    color: '#FFF'
  },
  login: {
    backgroundColor: '#5cb85c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    borderRadius: 3
  }
});

export default Login;