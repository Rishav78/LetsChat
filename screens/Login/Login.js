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

const phoneRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const Login = ({ navigation }) => {
  const [prefix, setPrefix] = useState('+91');
  const [phoneno, setPhoneno] = useState('');
  const { login } = useContext(AuthContext);

  const validate = async () => {
    if(!phoneRegx.test(`+${prefix}${phoneno}`)) {
      return Alert.alert('Error', 'invalid phone number');
    }
    const data = await login(`+${prefix}${phoneno}`);
    if(!data.success) {
      return Alert.alert('Error', data.err);
    }
    navigation.navigate('Verify', { phoneno, prefix });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <View style={{ marginHorizontal: 30 }}>
          <Text style={{ textAlign: 'center', lineHeight: 25, fontSize: 14}}>
            LetsChat will send an SMS message to verify your phone number.
            What's my number ?
          </Text>
        </View>
        <View style={{ paddingHorizontal: 80, flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 50 }}>
              <TextInput
                value={prefix}
                style={styles.input}
                onChangeText={setPrefix}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <TextInput
                value={phoneno}
                style={styles.input}
                placeholder="phone number"
                onChangeText={setPhoneno}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.login}
            onPress={validate}
            activeOpacity={0.6}>
            <Text style={{ color: '#FFF' }}>Login</Text>
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