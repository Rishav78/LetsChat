import React, { useState, useContext } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { AuthContext } from '../../src/contexts/AuthContext';

const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const disable = !emailRegx.test(email) || !password;

  const authenticate = async _ => {
    const auth = await login(email, password);
    if(auth.err) {
      return Alert.alert('Auth Error', auth.err);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
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
            secureTextEntry={true}
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={disable}
            style={disable ?
              { ...styles.login, backgroundColor: '#808080' } :
              styles.login}
            activeOpacity={0.6}
            onPress={authenticate}>
            <Text style={{ color: '#FFF' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FAB
        small
        style={styles.signup}
        icon="plus"
        onPress={() => { }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10,
    borderColor: 'red'
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
    borderRadius: 3,
  }
});

export default Login;